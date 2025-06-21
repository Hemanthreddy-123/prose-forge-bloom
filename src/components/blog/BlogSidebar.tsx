
import { Calendar, Tag, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BlogPost } from '@/types/blog';
import { Link } from 'react-router-dom';

interface BlogSidebarProps {
  recentPosts: BlogPost[];
  categories: { name: string; count: number; slug: string }[];
  popularTags: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const BlogSidebar = ({ 
  recentPosts, 
  categories, 
  popularTags, 
  selectedCategory, 
  onCategoryChange 
}: BlogSidebarProps) => {
  return (
    <div className="space-y-6">
      {/* Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Tag className="h-5 w-5 mr-2" />
            Categories
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <button
              onClick={() => onCategoryChange('')}
              className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                selectedCategory === '' 
                  ? 'bg-blue-100 text-blue-800' 
                  : 'hover:bg-gray-100'
              }`}
            >
              All Posts
            </button>
            {categories.map((category) => (
              <button
                key={category.slug}
                onClick={() => onCategoryChange(category.name)}
                className={`w-full text-left px-3 py-2 rounded-md transition-colors flex justify-between items-center ${
                  selectedCategory === category.name 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'hover:bg-gray-100'
                }`}
              >
                <span>{category.name}</span>
                <Badge variant="secondary" className="text-xs">
                  {category.count}
                </Badge>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Posts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            Recent Posts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentPosts.slice(0, 5).map((post) => (
              <div key={post.id} className="border-b pb-3 last:border-b-0">
                <Link 
                  to={`/blog/${post.slug}`}
                  className="block hover:text-blue-600 transition-colors"
                >
                  <h4 className="font-medium text-sm line-clamp-2 mb-1">
                    {post.title}
                  </h4>
                </Link>
                <p className="text-xs text-gray-500">
                  {new Date(post.publishedDate).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Popular Tags */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="h-5 w-5 mr-2" />
            Popular Tags
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {popularTags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs cursor-pointer hover:bg-blue-50">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogSidebar;
