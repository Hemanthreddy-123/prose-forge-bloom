
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Calendar, Clock, User, ArrowLeft, Tag, Heart, Bookmark, Share2, Eye, MessageCircle, Coffee } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { BlogPost as BlogPostType } from '@/types/blog';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import SocialShare from './SocialShare';
import ReadingProgress from './ReadingProgress';

interface BlogPostProps {
  post: BlogPostType;
}

const BlogPost = ({ post }: BlogPostProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likes, setLikes] = useState(Math.floor(Math.random() * 500) + 50);
  const [views] = useState(Math.floor(Math.random() * 5000) + 500);
  const [readingTime, setReadingTime] = useState(0);

  useEffect(() => {
    // Simulate reading time tracking
    const timer = setInterval(() => {
      setReadingTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <ReadingProgress />
      
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-8">
          <Link to="/blog">
            <Button variant="ghost" className="mb-6 hover:bg-blue-50">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
          
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <Badge className={`bg-gradient-to-r ${getCategoryColor(post.category)} text-white border-0 px-4 py-2`}>
                  {post.category}
                </Badge>
                {post.featured && (
                  <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold">
                    ⭐ Featured
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center space-x-4 text-gray-500 text-sm">
                <div className="flex items-center">
                  <Eye className="h-4 w-4 mr-1" />
                  {views.toLocaleString()} views
                </div>
                <div className="flex items-center">
                  <Coffee className="h-4 w-4 mr-1" />
                  {Math.floor(readingTime / 60)}:{(readingTime % 60).toString().padStart(2, '0')}
                </div>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8">
              <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
                <User className="h-5 w-5 mr-2" />
                <span className="font-medium">{post.author}</span>
              </div>
              <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
                <Calendar className="h-5 w-5 mr-2" />
                <span>{new Date(post.publishedDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </div>
              <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
                <Clock className="h-5 w-5 mr-2" />
                <span>{post.readTime} min read</span>
              </div>
            </div>
            
            <p className="text-xl text-gray-600 leading-relaxed mb-8 bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl border-l-4 border-blue-500">
              {post.excerpt}
            </p>

            {/* Action buttons */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <Button
                  onClick={handleLike}
                  variant="outline"
                  className={`transition-all ${
                    isLiked 
                      ? 'bg-red-50 border-red-200 text-red-600 hover:bg-red-100' 
                      : 'hover:bg-red-50 hover:border-red-200 hover:text-red-600'
                  }`}
                >
                  <Heart className={`h-5 w-5 mr-2 ${isLiked ? 'fill-current' : ''}`} />
                  {likes} Likes
                </Button>
                
                <Button
                  onClick={handleBookmark}
                  variant="outline"
                  className={`transition-all ${
                    isBookmarked 
                      ? 'bg-blue-50 border-blue-200 text-blue-600 hover:bg-blue-100' 
                      : 'hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600'
                  }`}
                >
                  <Bookmark className={`h-5 w-5 mr-2 ${isBookmarked ? 'fill-current' : ''}`} />
                  {isBookmarked ? 'Saved' : 'Save'}
                </Button>
                
                <Button variant="outline" className="hover:bg-green-50 hover:border-green-200 hover:text-green-600">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  {Math.floor(Math.random() * 50) + 5} Comments
                </Button>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <Card className="mb-8 shadow-xl bg-white">
                <CardContent className="p-8 lg:p-12">
                  <div className="prose prose-lg max-w-none">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        h1: ({ children }) => (
                          <h1 className="text-4xl font-bold text-gray-900 mb-8 mt-12 first:mt-0 pb-4 border-b-2 border-gradient-to-r from-blue-500 to-purple-500">
                            {children}
                          </h1>
                        ),
                        h2: ({ children }) => (
                          <h2 className="text-3xl font-semibold text-gray-800 mb-6 mt-10 pb-2 border-b border-gray-200">
                            {children}
                          </h2>
                        ),
                        h3: ({ children }) => (
                          <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">
                            {children}
                          </h3>
                        ),
                        p: ({ children }) => (
                          <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                            {children}
                          </p>
                        ),
                        ul: ({ children }) => (
                          <ul className="list-disc list-inside text-gray-700 mb-6 space-y-3 text-lg">
                            {children}
                          </ul>
                        ),
                        ol: ({ children }) => (
                          <ol className="list-decimal list-inside text-gray-700 mb-6 space-y-3 text-lg">
                            {children}
                          </ol>
                        ),
                        code: ({ children, className }) => {
                          const isBlock = className?.includes('language-');
                          if (isBlock) {
                            return (
                              <pre className="bg-gradient-to-r from-gray-900 to-gray-800 text-gray-100 p-6 rounded-xl overflow-x-auto mb-6 shadow-lg">
                                <code className="text-sm">{children}</code>
                              </pre>
                            );
                          }
                          return (
                            <code className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-3 py-1 rounded-lg text-sm font-medium">
                              {children}
                            </code>
                          );
                        },
                        blockquote: ({ children }) => (
                          <blockquote className="border-l-4 border-gradient-to-b from-blue-500 to-purple-500 pl-6 py-4 my-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-r-lg italic text-gray-700 text-lg">
                            {children}
                          </blockquote>
                        ),
                      }}
                    >
                      {post.content}
                    </ReactMarkdown>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="lg:col-span-1 space-y-6">
              {/* Social Share */}
              <SocialShare 
                title={post.title}
                url={`/blog/${post.slug}`}
                excerpt={post.excerpt}
              />
            </div>
          </div>
          
          {/* Tags */}
          <Card className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <Tag className="h-6 w-6 mr-3 text-blue-600" />
                Related Topics
              </h3>
              <div className="flex flex-wrap gap-3">
                {post.tags.map((tag) => (
                  <Badge 
                    key={tag} 
                    variant="outline" 
                    className="text-base px-4 py-2 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white hover:border-transparent cursor-pointer transition-all duration-300"
                  >
                    #{tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
