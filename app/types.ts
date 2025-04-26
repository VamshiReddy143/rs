export interface TemplateField {
    name: string;
    type: 'text' | 'textarea' | 'image' | 'select';
    label: string;
    required?: boolean;
    options?: string[];
  }
  
  export interface TemplateStyle {
    cardClass: string;
    imageClass: string;
    titleClass: string;
    descriptionClass: string;
    previewImage: string;
  }
  
  export interface Template {
    id: string;
    name: string;
    fields: TemplateField[];
    style: TemplateStyle;
  }
  
  export interface Project {
    _id?: string;
    templateId: string;
    data: { [key: string]: string };
    animation: string;
    createdAt?: Date;
  }
  
  export interface CustomField {
    name: string;
    type: 'text' | 'textarea' | 'image' | 'select';
    label: string;
    required: boolean;
    options?: string[];
  }