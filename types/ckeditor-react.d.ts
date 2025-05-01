declare module '@ckeditor/ckeditor5-build-classic' {
  interface EditorConfig {
    [key: string]: any; // Flexible config for toolbar, plugins, etc.
  }

  class ClassicEditor {
    static builtinPlugins: any[];
    static defaultConfig: EditorConfig;
    constructor(element: HTMLElement | string, config?: EditorConfig);
    destroy(): Promise<void>;
    getData(): string;
    setData(data: string): void;
    editing: {
      view: {
        document: {
          getRoot(): { getDomRoot(): HTMLElement } | null;
        };
      };
    };
  }

  export default ClassicEditor;
}

declare module '@ckeditor/ckeditor5-react' {
  import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
  import { ComponentType } from 'react';

  export const CKEditor: ComponentType<{
    editor: typeof ClassicEditor;
    data: string;
    onReady?: (editor: ClassicEditor) => void;
    onChange?: (event: Event, editor: ClassicEditor) => void;
    onError?: (event: Event, error: Error) => void;
    config?: any;
    [key: string]: any; // Allow additional props
  }>;
}