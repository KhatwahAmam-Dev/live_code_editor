import { useEffect, useRef } from 'react';
import useEditorStore from '../store/editorStore';
import { compileCode } from '../utils/compiler';

export function usePreview() {
  const { code, language, setPreview } = useEditorStore();
  const timeoutRef = useRef(null);

  useEffect(() => {
    // Debounce untuk performance
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      try {
        const result = compileCode(code, language);
        setPreview(result);
      } catch (error) {
        setPreview(`
          <div style="padding:20px;color:#f48771;font-family:monospace;">
            <h3>⚠️ Error</h3>
            <pre>${error.message}</pre>
          </div>
        `);
      }
    }, 300);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [code, language, setPreview]);
}
