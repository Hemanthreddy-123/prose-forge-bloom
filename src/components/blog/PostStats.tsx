
import { Eye, Coffee } from 'lucide-react';

interface PostStatsProps {
  views: number;
  readingTime: number;
}

const PostStats = ({ views, readingTime }: PostStatsProps) => {
  return (
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
  );
};

export default PostStats;
