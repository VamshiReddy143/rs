// src/components/CKEditorWrapper.tsx
'use client';

import { useEffect, useState, useRef } from 'react';
import { toast } from 'react-toastify';
import { UploadAdapterPlugin } from '@/lib/UploadAdapter'; // Adjust path as needed

interface CKEditorWrapperProps {
  data: string;
  onChange: (data: string) => void;
  index?: number;
}

const CKEditorWrapper: React.FC<CKEditorWrapperProps> = ({ data, onChange, index }) => {
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [CKEditorComponent, setCKEditorComponent] = useState<any>(null);
  const [EditorBuild, setEditorBuild] = useState<any>(null);
  const editorRef = useRef<any>(null);
  const isMounted = useRef(true);
  const [editorInitialized, setEditorInitialized] = useState(false);

  useEffect(() => {
    const loadEditor = async () => {
      try {
        const CKEditorModule = await import('@ckeditor/ckeditor5-react');
        const Editor = await import('@ckeditor/ckeditor5-build-classic');

        if (!isMounted.current) return;

        setCKEditorComponent(() => CKEditorModule.CKEditor);
        setEditorBuild(() => Editor.default || Editor);
        setEditorLoaded(true);
      } catch (error) {
        console.error(`Failed to load CKEditor for index ${index}:`, error);
        if (isMounted.current) {
          toast.error(`Failed to load editor for content item ${index !== undefined ? index + 1 : 'unknown'}`);
        }
      }
    };

    loadEditor();

    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    return () => {
      if (editorRef.current && editorInitialized && typeof editorRef.current.destroy === 'function') {
        try {
          editorRef.current.destroy();
          console.log(`CKEditor destroyed for index ${index}`);
        } catch (error) {
          console.error(`Failed to destroy CKEditor for index ${index}:`, error);
        }
        editorRef.current = null;
        setEditorInitialized(false);
      }
    };
  }, []);

  if (!editorLoaded) {
    return (
      <div className="text-gray-400 text-sm text-center p-4 bg-gray-700 rounded-lg">
        Loading editor...
      </div>
    );
  }

  if (!CKEditorComponent || !EditorBuild) {
    return (
      <div className="text-red-500 text-sm text-center p-4 bg-gray-700 rounded-lg">
        Failed to load editor. Please try again.
      </div>
    );
  }

  return (
    <div className="ck-editor-container bg-gray-700 rounded-lg p-4">
      <CKEditorComponent
        editor={EditorBuild}
        data={data}
        onReady={(editor: any) => {
          if (isMounted.current) {
            editorRef.current = editor;
            setEditorInitialized(true);
            console.log(`CKEditor initialized for index ${index}`);
          }
        }}
        onChange={(event: any, editor: any) => {
          const newData = editor.getData();
          console.log(`CKEditor ${index} changed:`, newData);
          onChange(newData);
        }}
        onError={(error: any, { willEditorRestart }: { willEditorRestart: boolean }) => {
          console.error(`CKEditor error for index ${index}:`, error);
          if (willEditorRestart) {
            editorRef.current = null;
          }
          toast.error(`Editor error for content item ${index !== undefined ? index + 1 : 'unknown'}`);
        }}
        config={{
          extraPlugins: [UploadAdapterPlugin],
          toolbar: [
            'heading',
            '|',
            'bold',
            'italic',
            'link',
            'bulletedList',
            'numberedList',
            'blockQuote',
            '|',
            'undo',
            'redo',
            '|',
            'fontSize',
            'fontColor',
            'fontBackgroundColor',
            'highlight',
            '|',
            'alignment',
            'indent',
            'outdent',
            '|',
            'imageUpload', // Enable image upload
            'insertTable',
            'mediaEmbed',
            '|',
            'code',
            'codeBlock',
            '|',
            'findAndReplace',
            'horizontalLine',
            'pageBreak',
            'specialCharacters',
            'strikethrough',
            'subscript',
            'superscript',
            'underline',
          ],
          image: {
            toolbar: [
              'imageStyle:inline',
              'imageStyle:block',
              'imageStyle:side',
              '|',
              'toggleImageCaption',
              'imageTextAlternative',
            ],
          },
          fontSize: {
            options: [10, 12, 14, 'default', 18, 20, 24, 30, 36],
            supportAllValues: true,
          },
          heading: {
            options: [
              { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
              { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
              { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
              { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
              { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
              { model: 'heading5', view: 'h5', title: 'Heading 5', class: 'ck-heading_heading5' },
              { model: 'heading6', view: 'h6', title: 'Heading 6', class: 'ck-heading_heading6' },
            ],
          },
          mediaEmbed: {
            previewsInData: true,
            providers: [
              {
                name: 'youtube',
                url: /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/,
                html: (match: RegExpMatchArray) => {
                  const id = match[2];
                  return (
                    '<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;">' +
                    `<iframe src="https://www.youtube.com/embed/${id}" ` +
                    'style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" ' +
                    'frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>' +
                    '</div>'
                  );
                },
              },
            ],
          },
          list: {
            properties: {
              styles: true,
              startIndex: true,
              reversed: true,
            },
          },
          table: {
            contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
          },
          link: {
            addTargetToExternalLinks: true,
          },
          placeholder: index !== undefined ? `Enter your paragraph content here (Editor ${index + 1})...` : 'Enter content here...',
        }}
      />
    </div>
  );
};

export default CKEditorWrapper;