
import { Search, Moon, Sun, Bell, User, Menu } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useState, useEffect } from 'react';

interface BlogHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const BlogHeader = ({ searchTerm, onSearchChange }: BlogHeaderProps) => {
  const [darkMode, setDarkMode] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchSuggestions] = useState(['React', 'JavaScript', 'TypeScript', 'CSS', 'Node.js']);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white py-20 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-yellow-300 rounded-full animate-bounce"></div>
        <div className="absolute bottom-20 left-1/3 w-24 h-24 bg-blue-300 rounded-full animate-ping"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Top navigation bar */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
              <Menu className="h-5 w-5" />
            </Button>
            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold">
              🔥 Trending
            </Badge>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleDarkMode}
              className="text-white hover:bg-white/20"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowNotifications(!showNotifications)}
              className="text-white hover:bg-white/20 relative"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            TechBlog Pro
          </h1>
          <p className="text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Discover cutting-edge insights, comprehensive tutorials, and the latest trends in web development, design, and technology innovation.
          </p>
          <div className="flex justify-center space-x-4 mt-6">
            <Badge className="bg-emerald-500 text-white px-4 py-2">
              📚 1000+ Articles
            </Badge>
            <Badge className="bg-blue-500 text-white px-4 py-2">
              👥 50K+ Readers
            </Badge>
            <Badge className="bg-purple-500 text-white px-4 py-2">
              ⭐ Premium Content
            </Badge>
          </div>
        </div>

        <div className="max-w-2xl mx-auto relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6 z-10" />
          <Input
            type="text"
            placeholder="Search articles, topics, or authors..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-12 py-4 text-lg bg-white/15 backdrop-blur-sm border-white/30 text-white placeholder-white/80 focus:bg-white focus:text-gray-900 focus:placeholder-gray-500 transition-all duration-300 rounded-2xl"
          />
          
          {/* Search suggestions */}
          {searchTerm && (
            <div className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-2xl border z-20">
              {searchSuggestions
                .filter(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => onSearchChange(suggestion)}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 text-gray-800 first:rounded-t-xl last:rounded-b-xl transition-colors"
                  >
                    <Search className="inline h-4 w-4 mr-2 text-gray-400" />
                    {suggestion}
                  </button>
                ))
              }
            </div>
          )}
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-4xl mx-auto">
          <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <div className="text-3xl font-bold">150+</div>
            <div className="text-sm opacity-80">Articles</div>
          </div>
          <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <div className="text-3xl font-bold">25K+</div>
            <div className="text-sm opacity-80">Readers</div>
          </div>
          <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <div className="text-3xl font-bold">12</div>
            <div className="text-sm opacity-80">Categories</div>
          </div>
          <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <div className="text-3xl font-bold">4.9</div>
            <div className="text-sm opacity-80">Rating</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogHeader;
