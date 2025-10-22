import React, { useState } from 'react';
import { FaFolder, FaFile, FaChevronRight, FaChevronDown, FaPlus, FaTrash, FaSync } from 'react-icons/fa';
import './FileExplorer.css';

function FileExplorer({ fileTree, onFileClick, onRefresh, onCreateNew, onDelete }) {
  const [expandedFolders, setExpandedFolders] = useState(new Set(['']));
  const [contextMenu, setContextMenu] = useState(null);

  const toggleFolder = (path) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(path)) {
      newExpanded.delete(path);
    } else {
      newExpanded.add(path);
    }
    setExpandedFolders(newExpanded);
  };

  const handleCreateFile = () => {
    const fileName = prompt('Enter file name (e.g., index.js):');
    if (fileName) {
      onCreateNew(fileName, 'file', contextMenu?.path || '');
    }
    setContextMenu(null);
  };

  const handleCreateFolder = () => {
    const folderName = prompt('Enter folder name:');
    if (folderName) {
      onCreateNew(folderName, 'folder', contextMenu?.path || '');
    }
    setContextMenu(null);
  };

  const handleDelete = () => {
    if (confirm(`Delete ${contextMenu.name}?`)) {
      onDelete(contextMenu.path);
    }
    setContextMenu(null);
  };

  const renderTree = (items, level = 0) => {
    return items.map((item) => {
      const isExpanded = expandedFolders.has(item.path);
      
      return (
        <div key={item.path} className="tree-item">
          <div 
            className={`tree-row ${item.type === 'file' ? 'file' : 'folder'}`}
            style={{ paddingLeft: `${level * 20 + 10}px` }}
            onClick={() => item.type === 'folder' ? toggleFolder(item.path) : onFileClick(item.path, item.name)}
            onContextMenu={(e) => {
              e.preventDefault();
              setContextMenu({ path: item.path, name: item.name, type: item.type, x: e.clientX, y: e.clientY });
            }}
          >
            {item.type === 'folder' && (
              <span className="chevron">
                {isExpanded ? <FaChevronDown /> : <FaChevronRight />}
              </span>
            )}
            <span className="icon">
              {item.type === 'folder' ? <FaFolder /> : <FaFile />}
            </span>
            <span className="name">{item.name}</span>
          </div>
          
          {item.type === 'folder' && isExpanded && item.children && (
            <div className="tree-children">
              {renderTree(item.children, level + 1)}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div className="file-explorer">
      <div className="explorer-header">
        <h3>EXPLORER</h3>
        <div className="explorer-actions">
          <button onClick={handleCreateFile} title="New File">
            <FaFile />
          </button>
          <button onClick={handleCreateFolder} title="New Folder">
            <FaFolder />
          </button>
          <button onClick={onRefresh} title="Refresh">
            <FaSync />
          </button>
        </div>
      </div>
      
      <div className="tree-container">
        {renderTree(fileTree)}
      </div>

      {contextMenu && (
        <>
          <div className="context-menu-backdrop" onClick={() => setContextMenu(null)} />
          <div 
            className="context-menu" 
            style={{ top: contextMenu.y, left: contextMenu.x }}
          >
            <div className="context-item" onClick={handleCreateFile}>
              <FaFile /> New File
            </div>
            <div className="context-item" onClick={handleCreateFolder}>
              <FaFolder /> New Folder
            </div>
            <div className="context-divider" />
            <div className="context-item delete" onClick={handleDelete}>
              <FaTrash /> Delete
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default FileExplorer;
