
interface BlogOwner {
    id: number;
    email: string;
    created_at: string;
  }
  
  interface BlogPost {
    title: string;
    content: string;
    published: boolean;
    id: number;
    created_at: string;
    owner_id: number;
    owner: BlogOwner;
  }
  
  interface Blog {
    Post: BlogPost;
    votes: number;
  }

  interface NewBlog{
    title:string;
    content:string;
    published?:boolean;
  }


export const fetchBlogs = async (): Promise<Blog[]> => {
    const token = localStorage.getItem('fastaccessToken'); // Assuming you store your token in localStorage
    console.log("Toekn",token)
    const response = await fetch('http://localhost:8000/posts', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (!response.ok) {
      throw new Error('Failed to fetch blogs');
    }
  
    return response.json();
  };


  export const addBlog = async (blogData: NewBlog): Promise<NewBlog> => {
    const token = localStorage.getItem('fastaccessToken'); // Assuming you store your token in localStorage
  
    if (!token) {
      throw new Error('User is not authenticated');
    }
  
    const response = await fetch('http://localhost:8000/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(blogData),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.detail || 'Failed to add blog');
    }
  
    return response.json();
  };
  