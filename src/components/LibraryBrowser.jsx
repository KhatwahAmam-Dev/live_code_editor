import React, { useState } from 'react';
import useEditorStore from '../store/editorStore';
import { TEMPLATE_LIBRARY } from '../utils/constants';

function LibraryBrowser() {
  const { isLibraryOpen, toggleLibrary, setCode, setLanguage } = useEditorStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', ...new Set(TEMPLATE_LIBRARY.map(t => t.category))];

  const filteredTemplates = TEMPLATE_LIBRARY.filter(template => {
    const matchSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = selectedCategory === 'all' || template.category === selectedCategory;
    return matchSearch && matchCategory;
  });

  const handleSelectTemplate = (template) => {
    setLanguage(template.language);
    setCode(template.content);
    toggleLibrary();
  };

  if (!isLibraryOpen) return null;

  return (
    <div className="modal-overlay" onClick={toggleLibrary}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={toggleLibrary}>✕</button>
        
        <h2>📚 Template Library</h2>
        
        <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="🔍 Cari template..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              flex: 1,
              padding: '8px 12px',
              background: '#3c3c3c',
              border: '1px solid #555',
              borderRadius: '4px',
              color: '#d4d4d4',
              minWidth: '150px'
            }}
          />
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{
              padding: '8px 12px',
              background: '#3c3c3c',
              border: '1px solid #555',
              borderRadius: '4px',
              color: '#d4d4d4'
            }}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat === 'all' ? '📂 All' : cat}
              </option>
            ))}
          </select>
        </div>

        <div className="template-grid">
          {filteredTemplates.length > 0 ? (
            filteredTemplates.map((template, idx) => (
              <div 
                key={idx} 
                className="template-card"
                onClick={() => handleSelectTemplate(template)}
              >
                <h4>{template.icon} {template.name}</h4>
                <p>{template.description}</p>
                <span style={{ 
                  fontSize: '10px', 
                  color: '#0e639c',
                  background: '#1e1e1e',
                  padding: '2px 8px',
                  borderRadius: '10px',
                  display: 'inline-block',
                  marginTop: '8px'
                }}>
                  {template.language}
                </span>
              </div>
            ))
          ) : (
            <p style={{ color: '#888', gridColumn: '1 / -1', textAlign: 'center', padding: '40px 0' }}>
              Tidak ada template yang cocok
            </p>
          )}
        </div>

        <div style={{ marginTop: '20px', borderTop: '1px solid #3e3e42', paddingTop: '16px' }}>
          <p style={{ color: '#888', fontSize: '12px' }}>
            💡 Klik template untuk memuat ke editor. Bisa diedit langsung!
          </p>
        </div>
      </div>
    </div>
  );
}

export default LibraryBrowser;
