
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
      'Web Development': 'from-blue-500 to-cyan-500',
      'JavaScript': 'from-yellow-500 to-orange-500',
      'React': 'from-cyan-500 to-blue-500',
      'TypeScript': 'from-blue-600 to-purple-600',
      'CSS': 'from-pink-500 to-rose-500',
      'Node.js': 'from-green-500 to-emerald-500',
      'Career': 'from-purple-500 to-violet-500',
      'Tutorial': 'from-indigo-500 to-blue-500',
    };
    return colors[category] || 'from-gray-500 to-slate-500';
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Badge className={`bg-gradient-to-r ${getCategoryColor(post.category)} text-white border-0 px-6 py-3 text-lg font-semibold shadow-lg`}>
            {post.category}
          </Badge>
          {post.featured && (
            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold px-4 py-2 text-lg shadow-lg">
              ⭐ Featured
            </Badge>
          )}
        </div>
      </div>
      
      <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
        {post.title}
      </h1>
      
      <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8">
        <div className="flex items-center bg-gradient-to-r from-blue-50 to-purple-50 rounded-full px-6 py-3 shadow-sm">
          <User className="h-6 w-6 mr-3 text-blue-600" />
          <div>
            <span className="font-bold text-lg text-gray-800">{post.author}</span>
            <Button
              onClick={onFollow}
              variant="ghost"
              size="sm"
              className={`ml-3 text-xs px-3 py-1 ${
                isFollowing 
                  ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' 
                  : 'bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-700'
              } transition-all duration-200`}
            >
              <Bell className="h-3 w-3 mr-1" />
              {isFollowing ? 'Following' : 'Follow'}
            </Button>
          </div>
        </div>
        <div className="flex items-center bg-gradient-to-r from-green-50 to-blue-50 rounded-full px-6 py-3 shadow-sm">
          <Calendar className="h-6 w-6 mr-3 text-green-600" />
          <span className="font-semibold">{new Date(post.publishedDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}</span>
        </div>
        <div className="flex items-center bg-gradient-to-r from-purple-50 to-pink-50 rounded-full px-6 py-3 shadow-sm">
          <Clock className="h-6 w-6 mr-3 text-purple-600" />
          <span className="font-semibold">{post.readTime} min read</span>
        </div>
      </div>
      
      <p className="text-xl text-gray-700 leading-relaxed mb-8 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 p-8 rounded-2xl border-l-8 border-gradient-to-b from-blue-500 to-purple-500 shadow-lg">
        {post.excerpt}
      </p>
    </>
  );
};

export default PostHeader;
