import React, { useRef, useEffect, useState } from 'react';
import { FaTimes, FaTrash } from 'react-icons/fa';
import './Terminal.css';

function Terminal({ output, onClose, onClear, onInput }) {
  const terminalRef = useRef(null);
  const inputRef = useRef(null);
  const [currentInput, setCurrentInput] = useState('');
  const [isWaitingForInput, setIsWaitingForInput] = useState(false);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [output]);

  // Focus input when waiting for input
  useEffect(() => {
    if (isWaitingForInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isWaitingForInput]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && currentInput.trim()) {
      if (onInput) {
        onInput(currentInput);
      }
      setCurrentInput('');
      setIsWaitingForInput(false);
    }
  };

  const handleTerminalClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="terminal">
      <div className="terminal-header">
        <span className="terminal-title">TERMINAL</span>
        <div className="terminal-actions">
          <button onClick={onClear} title="Clear Terminal">
            <FaTrash />
          </button>
          <button onClick={onClose} title="Close Terminal">
            <FaTimes />
          </button>
        </div>
      </div>
      
      <div className="terminal-content" ref={terminalRef} onClick={handleTerminalClick}>
        <pre>{output}</pre>
        <div className="terminal-input-line">
          <span className="terminal-prompt">{'> '}</span>
          <input
            ref={inputRef}
            type="text"
            className="terminal-input"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type here and press Enter..."
          />
        </div>
      </div>
    </div>
  );
}

export default Terminal;
