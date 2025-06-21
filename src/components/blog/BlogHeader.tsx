
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface BlogHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const BlogHeader = ({ searchTerm, onSearchChange }: BlogHeaderProps) => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-4">TechBlog</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Discover the latest insights, tutorials, and trends in web development, design, and technology.
          </p>
        </div>
        <div className="max-w-md mx-auto relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 py-3 bg-white/10 border-white/20 text-white placeholder-white/70 focus:bg-white focus:text-gray-900 focus:placeholder-gray-500 transition-all duration-300"
          />
        </div>
      </div>
    </div>
  );
};

export default BlogHeader;
