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

interface NewBlog {
  title: string;
  content: string;
  published?: boolean;
}

interface VoteData {
  post_id: number;
  dir: number;
}

interface VoteResp {
  message: string;
}

// Helper function to get the token
const getToken = (): string | null => {
  return localStorage.getItem('fastaccessToken');
};

// Fetch Blogs
export const fetchBlogs = async (): Promise<Blog[]> => {
  const token = getToken();

  if (!token) {
    throw new Error('User is not authenticated');
  }

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

// Add Blog
export const addBlog = async (blogData: NewBlog): Promise<NewBlog> => {
  const token = getToken();

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

// Vote on Post
export const votePost = async (voteData: VoteData): Promise<VoteResp> => {
  const token = getToken();

  if (!token) {
    throw new Error('User is not authenticated');
  }

  const response = await fetch('http://localhost:8000/vote', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(voteData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData?.detail || 'Failed to vote on post');
  }

  return response.json();
};
