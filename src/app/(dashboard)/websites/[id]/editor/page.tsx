'use client';

import { useParams } from 'next/navigation';
import dynamic from 'next/dynamic';

const GrapesJSEditor = dynamic(
  () => import('@/components/editor/GrapesJSEditor'),
  { ssr: false }
);

export default function EditorPage() {
  const params = useParams();

  return (
    <div className="fixed inset-0 top-16 left-64">
      <GrapesJSEditor
        onChange={(html) => {
          // Auto-save logic
          console.log('Content updated');
        }}
      />
    </div>
  );
}
