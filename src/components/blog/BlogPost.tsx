
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Calendar, Clock, User, ArrowLeft, Tag, Heart, Bookmark, Share2, Eye, MessageCircle, Coffee, ThumbsUp, Send, Bell } from 'lucide-react';
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
  const [isFollowing, setIsFollowing] = useState(false);
  const [likes, setLikes] = useState(Math.floor(Math.random() * 500) + 50);
  const [views] = useState(Math.floor(Math.random() * 5000) + 500);
  const [comments] = useState(Math.floor(Math.random() * 50) + 5);
  const [readingTime, setReadingTime] = useState(0);
  const [showShareSuccess, setShowShareSuccess] = useState(false);

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
    console.log(`${isLiked ? 'Unliked' : 'Liked'} post: ${post.title}`);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    console.log(`${isBookmarked ? 'Removed bookmark' : 'Bookmarked'} post: ${post.title}`);
  };

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    console.log(`${isFollowing ? 'Unfollowed' : 'Followed'} author: ${post.author}`);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href
      }).then(() => {
        console.log('Content shared successfully');
      }).catch((error) => {
        console.log('Error sharing content:', error);
        fallbackShare();
      });
    } else {
      fallbackShare();
    }
  };

  const fallbackShare = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setShowShareSuccess(true);
      setTimeout(() => setShowShareSuccess(false), 2000);
      console.log('Link copied to clipboard');
    }).catch(() => {
      console.log('Failed to copy link');
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <ReadingProgress />
      
      {/* Enhanced Header */}
      <div className="bg-white shadow-lg border-b-2 border-blue-100">
        <div className="container mx-auto px-4 py-8">
          <Link to="/blog">
            <Button variant="ghost" className="mb-6 hover:bg-blue-50 border-2 border-transparent hover:border-blue-200 transition-all duration-200">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
          
          <div className="max-w-4xl mx-auto">
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
              
              <div className="flex items-center space-x-6 text-gray-600">
                <div className="flex items-center bg-blue-50 rounded-full px-4 py-2">
                  <Eye className="h-5 w-5 mr-2 text-blue-600" />
                  <span className="font-semibold">{views.toLocaleString()} views</span>
                </div>
                <div className="flex items-center bg-green-50 rounded-full px-4 py-2">
                  <Coffee className="h-5 w-5 mr-2 text-green-600" />
                  <span className="font-semibold">{Math.floor(readingTime / 60)}:{(readingTime % 60).toString().padStart(2, '0')}</span>
                </div>
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
                    onClick={handleFollow}
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

            {/* Enhanced Action buttons */}
            <div className="flex items-center justify-between mb-8 p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
              <div className="flex items-center space-x-4">
                <Button
                  onClick={handleLike}
                  className={`transition-all duration-200 px-6 py-3 font-semibold ${
                    isLiked 
                      ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg hover:shadow-xl' 
                      : 'bg-white border-2 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300'
                  }`}
                >
                  <Heart className={`h-5 w-5 mr-2 ${isLiked ? 'fill-current' : ''}`} />
                  {likes} Likes
                </Button>
                
                <Button
                  onClick={handleBookmark}
                  className={`transition-all duration-200 px-6 py-3 font-semibold ${
                    isBookmarked 
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg hover:shadow-xl' 
                      : 'bg-white border-2 border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300'
                  }`}
                >
                  <Bookmark className={`h-5 w-5 mr-2 ${isBookmarked ? 'fill-current' : ''}`} />
                  {isBookmarked ? 'Saved' : 'Save'}
                </Button>
                
                <Button 
                  variant="outline" 
                  className="px-6 py-3 font-semibold border-2 border-green-200 text-green-600 hover:bg-green-50 hover:border-green-300 transition-all duration-200"
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  {comments} Comments
                </Button>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button 
                  onClick={handleShare}
                  className={`px-6 py-3 font-semibold transition-all duration-200 ${
                    showShareSuccess
                      ? 'bg-green-500 text-white'
                      : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 shadow-lg hover:shadow-xl'
                  }`}
                >
                  {showShareSuccess ? (
                    <>
                      <ThumbsUp className="h-5 w-5 mr-2" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Share2 className="h-5 w-5 mr-2" />
                      Share
                    </>
                  )}
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
              <Card className="mb-8 shadow-2xl bg-white border-0 overflow-hidden">
                <CardContent className="p-8 lg:p-12">
                  <div className="prose prose-lg max-w-none">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        h1: ({ children }) => (
                          <h1 className="text-4xl font-bold text-gray-900 mb-8 mt-12 first:mt-0 pb-4 border-b-4 border-gradient-to-r from-blue-500 to-purple-500">
                            {children}
                          </h1>
                        ),
                        h2: ({ children }) => (
                          <h2 className="text-3xl font-semibold text-gray-800 mb-6 mt-10 pb-3 border-b-2 border-gray-200">
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
                          <ul className="list-disc list-inside text-gray-700 mb-6 space-y-3 text-lg pl-4">
                            {children}
                          </ul>
                        ),
                        ol: ({ children }) => (
                          <ol className="list-decimal list-inside text-gray-700 mb-6 space-y-3 text-lg pl-4">
                            {children}
                          </ol>
                        ),
                        code: ({ children, className }) => {
                          const isBlock = className?.includes('language-');
                          if (isBlock) {
                            return (
                              <pre className="bg-gradient-to-r from-gray-900 to-gray-800 text-gray-100 p-8 rounded-xl overflow-x-auto mb-8 shadow-2xl border-l-4 border-blue-500">
                                <code className="text-sm font-mono">{children}</code>
                              </pre>
                            );
                          }
                          return (
                            <code className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-3 py-1 rounded-lg text-sm font-mono font-semibold shadow-sm">
                              {children}
                            </code>
                          );
                        },
                        blockquote: ({ children }) => (
                          <blockquote className="border-l-8 border-gradient-to-b from-blue-500 to-purple-500 pl-8 py-6 my-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-r-2xl italic text-gray-700 text-lg shadow-lg">
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
          
          {/* Enhanced Tags */}
          <Card className="mt-12 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-2 border-blue-200 shadow-xl">
            <CardContent className="p-10">
              <h3 className="text-3xl font-bold mb-8 flex items-center">
                <Tag className="h-8 w-8 mr-4 text-blue-600" />
                Related Topics
              </h3>
              <div className="flex flex-wrap gap-4">
                {post.tags.map((tag) => (
                  <Badge 
                    key={tag} 
                    variant="outline" 
                    className="text-lg px-6 py-3 font-semibold hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white hover:border-transparent cursor-pointer transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
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
