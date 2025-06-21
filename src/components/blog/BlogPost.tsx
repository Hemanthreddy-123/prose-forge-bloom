
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BlogPost as BlogPostType } from '@/types/blog';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import SocialShare from './SocialShare';
import ReadingProgress from './ReadingProgress';
import PostHeader from './PostHeader';
import PostStats from './PostStats';
import PostActions from './PostActions';
import PostContent from './PostContent';
import PostTags from './PostTags';

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <ReadingProgress />
      
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
              <div className="flex-1">
                <PostHeader 
                  post={post} 
                  isFollowing={isFollowing} 
                  onFollow={handleFollow} 
                />
              </div>
              <PostStats views={views} readingTime={readingTime} />
            </div>

            <PostActions
              isLiked={isLiked}
              isBookmarked={isBookmarked}
              likes={likes}
              comments={comments}
              showShareSuccess={showShareSuccess}
              onLike={handleLike}
              onBookmark={handleBookmark}
              onShare={handleShare}
            />
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <PostContent content={post.content} />
            </div>
            
            <div className="lg:col-span-1 space-y-6">
              <SocialShare 
                title={post.title}
                url={`/blog/${post.slug}`}
                excerpt={post.excerpt}
              />
            </div>
          </div>
          
          <PostTags tags={post.tags} />
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
