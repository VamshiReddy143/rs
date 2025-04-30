export interface IProject {
  name: string;
  about: string;
  services: {
    projectType: string;
    industries: string[];
  };
  year: string;
  team: string[];
  clientAbout: string;
  quote: {
    text: string;
    author: string;
    position: string;
  };
  projectMotive: string;
  companyDetails: string[];
  capabilities: {
    title: string;
    description: string;
  };
  technologies: Array<{
    title: string;
    description: string;
  }>;
  images: {
    hero: string; // Change to string
    team: string; // Change to string
  };
  thumbnailText: string;
  thumbnailImage: File | null;
}


export interface IProjectFormData {
  name: string;
  about: string;
  services: {
    projectType: string;
    industries: string[];
  };
  year: string;
  team: string[];
  clientAbout: string;
  quote: {
    text: string;
    author: string;
    position: string;
  };
  projectMotive: string;
  companyDetails: string[];
  capabilities: {
    title: string;
    description: string;
  };
  technologies: Array<{
    title: string;
    description: string;
  }>;
  images: {
    hero: File | null;
    team: File | null;
  };
  thumbnailText: string;
  thumbnailImage: File | null;
}
  
  export interface ITemplate3Project {
    name: string;
    tagline: string;
    clientAbout: string;
    type: string;
    quote: {
      text: string;
      author: string;
      position: string;
    };
    challenges: string[];
    actions: string[];
    results: string[];
    images: {
      hero: string; // Remove `| null`
      challenge: string; 
    };
    thumbnailText: string;
    thumbnailImage: string;
  }

  export interface ITemplate3FormData {
    name: string;
    tagline: string;
    clientAbout: string;
    type: string;
    quote: {
      text: string;
      author: string;
      position: string;
    };
    challenges: string[];
    actions: string[];
    results: string[];
    images: {
      hero: File | null;
      challenge: File | null;
    };
    thumbnailText: string;
    thumbnailImage: File | null;
  }
  
  export interface ICustomContent {
    title: string;
    thumbnailText: string;
    thumbnailImage: File | null;
    content: Array<{
      type: 'text' | 'image' | 'video';
      value: string | File;
      description?: string;
    }>;
  }

  export interface ContentBlock {
    type: 'heading' | 'paragraph' | 'bullet' | 'image' | 'video';
    content: string;
    order: number;
  }
  
  export interface ICustomContent {
    _id: string;
    type: 'AI' | 'Data Science' | 'Cloud' | 'React' | 'React Native' | 'Node.js' | 'Ruby on Rails';
    title: string;
    contentBlocks: ContentBlock[];
    thumbnailText: string;

    createdAt: Date;
    isFeatured: boolean;
  }