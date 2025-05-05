// UploadAdapter.ts
export class UploadAdapter {
    private loader: any;
    private xhr: XMLHttpRequest | null = null;
  
    constructor(loader: any) {
      this.loader = loader;
    }
  
    upload() {
      return this.loader.file.then(
        (file: File) =>
          new Promise((resolve, reject) => {
            const data = new FormData();
            data.append('image', file);
  
            this.xhr = new XMLHttpRequest();
            this.xhr.open('POST', '/api/upload-image', true); // Adjust the endpoint as needed
  
            this.xhr.upload.onprogress = (e) => {
              if (e.lengthComputable) {
                this.loader.uploadTotal = e.total;
                this.loader.uploaded = e.loaded;
              }
            };
  
            this.xhr.onload = () => {
              if (this.xhr && this.xhr.status === 200) {
                const response = JSON.parse(this.xhr.responseText);
                if (response.url) {
                  resolve({ default: response.url });
                } else {
                  reject(new Error('No URL returned from server'));
                }
              } else {
                reject(new Error(`Upload failed with status ${this.xhr?.status}`));
              }
            };
  
            this.xhr.onerror = () => {
              reject(new Error('Upload failed due to network error'));
            };
  
            this.xhr.send(data);
          })
      );
    }
  
    abort() {
      if (this.xhr) {
        this.xhr.abort();
      }
    }
  }
  
  export function UploadAdapterPlugin(editor: any) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
      return new UploadAdapter(loader);
    };
  }