
import { Calendar, Clock, User, Tag } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BlogPost } from '@/types/blog';
import { Link } from 'react-router-dom';

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard = ({ post }: BlogCardProps) => {
  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-300 group">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="secondary" className="text-sm">
            {post.category}
          </Badge>
          {post.featured && (
            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
              Featured
            </Badge>
          )}
        </div>
        <Link to={`/blog/${post.slug}`}>
          <h3 className="text-xl font-bold group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
            {post.title}
          </h3>
        </Link>
      </CardHeader>
      
      <CardContent className="pb-4">
        <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              <Tag className="h-3 w-3 mr-1" />
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="pt-0 border-t bg-gray-50">
        <div className="flex items-center justify-between w-full text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <User className="h-4 w-4 mr-1" />
              {post.author}
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              {new Date(post.publishedDate).toLocaleDateString()}
            </div>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            {post.readTime} min read
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default BlogCard;
