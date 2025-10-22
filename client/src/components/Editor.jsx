import React, { useEffect, useRef } from 'react';
import MonacoEditor from '@monaco-editor/react';
import './Editor.css';

function Editor({ tab, onContentChange }) {
  const editorRef = useRef(null);

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;

    // Add keyboard shortcuts
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      // Save is handled by parent
    });
  };

  if (!tab) {
    return (
      <div className="editor-placeholder">
        <div className="placeholder-content">
          <h2>Welcome to CipherStudio</h2>
          <p>Open a file from the explorer to start coding</p>
          <div className="shortcuts">
            <h3>Keyboard Shortcuts:</h3>
            <ul>
              <li><kbd>Ctrl+S</kbd> - Save File</li>
              <li><kbd>Ctrl+Enter</kbd> - Run Code</li>
              <li>Right-click in Explorer - File Operations</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="editor-wrapper">
      <MonacoEditor
        height="100%"
        language={tab.language}
        value={tab.content}
        onChange={onContentChange}
        onMount={handleEditorDidMount}
        theme="vs-dark"
        options={{
          fontSize: 14,
          minimap: { enabled: true },
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
          wordWrap: 'on',
          formatOnPaste: true,
          formatOnType: true,
          suggestOnTriggerCharacters: true,
          quickSuggestions: true,
          bracketPairColorization: { enabled: true },
        }}
      />
    </div>
  );
}

export default Editor;
