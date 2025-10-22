import React, { useState, useEffect } from 'react';
import FileExplorer from './components/FileExplorer';
import Editor from './components/Editor';
import Terminal from './components/Terminal';
import TabBar from './components/TabBar';
import Navbar from './components/Navbar';
import axios from 'axios';
import './App.css';

function App() {
  const [fileTree, setFileTree] = useState([]);
  const [openTabs, setOpenTabs] = useState([]);
  const [activeTab, setActiveTab] = useState(null);
  const [terminalOutput, setTerminalOutput] = useState('Welcome to CipherStudio Terminal\n> Ready to execute code\n');
  const [isTerminalOpen, setIsTerminalOpen] = useState(true);
  const [terminalInputs, setTerminalInputs] = useState([]);
  const [currentInput, setCurrentInput] = useState('');
  const [isWaitingForInput, setIsWaitingForInput] = useState(false);

  // Fetch file tree on mount
  useEffect(() => {
    fetchFileTree();
  }, []);

  const fetchFileTree = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/files');
      setFileTree(response.data.tree);
    } catch (error) {
      console.error('Error fetching file tree:', error);
    }
  };

  const openFile = async (filePath, fileName) => {
    // Check if already open
    const existing = openTabs.find(tab => tab.path === filePath);
    if (existing) {
      setActiveTab(filePath);
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5000/api/file?path=${encodeURIComponent(filePath)}`);
      const newTab = {
        path: filePath,
        name: fileName,
        content: response.data.content,
        language: detectLanguage(fileName),
        isDirty: false
      };
      
      setOpenTabs([...openTabs, newTab]);
      setActiveTab(filePath);
    } catch (error) {
      console.error('Error opening file:', error);
    }
  };

  const closeTab = (filePath) => {
    const newTabs = openTabs.filter(tab => tab.path !== filePath);
    setOpenTabs(newTabs);
    if (activeTab === filePath && newTabs.length > 0) {
      setActiveTab(newTabs[newTabs.length - 1].path);
    } else if (newTabs.length === 0) {
      setActiveTab(null);
    }
  };

  const updateTabContent = (filePath, content) => {
    setOpenTabs(openTabs.map(tab => 
      tab.path === filePath 
        ? { ...tab, content, isDirty: true }
        : tab
    ));
  };

  const saveFile = async (filePath) => {
    const tab = openTabs.find(t => t.path === filePath);
    if (!tab) return;

    try {
      await axios.post(`http://localhost:5000/api/file`, {
        path: filePath,
        content: tab.content
      });
      
      setOpenTabs(openTabs.map(t => 
        t.path === filePath ? { ...t, isDirty: false } : t
      ));
      
      setTerminalOutput(prev => prev + `✓ File saved: ${tab.name}\n`);
    } catch (error) {
      console.error('Error saving file:', error);
      setTerminalOutput(prev => prev + `✗ Error saving file: ${error.message}\n`);
    }
  };

  const handleTerminalInput = (input) => {
    const newInputs = [...terminalInputs, input];
    setTerminalInputs(newInputs);
    setTerminalOutput(prev => prev + input + '\n');
  };

  const runCode = async () => {
    const tab = openTabs.find(t => t.path === activeTab);
    if (!tab) return;

    // Check if code needs input
    const needsInput = /input\(|scanf|cin\s*>>|Scanner|gets|readline/i.test(tab.content);
    
    if (needsInput && terminalInputs.length === 0) {
      setTerminalOutput(prev => 
        prev + `\n📝 Input Required: This program needs input.\n` +
        `Type your input values in the terminal below (one per line) and press Enter.\n` +
        `When done entering all inputs, click Run again.\n\n`
      );
      setIsWaitingForInput(true);
      return;
    }

    setIsWaitingForInput(false);
    setTerminalOutput(prev => prev + `\n▶ Running ${tab.name}...\n`);

    try {
      const stdin = terminalInputs.join('\n');
      const response = await axios.post('http://localhost:5000/api/execute', {
        code: tab.content,
        language: tab.language,
        fileName: tab.name,
        stdin: stdin
      });

      if (response.data.success) {
        setTerminalOutput(prev => prev + response.data.output + '\n');
      } else {
        setTerminalOutput(prev => prev + `✗ Error:\n${response.data.output || response.data.error}\n`);
      }
    } catch (error) {
      setTerminalOutput(prev => prev + `✗ Execution error: ${error.message}\n`);
    } finally {
      setTerminalInputs([]);
    }
  };

  const createNew = async (name, type, parentPath = '') => {
    try {
      await axios.post('http://localhost:5000/api/create', {
        name,
        type,
        parentPath
      });
      fetchFileTree();
      setTerminalOutput(prev => prev + `✓ Created ${type}: ${name}\n`);
    } catch (error) {
      setTerminalOutput(prev => prev + `✗ Error creating ${type}: ${error.message}\n`);
    }
  };

  const deleteItem = async (filePath) => {
    try {
      await axios.delete(`http://localhost:5000/api/delete?path=${encodeURIComponent(filePath)}`);
      fetchFileTree();
      
      // Close tab if open
      const tab = openTabs.find(t => t.path === filePath);
      if (tab) closeTab(filePath);
      
      setTerminalOutput(prev => prev + `✓ Deleted: ${filePath}\n`);
    } catch (error) {
      setTerminalOutput(prev => prev + `✗ Error deleting: ${error.message}\n`);
    }
  };

  const detectLanguage = (fileName) => {
    const ext = fileName.split('.').pop().toLowerCase();
    const langMap = {
      'js': 'javascript',
      'jsx': 'javascript',
      'ts': 'typescript',
      'tsx': 'typescript',
      'py': 'python',
      'java': 'java',
      'cpp': 'cpp',
      'c': 'c',
      'cs': 'csharp',
      'php': 'php',
      'rb': 'ruby',
      'go': 'go',
      'rs': 'rust',
      'html': 'html',
      'css': 'css',
      'scss': 'scss',
      'json': 'json',
      'xml': 'xml',
      'md': 'markdown',
      'sql': 'sql',
      'sh': 'shell',
      'txt': 'plaintext'
    };
    return langMap[ext] || 'plaintext';
  };

  const currentTab = openTabs.find(tab => tab.path === activeTab);

  return (
    <div className="app">
      <Navbar 
        onRun={runCode}
        onSave={() => activeTab && saveFile(activeTab)}
        canRun={!!activeTab}
        canSave={!!activeTab && currentTab?.isDirty}
      />
      
      <div className="main-container">
        <FileExplorer 
          fileTree={fileTree}
          onFileClick={openFile}
          onRefresh={fetchFileTree}
          onCreateNew={createNew}
          onDelete={deleteItem}
        />
        
        <div className="editor-container">
          <TabBar 
            tabs={openTabs}
            activeTab={activeTab}
            onTabClick={setActiveTab}
            onTabClose={closeTab}
          />
          
          <Editor 
            tab={currentTab}
            onContentChange={(content) => activeTab && updateTabContent(activeTab, content)}
          />
          
          {isTerminalOpen && (
            <Terminal 
              output={terminalOutput}
              onClose={() => setIsTerminalOpen(false)}
              onClear={() => {
                setTerminalOutput('> Terminal cleared\n');
                setTerminalInputs([]);
                setIsWaitingForInput(false);
              }}
              onInput={handleTerminalInput}
            />
          )}
        </div>
      </div>
      
      {!isTerminalOpen && (
        <button className="toggle-terminal" onClick={() => setIsTerminalOpen(true)}>
          Show Terminal
        </button>
      )}
    </div>
  );
}

export default App;

