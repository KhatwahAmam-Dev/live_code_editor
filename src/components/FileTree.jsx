import React from 'react';
import useEditorStore from '../store/editorStore';

function FileTree() {
  const { projectFiles, activeFile, setActiveFile } = useEditorStore();
  const fileKeys = Object.keys(projectFiles);

  if (fileKeys.length === 0) {
    return (
      <div className="file-tree">
        <h4>📂 Project Files</h4>
        <div style={{ padding: '20px 16px', color: '#666', fontSize: '13px' }}>
          Belum ada file<br/>
          Upload project atau mulai coding
        </div>
      </div>
    );
  }

  // Helper: dapatkan icon berdasarkan ekstensi
  const getFileIcon = (filename) => {
    const ext = filename.split('.').pop().toLowerCase();
    const icons = {
      'html': '🌐',
      'htm': '🌐',
      'js': '⚡',
      'css': '🎨',
      'py': '🐍',
      'json': '📋',
      'xml': '📄',
      'svg': '🖼️',
      'txt': '📝',
      'md': '📖'
    };
    return icons[ext] || '📄';
  };

  return (
    <div className="file-tree">
      <h4>📂 Project Files ({fileKeys.length})</h4>
      {fileKeys.map(filename => (
        <div
          key={filename}
          className={`file-item ${activeFile === filename ? 'active' : ''}`}
          onClick={() => setActiveFile(filename)}
        >
          <span className="icon">{getFileIcon(filename)}</span>
          <span className="name">{filename}</span>
        </div>
      ))}
    </div>
  );
}

export default FileTree;
