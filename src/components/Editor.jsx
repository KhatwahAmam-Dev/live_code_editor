import React from 'react';
import Editor from '@monaco-editor/react';
import useEditorStore from '../store/editorStore';

function CodeEditor() {
  const { code, language, theme, setCode } = useEditorStore();

  const handleEditorChange = (value) => {
    setCode(value);
  };

  return (
    <div style={{ height: '100%', position: 'relative' }}>
      <Editor
        height="100%"
        language={language}
        value={code}
        onChange={handleEditorChange}
        theme={theme}
        options={{
          fontSize: 14,
          fontFamily: 'Cascadia Code, Consolas, monospace',
          minimap: { enabled: false },
          automaticLayout: true,
          scrollBeyondLastLine: false,
          wordWrap: 'on',
          lineNumbers: 'on',
          renderWhitespace: 'selection',
          tabSize: 2,
          insertSpaces: true,
          bracketPairColorization: { enabled: true },
          suggest: {
            showKeywords: true,
            showSnippets: true,
          },
          quickSuggestions: {
            other: true,
            comments: false,
            strings: false,
          },
        }}
      />
      <div className="pane-label">
        {language.toUpperCase()} • {code.split('\n').length} lines
      </div>
    </div>
  );
}

export default CodeEditor;
