
import { Calendar, Clock, User, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BlogPost } from '@/types/blog';

interface PostHeaderProps {
  post: BlogPost;
  isFollowing: boolean;
  onFollow: () => void;
}

const PostHeader = ({ post, isFollowing, onFollow }: PostHeaderProps) => {
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Web Development': 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
      'JavaScript': 'linear-gradient(135deg, #fbbf24, #f59e0b)',
      'React': 'linear-gradient(135deg, #06b6d4, #0891b2)',
      'TypeScript': 'linear-gradient(135deg, #3b82f6, #7c3aed)',
      'CSS': 'linear-gradient(135deg, #ec4899, #be185d)',
      'Node.js': 'linear-gradient(135deg, #10b981, #059669)',
      'Career': 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
      'Tutorial': 'linear-gradient(135deg, #6366f1, #4f46e5)',
    };
    return colors[category] || 'linear-gradient(135deg, #6b7280, #4b5563)';
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Badge 
            style={{
              background: getCategoryColor(post.category),
              color: 'white',
              border: 'none'
            }}
            className="px-6 py-3 text-lg font-semibold shadow-lg rounded-xl"
          >
            {post.category}
          </Badge>
          {post.featured && (
            <Badge 
              style={{
                background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                color: 'white',
                border: 'none'
              }}
              className="font-bold px-4 py-2 text-lg shadow-lg rounded-xl"
            >
              ⭐ फीचर्ड / Featured
            </Badge>
          )}
        </div>
      </div>
      
      <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight bg-gradient-to-r from-orange-600 via-green-600 to-blue-600 bg-clip-text text-transparent">
        {post.title}
      </h1>
      
      <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8">
        <div className="flex items-center bg-gradient-to-r from-orange-50 to-green-50 rounded-full px-6 py-3 shadow-md border border-orange-200">
          <User className="h-6 w-6 mr-3 text-orange-600" />
          <div>
            <span className="font-bold text-lg text-gray-800">{post.author}</span>
            <Button
              onClick={onFollow}
              style={{
                background: isFollowing 
                  ? 'linear-gradient(135deg, #3b82f6, #1d4ed8)' 
                  : 'linear-gradient(135deg, #f3f4f6, #e5e7eb)',
                color: isFollowing ? 'white' : '#4b5563',
                border: 'none'
              }}
              className="ml-3 text-xs px-3 py-1 transition-all duration-200 rounded-lg hover:scale-105"
            >
              <Bell className="h-3 w-3 mr-1" />
              {isFollowing ? 'फॉलो कर रहे / Following' : 'फॉलो करें / Follow'}
            </Button>
          </div>
        </div>
        <div className="flex items-center bg-gradient-to-r from-green-50 to-blue-50 rounded-full px-6 py-3 shadow-md border border-green-200">
          <Calendar className="h-6 w-6 mr-3 text-green-600" />
          <span className="font-semibold">{new Date(post.publishedDate).toLocaleDateString('hi-IN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}</span>
        </div>
        <div className="flex items-center bg-gradient-to-r from-purple-50 to-pink-50 rounded-full px-6 py-3 shadow-md border border-purple-200">
          <Clock className="h-6 w-6 mr-3 text-purple-600" />
          <span className="font-semibold">{post.readTime} मिनट पढ़ने का समय / min read</span>
        </div>
      </div>
      
      <p className="text-xl text-gray-700 leading-relaxed mb-8 bg-gradient-to-r from-orange-50 via-white to-green-50 p-8 rounded-2xl border-l-8 border-orange-500 border-r-8 border-green-500 shadow-lg">
        {post.excerpt}
      </p>
    </>
  );
};

export default PostHeader;
