import React, { useState } from 'react';
import { useQueryClient } from 'react-query';

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
  const [userVote, setUserVote] = useState<number | null>(null); // State to track user's vote (1 for upvote, -1 for downvote)
  const queryClient = useQueryClient();

  const handleVote = async (postId: number, direction: number) => {
    const token = localStorage.getItem('fastaccessToken');

    if (!token) {
      throw new Error('User is not authenticated');
    }

    const url = `http://localhost:8000/vote`;

    try {
      // Check if user has already voted
      if (userVote === direction) {
        // If user's current vote matches direction, remove the vote
        direction = 0; // Set direction to 0 to remove the vote
        setUserVote(null); // Clear user's vote state
      } else {
        // Otherwise, set the user's vote to the new direction
        setUserVote(direction);
      }

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ post_id: postId, dir: direction }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.detail || 'Failed to vote on post');
      }

      // Handle success if needed, e.g., update UI state
      console.log('Vote successful:', await response.json());

      // Invalidate the 'blogs' query to update UI with latest data
      queryClient.invalidateQueries('blogs');
    } catch (error) {
      console.error('Error voting on post:', error);
      // Handle error, e.g., display error message to user
    }
  };

  return (
    <div className="border bg-stone-200 border-gray-300 rounded-md p-4 mb-6 shadow-sm w-auto">
      <div className="mb-2 text-gray-800">
        <strong>{Post.owner.email}</strong>
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gray-900">{Post.title}</h3>
      <p className="mb-4 text-gray-700">{Post.content}</p>
      <div className="flex justify-between items-center text-gray-600">
        <p className="text-sm">
          <i>Posted on: {new Date(Post.created_at).toLocaleString()}</i>
        </p>
        <div className="flex items-center space-x-2">
          <button
            className={`px-2 py-1 bg-stone-800 text-white text-sm rounded-md ${
              userVote === 1 ? 'bg-green-500' : ''
            }`}
            aria-label={`Vote for ${Post.title}`}
            onClick={() => handleVote(Post.id, 1)} // Assuming '1' means upvote
          >
            Upvote
          </button>
          <span className="text-sm">{votes}</span>
          <button
            className={`px-2 py-1 bg-stone-800 text-white text-sm rounded-md ${
              userVote === -1 ? 'bg-red-500' : ''
            }`}
            aria-label={`Downvote for ${Post.title}`}
            onClick={() => handleVote(Post.id, -1)} // Assuming '-1' means downvote
          >
            Downvote
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogItem;
