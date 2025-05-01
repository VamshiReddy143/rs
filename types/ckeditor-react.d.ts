// types/ckeditor-react.d.ts
declare module '@ckeditor/ckeditor5-react' {
    import { ClassicEditor } from '@ckeditor/ckeditor5-build-classic';
    import { ComponentType } from 'react';
  
    export const CKEditor: ComponentType<{
      editor: typeof ClassicEditor;
      data: string;
      onChange: (event: any, editor: any) => void;
      config?: any;
    }>;
  }