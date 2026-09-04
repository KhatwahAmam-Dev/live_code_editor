import React from 'react';
import useEditorStore from '../store/editorStore';

function Preview() {
  const { previewHtml } = useEditorStore();

  return (
    <div style={{ height: '100%', position: 'relative', background: '#ffffff' }}>
      <iframe
        srcDoc={previewHtml}
        sandbox="allow-scripts allow-modals allow-same-origin"
        className="preview-frame"
        title="Live Preview"
      />
      <div className="pane-label">👁️ Preview</div>
    </div>
  );
}

export default Preview;
