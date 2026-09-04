import React from 'react';
import useEditorStore from '../store/editorStore';

function Toolbar() {
  const { 
    language, 
    setLanguage, 
    toggleLibrary, 
    newProject, 
    projectName,
    projectFiles 
  } = useEditorStore();

  const languages = [
    { value: 'html', label: '🌐 HTML' },
    { value: 'javascript', label: '⚡ JavaScript' },
    { value: 'css', label: '🎨 CSS' },
    { value: 'python', label: '🐍 Python' }
  ];

  const handleExport = () => {
    if (Object.keys(projectFiles).length === 0) {
      // Single file
      const blob = new Blob([useEditorStore.getState().code], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `code.${language === 'javascript' ? 'js' : language}`;
      a.click();
      URL.revokeObjectURL(url);
    } else {
      // Export multiple files as JSON
      const data = {
        name: projectName,
        files: projectFiles
      };
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${projectName}.project.json`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const fileCount = Object.keys(projectFiles).length;

  return (
    <div className="toolbar">
      <select 
        value={language} 
        onChange={(e) => setLanguage(e.target.value)}
      >
        {languages.map(lang => (
          <option key={lang.value} value={lang.value}>
            {lang.label}
          </option>
        ))}
      </select>

      <button onClick={toggleLibrary}>
        📚 Library
      </button>

      <button onClick={newProject}>
        ✨ New
      </button>

      <button onClick={handleExport}>
        💾 Export
      </button>

      <span className="spacer" />

      <span className="file-info">
        📁 {projectName} {fileCount > 0 && `• ${fileCount} files`}
      </span>
    </div>
  );
}

export default Toolbar;
