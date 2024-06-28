import React from 'react';

interface BlogItemProps {
  post: {
    Post: {
      title: string;
      content: string;
      published: boolean;
      id: number;
      created_at: string;
      owner_id: number;
      owner: {
        id: number;
        email: string;
        created_at: string;
      };
    };
    votes: number;
  };
}

const BlogItem: React.FC<BlogItemProps> = ({ post }) => {
  const { Post, votes } = post;

  return (
    <div className="border bg-stone-200 border-gray-300 rounded-md p-4 mb-6">
      <div className="mb-2">
        <strong>{Post.owner.email}</strong>
      </div>
      <h3 className="text-xl font-semibold mb-2">{Post.title}</h3>
      <p className="mb-4">{Post.content}</p>
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-600">
          <i>Posted on: {new Date(Post.created_at).toLocaleString()}</i>
        </p>
        <p className="text-sm text-gray-600">
          <strong>Votes:</strong> {votes}
        </p>
      </div>
    </div>
  );
};

export default BlogItem;
