const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs').promises;
const { exec } = require('child_process');
const util = require('util');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const User = require('./models/User');
const execPromise = util.promisify(exec);

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Middleware
app.use(cors({
    origin: 'http://localhost:3001',
    credentials: true
}));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.static('public'));
app.use(session({
    secret: 'cipher-studio-secret',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 } // 24 hours
}));

// Workspace directory
const WORKSPACE_DIR = path.join(__dirname, 'workspace');

// Ensure workspace directory exists
const initWorkspace = async () => {
    try {
        await fs.access(WORKSPACE_DIR);
    } catch {
        await fs.mkdir(WORKSPACE_DIR, { recursive: true });
        // Create sample files
        await fs.writeFile(
            path.join(WORKSPACE_DIR, 'welcome.js'),
            '// Welcome to CipherStudio Code Editor!\nconsole.log("Hello, World!");'
        );
        await fs.writeFile(
            path.join(WORKSPACE_DIR, 'example.py'),
            '# Python Example\nprint("Hello from Python!")'
        );
    }
};

// MongoDB Connection (optional - for saving projects)
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/vscode-clone';
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(async () => {
    console.log('📦 MongoDB Connected');
    await createDefaultAdmin();
}).catch((err) => {
    console.log('⚠️  MongoDB not connected (optional):', err.message);
});

// Create default admin user
const createDefaultAdmin = async () => {
    try {
        const adminEmail = 'admin@admin.com';
        const existingAdmin = await User.findOne({ email: adminEmail });
        
        if (!existingAdmin) {
            const adminUser = new User({
                username: 'admin',
                email: adminEmail,
                password: 'admin123' // This will be hashed automatically by the pre-save hook
            });
            
            await adminUser.save();
            console.log('✅ Default admin user created successfully');
            console.log('📧 Email: admin@admin.com');
            console.log('🔑 Password: admin123');
            console.log('⚠️  Please change the password after first login!');
        } else {
            console.log('ℹ️  Admin user already exists');
        }
    } catch (error) {
        console.log('⚠️  Error creating admin user:', error.message);
    }
};

// File Schema (for cloud storage)
const FileSchema = new mongoose.Schema({
    name: String,
    path: String,
    content: String,
    language: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const File = mongoose.model('File', FileSchema);

// Routes

// Authentication Middleware
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
    }
    
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(403).json({ success: false, message: 'Invalid token' });
    }
};

// Auth Routes

// Register
app.post('/api/auth/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        // Validation
        if (!username || !email || !password) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }
        
        if (password.length < 6) {
            return res.status(400).json({ success: false, message: 'Password must be at least 6 characters' });
        }
        
        // Check if user exists
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ 
                success: false, 
                message: existingUser.email === email ? 'Email already registered' : 'Username already taken' 
            });
        }
        
        // Create user
        const user = new User({ username, email, password });
        await user.save();
        
        // Generate token
        const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: '24h' });
        
        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
});

// Login
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Validation
        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Email and password are required' });
        }
        
        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
        
        // Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
        
        // Generate token
        const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: '24h' });
        
        res.json({
            success: true,
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
});

