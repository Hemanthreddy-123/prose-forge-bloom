
import { Calendar, Clock, User, Tag, Heart, Bookmark, Share2, Eye, MessageCircle, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BlogPost } from '@/types/blog';
import { Link } from 'react-router-dom';
import { useState } from 'react';

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard = ({ post }: BlogCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likes, setLikes] = useState(Math.floor(Math.random() * 100) + 10);
  const [views] = useState(Math.floor(Math.random() * 1000) + 100);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsBookmarked(!isBookmarked);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.share?.({
      title: post.title,
      text: post.excerpt,
      url: `/blog/${post.slug}`
    });
  };

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
    <Card className="h-full hover:shadow-2xl transition-all duration-300 group bg-gradient-to-br from-white to-gray-50 border-0 shadow-lg hover:scale-[1.02] overflow-hidden">
      {/* Trending indicator */}
      {post.featured && (
        <div className="absolute top-4 right-4 z-10">
          <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold animate-pulse">
            <TrendingUp className="h-3 w-3 mr-1" />
            Trending
          </Badge>
        </div>
      )}

      <CardHeader className="pb-4 relative">
        {/* Category badge with gradient */}
        <div className="flex items-center justify-between mb-3">
          <Badge className={`bg-gradient-to-r ${getCategoryColor(post.category)} text-white border-0 px-3 py-1`}>
            {post.category}
          </Badge>
          <div className="flex items-center text-sm text-gray-500">
            <Eye className="h-4 w-4 mr-1" />
            {views}
          </div>
        </div>
        
        <Link to={`/blog/${post.slug}`} className="block">
          <h3 className="text-xl font-bold group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300 line-clamp-2 leading-tight">
            {post.title}
          </h3>
        </Link>
      </CardHeader>
      
      <CardContent className="pb-4">
        <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
          {post.excerpt}
        </p>
        
        {/* Enhanced tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.slice(0, 3).map((tag) => (
            <Badge 
              key={tag} 
              variant="outline" 
              className="text-xs hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:border-blue-300 transition-all cursor-pointer"
            >
              <Tag className="h-3 w-3 mr-1" />
              {tag}
            </Badge>
          ))}
          {post.tags.length > 3 && (
            <Badge variant="outline" className="text-xs text-gray-500">
              +{post.tags.length - 3} more
            </Badge>
          )}
        </div>

        {/* Reading progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-1 mb-4">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-1 rounded-full transition-all duration-1000"
            style={{ width: `${Math.random() * 30 + 10}%` }}
          ></div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-4 border-t bg-gradient-to-r from-gray-50 to-white">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center">
              <User className="h-4 w-4 mr-1" />
              <span className="font-medium hover:text-blue-600 cursor-pointer transition-colors">
                {post.author}
              </span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              {new Date(post.publishedDate).toLocaleDateString()}
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {post.readTime} min
            </div>
          </div>
          
          {/* Action buttons */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={`p-2 transition-all ${isLiked ? 'text-red-500 hover:text-red-600' : 'text-gray-400 hover:text-red-500'}`}
            >
              <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
              <span className="ml-1 text-xs">{likes}</span>
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBookmark}
              className={`p-2 transition-all ${isBookmarked ? 'text-blue-500 hover:text-blue-600' : 'text-gray-400 hover:text-blue-500'}`}
            >
              <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleShare}
              className="p-2 text-gray-400 hover:text-green-500 transition-all"
            >
              <Share2 className="h-4 w-4" />
            </Button>
            
            <div className="flex items-center text-gray-400">
              <MessageCircle className="h-4 w-4 mr-1" />
              <span className="text-xs">{Math.floor(Math.random() * 20) + 1}</span>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default BlogCard;
