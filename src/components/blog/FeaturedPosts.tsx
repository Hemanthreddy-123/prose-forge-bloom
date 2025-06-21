
import { Calendar, Clock, User } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BlogPost } from '@/types/blog';
import { Link } from 'react-router-dom';

interface FeaturedPostsProps {
  posts: BlogPost[];
}

const FeaturedPosts = ({ posts }: FeaturedPostsProps) => {
  const featuredPosts = posts.filter(post => post.featured);

  if (featuredPosts.length === 0) return null;

  return (
    <div className="mb-12">
      <h2 className="text-3xl font-bold mb-8 text-center">Featured Articles</h2>
      <div className="grid md:grid-cols-2 gap-8">
        {featuredPosts.slice(0, 2).map((post) => (
          <Card key={post.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-48 relative">
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                <Badge className="bg-yellow-400 text-yellow-900 font-semibold">
                  Featured
                </Badge>
              </div>
            </div>
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Badge variant="secondary">{post.category}</Badge>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="h-4 w-4 mr-1" />
                  {post.readTime} min read
                </div>
              </div>
              <Link to={`/blog/${post.slug}`}>
                <h3 className="text-2xl font-bold group-hover:text-blue-600 transition-colors duration-200">
                  {post.title}
                </h3>
              </Link>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4 text-lg leading-relaxed">
                {post.excerpt}
              </p>
              <div className="flex items-center text-sm text-gray-500">
                <User className="h-4 w-4 mr-1" />
                <span className="mr-4">{post.author}</span>
                <Calendar className="h-4 w-4 mr-1" />
                <span>{new Date(post.publishedDate).toLocaleDateString()}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FeaturedPosts;
