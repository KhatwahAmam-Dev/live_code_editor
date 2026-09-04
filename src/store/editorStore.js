import { create } from 'zustand';

const useEditorStore = create((set, get) => ({
  // State
  language: 'html',
  code: '',
  previewHtml: '<div style="padding:20px;color:#888;">💡 Tulis kode di editor untuk melihat preview</div>',
  projectFiles: {},
  activeFile: null,
  projectName: 'Untitled',
  isLibraryOpen: false,
  isUploading: false,
  theme: 'vs-dark',
  
  // Actions
  setLanguage: (lang) => {
    set({ language: lang });
    // Reset code dengan template sesuai bahasa
    const templates = {
      html: '<h1>Hello World!</h1>\n<p>Mulai mengetik HTML di sini...</p>',
      javascript: '// JavaScript\nconsole.log("Hello World!");\n\n// Tulis kode JS di sini',
      css: '/* CSS */\nbody {\n  background: #f0f0f0;\n  font-family: Arial;\n}\n\nh1 {\n  color: #0e639c;\n}',
      python: '# Python\nprint("Hello World!")\n\n# Tulis kode Python di sini'
    };
    set({ code: templates[lang] || '' });
  },
  
  setCode: (code) => set({ code }),
  
  setPreview: (html) => set({ previewHtml: html }),
  
  loadProject: (files, mainFile) => {
    set({
      projectFiles: files,
      activeFile: mainFile,
      code: files[mainFile]?.content || '',
      language: files[mainFile]?.language || 'html'
    });
  },
  
  setActiveFile: (filename) => {
    const { projectFiles } = get();
    if (projectFiles[filename]) {
      set({
        activeFile: filename,
        code: projectFiles[filename].content,
        language: projectFiles[filename].language
      });
    }
  },
  
  updateFile: (filename, content) => {
    const { projectFiles, activeFile } = get();
    if (projectFiles[filename]) {
      const updated = {
        ...projectFiles,
        [filename]: { ...projectFiles[filename], content }
      };
      set({ projectFiles: updated });
      // Jika file yang diedit adalah file aktif, update code juga
      if (activeFile === filename) {
        set({ code: content });
      }
    }
  },
  
  toggleLibrary: () => set((state) => ({ isLibraryOpen: !state.isLibraryOpen })),
  
  setProjectName: (name) => set({ projectName: name }),
  
  // Reset untuk new project
  newProject: () => {
    const defaultHtml = '<h1>Hello World!</h1>\n<p>Mulai proyek baru di sini...</p>';
    set({
      projectFiles: {},
      activeFile: null,
      code: defaultHtml,
      language: 'html',
      projectName: 'Untitled',
      previewHtml: defaultHtml
    });
  }
}));

export default useEditorStore;
