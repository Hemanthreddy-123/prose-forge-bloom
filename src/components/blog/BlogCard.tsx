
import { Calendar, Clock, User, ArrowRight, Heart, Bookmark, Eye, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { BlogPost } from '@/types/blog';
import { Link } from 'react-router-dom';
import { useState } from 'react';

interface BlogCardProps {
  post: BlogPost;
  viewMode?: 'grid' | 'list';
}

const BlogCard = ({ post, viewMode = 'grid' }: BlogCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likes, setLikes] = useState(Math.floor(Math.random() * 100) + 10);
  const [views] = useState(Math.floor(Math.random() * 1000) + 100);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
    console.log(`${isLiked ? 'Unliked' : 'Liked'} post: ${post.title}`);
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
    console.log(`${isBookmarked ? 'Removed bookmark' : 'Bookmarked'} post: ${post.title}`);
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

  if (viewMode === 'list') {
    return (
      <Link to={`/blog/${post.slug}`} className="block">
        <Card className="hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] bg-white border-0 shadow-lg overflow-hidden">
          <div className="flex">
            <div className="flex-1 p-8">
              <CardHeader className="p-0 mb-4">
                <div className="flex items-center justify-between mb-4">
                  <Badge className={`bg-gradient-to-r ${getCategoryColor(post.category)} text-white border-0 px-4 py-2 text-sm font-semibold`}>
                    {post.category}
                  </Badge>
                  {post.featured && (
                    <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold px-3 py-1">
                      ⭐ Featured
                    </Badge>
                  )}
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
              </CardHeader>
              
              <CardContent className="p-0">
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    <span className="font-medium">{post.author}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{new Date(post.publishedDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{post.readTime} min read</span>
                  </div>
                  <div className="flex items-center">
                    <Eye className="h-4 w-4 mr-2" />
                    <span>{views} views</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Button
                      onClick={handleLike}
                      variant="ghost"
                      size="sm"
                      className={`transition-all ${
                        isLiked 
                          ? 'text-red-600 hover:text-red-700 hover:bg-red-50' 
                          : 'text-gray-500 hover:text-red-600 hover:bg-red-50'
                      }`}
                    >
                      <Heart className={`h-4 w-4 mr-1 ${isLiked ? 'fill-current' : ''}`} />
                      {likes}
                    </Button>
                    
                    <Button
                      onClick={handleBookmark}
                      variant="ghost"
                      size="sm"
                      className={`transition-all ${
                        isBookmarked 
                          ? 'text-blue-600 hover:text-blue-700 hover:bg-blue-50' 
                          : 'text-gray-500 hover:text-blue-600 hover:bg-blue-50'
                      }`}
                    >
                      <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
                    </Button>
                    
                    <Button variant="ghost" size="sm" className="text-gray-500 hover:text-green-600 hover:bg-green-50">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      {Math.floor(Math.random() * 20) + 1}
                    </Button>
                  </div>
                  
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                    Read More <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </div>
          </div>
        </Card>
      </Link>
    );
  }

  return (
    <Link to={`/blog/${post.slug}`} className="block">
      <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:scale-105 bg-white border-0 shadow-lg overflow-hidden h-full">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between mb-4">
            <Badge className={`bg-gradient-to-r ${getCategoryColor(post.category)} text-white border-0 px-3 py-1 text-xs font-semibold`}>
              {post.category}
            </Badge>
            {post.featured && (
              <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold text-xs px-2 py-1">
                ⭐ Featured
              </Badge>
            )}
          </div>
          
          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
            {post.title}
          </h3>
          
          <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3">
            {post.excerpt}
          </p>
        </CardHeader>
        
        <CardContent>
          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mb-6">
            <div className="flex items-center">
              <User className="h-3 w-3 mr-1" />
              <span className="font-medium">{post.author}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              <span>{new Date(post.publishedDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              <span>{post.readTime} min</span>
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Button
                onClick={handleLike}
                variant="ghost"
                size="sm"
                className={`transition-all text-xs ${
                  isLiked 
                    ? 'text-red-600 hover:text-red-700 hover:bg-red-50' 
                    : 'text-gray-500 hover:text-red-600 hover:bg-red-50'
                }`}
              >
                <Heart className={`h-3 w-3 mr-1 ${isLiked ? 'fill-current' : ''}`} />
                {likes}
              </Button>
              
              <Button
                onClick={handleBookmark}
                variant="ghost"
                size="sm"
                className={`transition-all ${
                  isBookmarked 
                    ? 'text-blue-600 hover:text-blue-700 hover:bg-blue-50' 
                    : 'text-gray-500 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                <Bookmark className={`h-3 w-3 ${isBookmarked ? 'fill-current' : ''}`} />
              </Button>
            </div>
            
            <div className="flex items-center text-xs text-gray-500">
              <Eye className="h-3 w-3 mr-1" />
              {views}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs px-2 py-1 hover:bg-blue-50 hover:border-blue-300">
                #{tag}
              </Badge>
            ))}
          </div>
          
          <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold group-hover:shadow-lg transition-all duration-300">
            Read Full Article <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
};

export default BlogCard;
