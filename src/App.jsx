import React, { useEffect, useState } from 'react';
import useEditorStore from './store/editorStore';
import { usePreview } from './hooks/usePreview';
import CodeEditor from './components/Editor';
import Preview from './components/Preview';
import Toolbar from './components/Toolbar';
import LibraryBrowser from './components/LibraryBrowser';
import ProjectUploader from './components/ProjectUploader';
import FileTree from './components/FileTree';
import './styles/App.css';

function App() {
  const { code, language, setPreview } = useEditorStore();
  const [splitRatio, setSplitRatio] = useState(50); // Persentase untuk editor
  const [isDragging, setIsDragging] = useState(false);
  const [showUploader, setShowUploader] = useState(false);

  // Aktifkan preview
  usePreview();

  // Handle resize split
  const handleMouseDown = () => setIsDragging(true);
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging) {
        const container = document.querySelector('.pane-container');
        if (container) {
          const rect = container.getBoundingClientRect();
          const y = e.clientY - rect.top;
          const percent = (y / rect.height) * 100;
          setSplitRatio(Math.min(90, Math.max(10, percent)));
        }
      }
    };
    
    const handleMouseUp = () => setIsDragging(false);
    
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  // Auto-generate preview awal
  useEffect(() => {
    // Trigger preview pertama kali
    const timer = setTimeout(() => {
      usePreview();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="app">
      <Toolbar />
      
      <div className="main-layout">
        <FileTree />
        
        <div className="pane-container">
          {/* Editor Pane */}
          <div 
            className="pane" 
            style={{ height: `${splitRatio}%` }}
          >
            <CodeEditor />
          </div>
          
          {/* Divider */}
          <div 
            className="pane-divider" 
            onMouseDown={handleMouseDown}
            style={{ cursor: isDragging ? 'ns-resize' : 'ns-resize' }}
          />
          
          {/* Preview Pane */}
          <div 
            className="pane" 
            style={{ height: `${100 - splitRatio}%` }}
          >
            <Preview />
          </div>
        </div>
      </div>

      {/* Modals */}
      <LibraryBrowser />
      
      {/* Uploader Modal (optional) */}
      {showUploader && (
        <div className="modal-overlay" onClick={() => setShowUploader(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setShowUploader(false)}>✕</button>
            <h2>📁 Upload Project</h2>
            <ProjectUploader />
            <div style={{ marginTop: '16px', textAlign: 'center' }}>
              <button 
                onClick={() => setShowUploader(false)}
                style={{
                  padding: '8px 24px',
                  background: '#3c3c3c',
                  border: '1px solid #555',
                  borderRadius: '4px',
                  color: '#d4d4d4',
                  cursor: 'pointer'
                }}
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Upload Button */}
      <button
        onClick={() => setShowUploader(true)}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          background: '#0e639c',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '56px',
          height: '56px',
          fontSize: '24px',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
          zIndex: 100,
          transition: 'transform 0.2s'
        }}
        onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
      >
        📁
      </button>
    </div>
  );
}

export default App;
