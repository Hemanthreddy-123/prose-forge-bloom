
import { Heart, Bookmark, Share2, MessageCircle, ThumbsUp, Phone, Mail, MapPin } from 'lucide-react';
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
    <div className="space-y-6">
      {/* Contact Details Section - Indian Style */}
      <div className="bg-gradient-to-r from-orange-100 via-white to-green-100 rounded-2xl p-6 border-l-4 border-orange-500 shadow-lg">
        <h3 className="text-2xl font-bold text-orange-800 mb-4 flex items-center">
          <MapPin className="h-6 w-6 mr-2 text-green-600" />
          संपर्क विवरण / Contact Details
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="flex items-center bg-white p-4 rounded-xl border border-orange-200 shadow-sm">
            <Phone className="h-5 w-5 mr-3 text-green-600" />
            <div>
              <p className="font-semibold text-gray-800">Phone</p>
              <p className="text-blue-600">+91 98765 43210</p>
            </div>
          </div>
          <div className="flex items-center bg-white p-4 rounded-xl border border-orange-200 shadow-sm">
            <Mail className="h-5 w-5 mr-3 text-blue-600" />
            <div>
              <p className="font-semibold text-gray-800">Email</p>
              <p className="text-green-600">contact@example.com</p>
            </div>
          </div>
          <div className="flex items-center bg-white p-4 rounded-xl border border-orange-200 shadow-sm">
            <MapPin className="h-5 w-5 mr-3 text-orange-600" />
            <div>
              <p className="font-semibold text-gray-800">Address</p>
              <p className="text-purple-600">Mumbai, India</p>
            </div>
          </div>
        </div>
      </div>

      {/* Post Actions with Indian Theme Colors */}
      <div className="flex items-center justify-between p-6 bg-gradient-to-r from-orange-50 via-white to-green-50 rounded-2xl shadow-lg border-l-4 border-l-orange-500 border-r-4 border-r-green-500">
        <div className="flex items-center space-x-4">
          <Button
            onClick={onLike}
            style={{
              background: isLiked 
                ? 'linear-gradient(135deg, #ff6b6b, #ee5a52)' 
                : 'linear-gradient(135deg, #ffffff, #f8f9fa)',
              color: isLiked ? 'white' : '#dc2626',
              border: isLiked ? 'none' : '2px solid #fca5a5',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
            }}
            className="transition-all duration-300 px-6 py-3 font-semibold rounded-xl hover:scale-105 hover:shadow-xl"
          >
            <Heart className={`h-5 w-5 mr-2 ${isLiked ? 'fill-current' : ''}`} />
            {likes} पसंद / Likes
          </Button>
          
          <Button
            onClick={onBookmark}
            style={{
              background: isBookmarked 
                ? 'linear-gradient(135deg, #3b82f6, #1d4ed8)' 
                : 'linear-gradient(135deg, #ffffff, #f8f9fa)',
              color: isBookmarked ? 'white' : '#2563eb',
              border: isBookmarked ? 'none' : '2px solid #93c5fd',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
            }}
            className="transition-all duration-300 px-6 py-3 font-semibold rounded-xl hover:scale-105 hover:shadow-xl"
          >
            <Bookmark className={`h-5 w-5 mr-2 ${isBookmarked ? 'fill-current' : ''}`} />
            {isBookmarked ? 'सेव किया / Saved' : 'सेव करें / Save'}
          </Button>
          
          <Button 
            style={{
              background: 'linear-gradient(135deg, #10b981, #059669)',
              color: 'white',
              border: 'none',
              boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)'
            }}
            className="px-6 py-3 font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <MessageCircle className="h-5 w-5 mr-2" />
            {comments} टिप्पणी / Comments
          </Button>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button 
            onClick={onShare}
            style={{
              background: showShareSuccess
                ? 'linear-gradient(135deg, #10b981, #059669)'
                : 'linear-gradient(135deg, #f59e0b, #d97706)',
              color: 'white',
              border: 'none',
              boxShadow: showShareSuccess 
                ? '0 4px 15px rgba(16, 185, 129, 0.3)'
                : '0 4px 15px rgba(245, 158, 11, 0.3)'
            }}
            className="px-6 py-3 font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            {showShareSuccess ? (
              <>
                <ThumbsUp className="h-5 w-5 mr-2" />
                कॉपी हो गया! / Copied!
              </>
            ) : (
              <>
                <Share2 className="h-5 w-5 mr-2" />
                साझा करें / Share
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PostActions;
