'use client';

import { css } from '@codemirror/lang-css';
import { html } from '@codemirror/lang-html';
import { javascript } from '@codemirror/lang-javascript';
import { linter, lintGutter, type Diagnostic } from '@codemirror/lint';
import { EditorView } from '@codemirror/view';
import CodeMirror from '@uiw/react-codemirror';
import { useMemo } from 'react';

interface CodeEditorProps {
  value: string;
  language: 'html' | 'css' | 'both' | 'javascript' | 'html-js' | 'typescript';
  onChange?: (value: string) => void;
  readOnly?: boolean;
  className?: string;
  diagnostics?: Diagnostic[];
  fillHeight?: boolean;
}

const beginnerTheme = EditorView.theme({
  '&': {
    fontSize: '16px',
    backgroundColor: 'var(--color-editor-bg)',
  },
  '.cm-content': {
    fontFamily: 'var(--font-mono), monospace',
    padding: '16px',
    caretColor: '#fff',
  },
  '.cm-gutters': {
    backgroundColor: 'var(--color-editor-bg)',
    color: '#666',
    border: 'none',
    paddingLeft: '8px',
  },
  '.cm-activeLine': {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  '.cm-selectionBackground': {
    backgroundColor: 'rgba(59, 130, 246, 0.3) !important',
  },
  '.cm-cursor': {
    borderLeftColor: '#fff',
    borderLeftWidth: '2px',
  },
  // Lint tooltip styling for dark editor
  '.cm-tooltip': {
    backgroundColor: '#2a2a3e',
    border: '1px solid #3a3a5a',
    borderRadius: '8px',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
    color: '#cdd6f4',
    fontSize: '13px',
    lineHeight: '1.5',
    maxWidth: '400px',
  },
  '.cm-tooltip-lint': {
    padding: '0',
  },
  '.cm-diagnostic': {
    padding: '8px 12px',
    borderLeft: 'none',
  },
  '.cm-diagnostic-error': {
    borderLeft: '3px solid #ef4444',
    backgroundColor: 'rgba(239, 68, 68, 0.08)',
  },
  '.cm-diagnostic-warning': {
    borderLeft: '3px solid #f59e0b',
    backgroundColor: 'rgba(245, 158, 11, 0.08)',
  },
  '.cm-diagnostic-info': {
    borderLeft: '3px solid #3b82f6',
    backgroundColor: 'rgba(59, 130, 246, 0.08)',
  },
  '.cm-lint-marker': {
    width: '8px',
    height: '8px',
  },
  '.cm-lint-marker-error': {
    content: "'●'",
  },
  '.cm-lint-marker-warning': {
    content: "'●'",
  },
});

function getExtensions(language: CodeEditorProps['language']) {
  switch (language) {
    case 'html':
      return [html()];
    case 'css':
      return [css()];
    case 'both':
      return [html()];
    case 'javascript':
      return [javascript()];
    case 'html-js':
      return [html({ autoCloseTags: true })];
    case 'typescript':
      return [javascript({ typescript: true })];
  }
}

// The library's height prop sets .cm-scroller { height: 100% !important }
// which collapses in auto-height mode. These overrides bypass that.
const autoHeightTheme = EditorView.theme({
  '&': {
    height: 'auto',
  },
  '& .cm-scroller': {
    height: 'auto !important',
    overflow: 'auto !important',
  },
});

const fillHeightTheme = EditorView.theme({
  '&': {
    height: '100%',
  },
});

export default function CodeEditor({
  value,
  language,
  onChange,
  readOnly = false,
  className = '',
  diagnostics,
  fillHeight = false,
}: CodeEditorProps) {
  const extensions = useMemo(() => {
    const exts = [...getExtensions(language), beginnerTheme];
    exts.push(fillHeight ? fillHeightTheme : autoHeightTheme);
    if (diagnostics) {
      exts.push(
        linter(() => diagnostics, { delay: 0 }),
        lintGutter(),
      );
    }
    return exts;
  }, [language, diagnostics, fillHeight]);

  return (
    <div className={`rounded-[var(--radius-md)] overflow-clip shadow-card flex flex-col ${className}`}>
      <div className='flex items-center justify-between px-4 py-2 bg-[#181825] text-xs text-[#666] shrink-0'>
        <span>{language.toUpperCase()}</span>
        {readOnly && <span className='text-warning'>READ ONLY</span>}
      </div>
      <CodeMirror
        value={value}
        onChange={onChange}
        extensions={extensions}
        theme='dark'
        readOnly={readOnly}
        className='flex-1'
        basicSetup={{
          lineNumbers: true,
          highlightActiveLine: true,
          bracketMatching: true,
          closeBrackets: true,
          autocompletion: false,
          foldGutter: false,
          searchKeymap: false,
        }}
      />
    </div>
  );
}
