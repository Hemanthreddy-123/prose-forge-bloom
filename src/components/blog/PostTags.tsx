
import { Tag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface PostTagsProps {
  tags: string[];
}

const PostTags = ({ tags }: PostTagsProps) => {
  return (
    <Card className="mt-12 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-2 border-blue-200 shadow-xl">
      <CardContent className="p-10">
        <h3 className="text-3xl font-bold mb-8 flex items-center">
          <Tag className="h-8 w-8 mr-4 text-blue-600" />
          Related Topics
        </h3>
        <div className="flex flex-wrap gap-4">
          {tags.map((tag) => (
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
  );
};

export default PostTags;