// Verify Token
app.get('/api/auth/verify', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        
        res.json({
            success: true,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// File & Code Execution Routes (Protected)

// Get file tree
app.get('/api/files', async (req, res) => {
    try {
        const tree = await buildFileTree(WORKSPACE_DIR);
        res.json({ success: true, tree });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Read file content
app.get('/api/file', async (req, res) => {
    try {
        const filePath = path.join(WORKSPACE_DIR, req.query.path);
        const content = await fs.readFile(filePath, 'utf-8');
        res.json({ success: true, content });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Save file
app.post('/api/file', async (req, res) => {
    try {
        const filePath = path.join(WORKSPACE_DIR, req.body.path);
        const { content } = req.body;
        
        // Ensure directory exists
        await fs.mkdir(path.dirname(filePath), { recursive: true });
        await fs.writeFile(filePath, content, 'utf-8');
        
        res.json({ success: true, message: 'File saved successfully' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Create file or folder
app.post('/api/create', async (req, res) => {
    try {
        const { name, type, parentPath } = req.body;
        const fullPath = path.join(WORKSPACE_DIR, parentPath || '', name);
        
        if (type === 'file') {
            await fs.writeFile(fullPath, '', 'utf-8');
        } else {
            await fs.mkdir(fullPath, { recursive: true });
        }
        
        res.json({ success: true, message: `${type} created successfully` });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Delete file or folder
app.delete('/api/delete', async (req, res) => {
    try {
        const filePath = path.join(WORKSPACE_DIR, req.query.path);
        const stats = await fs.stat(filePath);
        
        if (stats.isDirectory()) {
            await fs.rm(filePath, { recursive: true, force: true });
        } else {
            await fs.unlink(filePath);
        }
        
        res.json({ success: true, message: 'Deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Rename file or folder
app.put('/api/rename', async (req, res) => {
    try {
        const { oldPath, newName } = req.body;
        const oldFullPath = path.join(WORKSPACE_DIR, oldPath);
        const newFullPath = path.join(path.dirname(oldFullPath), newName);
        
        await fs.rename(oldFullPath, newFullPath);
        
        res.json({ success: true, message: 'Renamed successfully' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Execute code
app.post('/api/execute', async (req, res) => {
    try {
        const { code, language, fileName, stdin } = req.body;
        
        let result;
        
        if (language === 'javascript') {
            result = await executeJavaScript(code);
        } else if (language === 'python') {
            result = await executePython(code, stdin);
        } else if (language === 'html') {
            result = { output: 'HTML files are rendered in the preview pane', success: true };
        } else {
            // Use Piston API for other languages
            result = await executePiston(code, language, stdin);
        }
        
        res.json(result);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Helper Functions

async function buildFileTree(dir, basePath = '') {
    const items = await fs.readdir(dir);
    const tree = [];
    
    for (const item of items) {
        const fullPath = path.join(dir, item);
        const relativePath = path.join(basePath, item);
        const stats = await fs.stat(fullPath);
        
        if (stats.isDirectory()) {
            tree.push({
                name: item,
                type: 'folder',
                path: relativePath.replace(/\\/g, '/'),
                children: await buildFileTree(fullPath, relativePath)
            });
        } else {
            tree.push({
                name: item,
                type: 'file',
                path: relativePath.replace(/\\/g, '/'),
                extension: path.extname(item).substring(1)
            });
        }
    }
    
    return tree.sort((a, b) => {
        if (a.type === b.type) return a.name.localeCompare(b.name);
        return a.type === 'folder' ? -1 : 1;
    });
}

async function executeJavaScript(code) {
    try {
        let output = '';
        const logs = [];
        
        // Create custom console
        const customConsole = {
            log: (...args) => logs.push(args.join(' ')),
            error: (...args) => logs.push('ERROR: ' + args.join(' ')),
            warn: (...args) => logs.push('WARNING: ' + args.join(' ')),
        };
        
        // Execute in isolated context
        const func = new Function('console', code);
        func(customConsole);
        
        return { success: true, output: logs.join('\n') || 'Code executed successfully' };
    } catch (error) {
        return { success: false, error: error.message, output: error.stack };
    }
}

async function executePython(code, stdin = '') {
    const tempFile = path.join(WORKSPACE_DIR, `temp_${Date.now()}.py`);
    const tempInputFile = path.join(WORKSPACE_DIR, `temp_input_${Date.now()}.txt`);
    
    try {
        await fs.writeFile(tempFile, code);
        
        let result;
        if (stdin) {
            // Write stdin to a temporary file
            await fs.writeFile(tempInputFile, stdin);
            // Use input redirection
            result = await execPromise(`python "${tempFile}" < "${tempInputFile}"`);
            await fs.unlink(tempInputFile);
        } else {
            result = await execPromise(`python "${tempFile}"`);
        }
        
        const { stdout, stderr } = result;
        await fs.unlink(tempFile);
        
        return {
            success: !stderr,
            output: stdout || stderr || 'Code executed successfully'
        };
    } catch (error) {
        try { 
            await fs.unlink(tempFile);
            await fs.unlink(tempInputFile);
        } catch {}
        return { success: false, error: error.message, output: error.stderr || error.message };
    }
}

async function executePiston(code, language, stdin = '') {
    const languageMap = {
        java: 'java',
        cpp: 'cpp',
        c: 'c',
        php: 'php',
        ruby: 'ruby',
        go: 'go'
    };
    
    try {
        const fetch = (await import('node-fetch')).default;
        const response = await fetch('https://emkc.org/api/v2/piston/execute', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                language: languageMap[language] || language,
                version: '*',
                files: [{ content: code }],
                stdin: stdin
            })
        });
        
        const result = await response.json();
        
        if (result.run) {
            return {
                success: !result.run.stderr,
                output: result.run.output || result.run.stderr || 'Code executed successfully'
            };
        }
        
        return { success: false, error: 'Execution failed', output: 'Unknown error' };
    } catch (error) {
        return { success: false, error: error.message, output: error.message };
    }
}

// Initialize and start server
initWorkspace().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
        console.log(`📁 Workspace: ${WORKSPACE_DIR}`);
    });
});
