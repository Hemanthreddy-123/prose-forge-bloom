
import { Heart, Bookmark, Share2, MessageCircle, ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PostActionsProps {
  isLiked: boolean;
  isBookmarked: boolean;
  likes: number;
  comments: number;
  showShareSuccess: boolean;
  onLike: () => void;
  onBookmark: () => void;
  onShare: () => void;
}

const PostActions = ({ 
  isLiked, 
  isBookmarked, 
  likes, 
  comments, 
  showShareSuccess,
  onLike, 
  onBookmark, 
  onShare 
}: PostActionsProps) => {
  return (
    <div className="flex items-center justify-between mb-8 p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
      <div className="flex items-center space-x-4">
        <Button
          onClick={onLike}
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
          onClick={onBookmark}
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
          onClick={onShare}
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
  );
};

export default PostActions;
