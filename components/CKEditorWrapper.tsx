'use client';

import { useEffect, useState, useRef } from 'react';
import { toast } from 'react-toastify';

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

  useEffect(() => {
    const loadEditor = async () => {
      try {
        const CKEditorModule = await import('@ckeditor/ckeditor5-react');
        const Editor = await import('@ckeditor/ckeditor5-build-classic');

        setCKEditorComponent(() => CKEditorModule.CKEditor);
        setEditorBuild(() => Editor.default);
        setEditorLoaded(true);
      } catch (error) {
        console.error(`Failed to load CKEditor for index ${index}:`, error);
        toast.error(`Failed to load editor for content item ${index !== undefined ? index + 1 : 'unknown'}`);
      }
    };

    loadEditor();
  }, []);

  useEffect(() => {
    return () => {
      if (editorRef.current) {
        editorRef.current.destroy().catch((error: any) => {
          console.error(`Failed to destroy CKEditor for index ${index}:`, error);
        });
        editorRef.current = null;
      }
    };
  }, [index]);

  if (!editorLoaded) {
    return <div>Loading editor...</div>;
  }

  return (
    <div className="ck-editor-container">
      <CKEditorComponent
        editor={EditorBuild}
        data={data}
        onReady={(editor: any) => {
          editorRef.current = editor;
          console.log(`CKEditor initialized for index ${index}`);
        }}
        onChange={(event: any, editor: any) => {
          const newData = editor.getData();
          console.log(`CKEditor ${index} changed:`, newData);
          onChange(newData);
        }}
        onError={(event: any, error: any) => {
          console.error(`CKEditor error for index ${index}:`, error);
          toast.error(`Editor error for content item ${index !== undefined ? index + 1 : 'unknown'}`);
        }}
        config={{
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
          placeholder: index !== undefined ? `Enter your paragraph content here (Editor ${index})...` : 'Enter content here...',
        }}
      />
    </div>
  );
};

export default CKEditorWrapper;