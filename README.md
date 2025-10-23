# CipherStudio - Full-Stack Code Editor

![CipherStudio](https://img.shields.io/badge/CipherStudio-v2.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![MERN](https://img.shields.io/badge/MERN-Stack-orange)

A professional, VS Code-like web-based code editor built with the MERN stack. Write, edit, and execute code in 20+ programming languages directly in your browser!

## 🌟 Features

### 🎨 **Professional Code Editor**
- **Monaco Editor** - The same editor engine as Visual Studio Code
- **Syntax Highlighting** - Support for 20+ programming languages
- **IntelliSense** - Smart code completion and suggestions
- **Auto Language Detection** - Detects language from file extension
- **Multiple Themes** - Dark themes optimized for coding

### 📁 **File Management**
- **File Explorer** - Full tree view with nested folders
- **Create/Delete** - Files and folders via context menu
- **Multi-Tab System** - Open and edit multiple files simultaneously
- **Auto-Save Indicator** - Visual feedback for unsaved changes
- **File Persistence** - All files saved to backend

### ▶️ **Code Execution**
- **Run Code Instantly** - Execute code with one click
- **Multi-Language Support** - JavaScript, Python, Java, C++, C, PHP, Ruby, Go, and more
- **Interactive Terminal** - Real terminal-like input/output
- **Program Input** - Support for `input()`, `scanf()`, `cin`, etc.
- **Real-time Output** - See results immediately in integrated terminal

### 🔐 **Authentication System**
- **Secure Login/Signup** - JWT token-based authentication
- **Password Encryption** - Bcrypt hashing for security
- **Session Management** - 24-hour persistent sessions
- **Protected Routes** - Editor accessible only to authenticated users
- **Beautiful UI** - Modern gradient design with animations

### 🖥️ **Interactive Terminal**
- **Input Field** - Type inputs directly in terminal (no separate boxes)
- **Real-time Output** - See execution results instantly
- **Auto-scroll** - Follows output automatically
- **Clear Function** - Clean terminal with one click
- **Command History** - Track all executed commands

## 🚀 Tech Stack

### **Backend**
- **Node.js** - Runtime environment
- **Express.js** - Web server framework
- **MongoDB** - Database for users and files
- **Mongoose** - MongoDB ODM
- **JWT** - Token-based authentication
- **Bcrypt** - Password hashing
- **Piston API** - Code execution for compiled languages

### **Frontend**
- **React** - UI framework
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Monaco Editor** - Code editor component
- **Axios** - HTTP client
- **Context API** - Global state management
- **React Icons** - UI icons

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Python 3.x (for Python code execution)

### Clone Repository
```bash
git clone https://github.com/YOUR_USERNAME/cipherstudio.git
cd cipherstudio
```

### Backend Setup
```bash
# Install dependencies
npm install

# Start MongoDB (if local)
mongod

# Start backend server
npm run dev
```

### Frontend Setup
```bash
# Navigate to client
cd client

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🎯 Usage

### 1. **Start the Application**
```bash
# Terminal 1 - Backend
npm run dev

# Terminal 2 - Frontend
cd client && npm run dev
```

### 2. **Access the App**
- Open browser: `http://localhost:3001`
- Sign up for a new account
- Login with your credentials

### 3. **Start Coding**
- Create new files via file explorer
- Language auto-detected from extension
- Write code in Monaco editor
- Click "Run" to execute
- See output in terminal

### 4. **Interactive Programs**
For programs with input:
1. Click "Run" first
2. Terminal shows "Input Required"
3. Type inputs in terminal (bottom field with `>`)
4. Press Enter after each input
5. Click "Run" again to execute

## 📖 Documentation

- [Authentication Guide](./AUTHENTICATION_GUIDE.md) - Complete auth system documentation
- [Terminal Input Guide](./TERMINAL_INPUT_GUIDE.md) - How to use interactive terminal
- [API Documentation](./API.md) - Backend API endpoints (coming soon)

## 🎮 Supported Languages

| Language   | Extension | Execution      |
|------------|-----------|----------------|
| JavaScript | .js, .jsx | Local (Node)   |
| Python     | .py       | Local/Piston   |
| Java       | .java     | Piston API     |
| C++        | .cpp      | Piston API     |
| C          | .c        | Piston API     |
| HTML/CSS   | .html     | Live Preview   |
| PHP        | .php      | Piston API     |
| Ruby       | .rb       | Piston API     |
| Go         | .go       | Piston API     |
| TypeScript | .ts, .tsx | Monaco         |

## 🔧 Configuration

### Environment Variables
Create `.env` file in root:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/cipherstudio
JWT_SECRET=your-secret-key-here
```

### Change Port
Edit `vite.config.js`:
```javascript
server: {
  port: 3001  // Change to your preference
}
```

## 📁 Project Structure

```
cipherstudio/
├── models/
│   └── User.js                 # User schema
├── workspace/                   # User code files
├── server.js                   # Express backend
├── package.json
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── FileExplorer.jsx
│   │   │   ├── Editor.jsx
│   │   │   ├── Terminal.jsx
│   │   │   ├── TabBar.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── vite.config.js
│   └── package.json
└── README.md
```

## 🎨 Screenshots

### Login Page
Beautiful gradient design with animated shapes

### Code Editor
Full VS Code-like interface with file explorer

### Interactive Terminal
Real terminal experience with input/output

## 🚧 Roadmap

- [ ] Code collaboration (real-time)
- [ ] Custom themes
- [ ] Git integration
- [ ] Plugin system
- [ ] Cloud storage
- [ ] Mobile app
- [ ] Debugger
- [ ] AI code completion

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**
- GitHub: [1uciferm0rningstar](https://github.com/1uciferm0rningstar)
- Email: pusprajkumar473@gmail.com

## 🙏 Acknowledgments

- Monaco Editor team for the amazing editor
- Piston API for code execution
- React team for the framework
- MongoDB for the database
- All contributors and users!

## 📧 Support

For support, email pusprajkumar473@gmail.com or open an issue on GitHub.

## ⭐ Show Your Support

Give a ⭐️ if this project helped you!

---

**Built with ❤️ using the MERN Stack**
