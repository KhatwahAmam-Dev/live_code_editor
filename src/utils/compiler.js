export function compileCode(code, language) {
  switch (language) {
    case 'html':
      return code || '<p style="color:#888;">Kosong...</p>';
      
    case 'javascript':
      return `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { 
                margin: 0; 
                padding: 20px; 
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                background: #ffffff;
              }
              #app { 
                max-width: 800px; 
                margin: 0 auto; 
              }
            </style>
          </head>
          <body>
            <div id="app"></div>
            <script>
              try {
                ${code}
              } catch(e) {
                document.getElementById('app').innerHTML = 
                  '<div style="color:#f48771;padding:20px;border:1px solid #f48771;border-radius:4px;">❌ Error: ' + e.message + '</div>';
                console.error(e);
              }
            </script>
          </body>
        </html>
      `;
      
    case 'css':
      return `
        <!DOCTYPE html>
        <html>
          <head>
            <style>${code}</style>
          </head>
          <body>
            <div style="padding:20px;font-family:system-ui;">
              <h1>🎨 CSS Preview</h1>
              <p>Edit CSS di editor untuk melihat perubahan</p>
              <div style="margin-top:20px;padding:20px;border:2px dashed #ccc;border-radius:8px;">
                <button style="padding:10px 20px;border:none;border-radius:4px;cursor:pointer;">Tombol</button>
                <div style="margin-top:12px;padding:12px;background:#f5f5f5;border-radius:4px;">
                  Kotak dengan style CSS
                </div>
              </div>
            </div>
          </body>
        </html>
      `;
      
    case 'python':
      // Untuk Python, kita simulasikan output di preview
      // Di production, ini panggil backend
      return `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { 
                padding: 20px; 
                font-family: 'Courier New', monospace;
                background: #1e1e1e;
                color: #d4d4d4;
              }
              .output {
                background: #2d2d30;
                padding: 20px;
                border-radius: 4px;
                white-space: pre-wrap;
                border-left: 3px solid #0e639c;
              }
            </style>
          </head>
          <body>
            <h3>🐍 Python Output</h3>
            <div class="output">
              # Simulasi output Python\n# (Untuk Python asli, perlu backend)\n\n${code.split('\n').map(line => '> ' + line).join('\n')}
            </div>
            <p style="color:#888;font-size:12px;margin-top:20px;">
              ⚡ Catatan: Python dijalankan di backend. 
              ${code.includes('print') ? 'Akan menampilkan output print()' : 'Tulis kode Python dengan print() untuk melihat output'}
            </p>
          </body>
        </html>
      `;
      
    default:
      return `<pre style="padding:20px;font-family:monospace;">${code}</pre>`;
  }
}

// Helper: detect language dari ekstensi file
export function getLanguageFromExt(filename) {
  const ext = filename.split('.').pop().toLowerCase();
  const map = {
    'html': 'html',
    'htm': 'html',
    'js': 'javascript',
    'mjs': 'javascript',
    'css': 'css',
    'py': 'python',
    'json': 'json',
    'xml': 'xml',
    'svg': 'xml'
  };
  return map[ext] || 'html';
}

// Helper: cari file utama dalam project
export function findMainFile(files) {
  const priorities = ['index.html', 'main.py', 'app.js', 'style.css'];
  for (const p of priorities) {
    if (files[p]) return p;
  }
  // Ambil file pertama
  const keys = Object.keys(files);
  return keys.length > 0 ? keys[0] : null;
}
