'use client';

import { useEffect, useRef } from 'react';

interface GrapesJSEditorProps {
  content?: string;
  onChange?: (html: string) => void;
}

export default function GrapesJSEditor({ content = '', onChange }: GrapesJSEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current || !editorRef.current) return;
    initializedRef.current = true;

    const init = async () => {
      // Load grapesjs css
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/grapesjs/dist/css/grapes.min.css';
      document.head.appendChild(link);

      // Load grapesjs
      const grapesjs = await import('grapesjs');

      const editor = grapesjs.default.init({
        container: editorRef.current!,
        height: '100vh',
        width: 'auto',
        storageManager: false,
        fromElement: true,
        canvas: {
          styles: [
            'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css',
          ],
        },
        plugins: [],
        panels: {
          defaults: [
            {
              id: 'basic-actions',
              el: '.gjs-pn-commands',
              buttons: [
                {
                  id: 'visibility',
                  active: true,
                  className: 'btn-toggle-borders',
                  label: '<u>B</u>',
                  command: 'sw-visibility',
                },
                {
                  id: 'export',
                  className: 'btn-export',
                  label: 'Export',
                  command: () => {
                    // onChange di-handle oleh auto-save listener
                  },
                },
              ],
            },
          ],
        },
      });

      // Set initial content
      if (content) {
        editor.setComponents(content);
      } else {
        editor.setComponents(`
          <div class="min-h-screen bg-white">
            <header class="bg-gray-50 py-16 text-center">
              <h1 class="text-5xl font-bold text-gray-900">Selamat Datang</h1>
              <p class="text-xl text-gray-600 mt-4">Website bisnis kamu</p>
            </header>
            <section class="max-w-6xl mx-auto py-16 px-4">
              <div class="grid grid-cols-3 gap-8">
                <div class="text-center">
                  <div class="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4"></div>
                  <h3 class="font-semibold text-lg">Layanan 1</h3>
                  <p class="text-gray-500 mt-2">Deskripsi layanan</p>
                </div>
                <div class="text-center">
                  <div class="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4"></div>
                  <h3 class="font-semibold text-lg">Layanan 2</h3>
                  <p class="text-gray-500 mt-2">Deskripsi layanan</p>
                </div>
                <div class="text-center">
                  <div class="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4"></div>
                  <h3 class="font-semibold text-lg">Layanan 3</h3>
                  <p class="text-gray-500 mt-2">Deskripsi layanan</p>
                </div>
              </div>
            </section>
          </div>
        `);
      }

      // Auto-save
      editor.on('change:changesCount', () => {
        const html = editor.getHtml();
        const css = editor.getCss();
        onChange?.(`<style>${css}</style>${html}`);
      });
    };

    init();
  }, []);

  return (
    <div className="h-full w-full">
      <div ref={editorRef} className="h-full" />
    </div>
  );
}
