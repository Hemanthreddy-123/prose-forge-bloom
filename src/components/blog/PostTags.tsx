
import { Tag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface PostTagsProps {
  tags: string[];
}

const PostTags = ({ tags }: PostTagsProps) => {
  const getTagColor = (index: number) => {
    const colors = [
      'linear-gradient(135deg, #ff9933, #ff6600)', // Orange
      'linear-gradient(135deg, #128807, #0d5d03)', // Green  
      'linear-gradient(135deg, #000080, #4169e1)', // Blue
      'linear-gradient(135deg, #800080, #9932cc)', // Purple
      'linear-gradient(135deg, #dc2626, #991b1b)', // Red
      'linear-gradient(135deg, #059669, #047857)', // Emerald
    ];
    return colors[index % colors.length];
  };

  return (
    <Card className="mt-12 bg-gradient-to-r from-orange-50 via-white to-green-50 border-l-8 border-orange-500 border-r-8 border-green-500 shadow-xl">
      <CardContent className="p-10">
        <h3 className="text-3xl font-bold mb-8 flex items-center bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">
          <Tag className="h-8 w-8 mr-4 text-orange-600" />
          संबंधित विषय / Related Topics
        </h3>
        <div className="flex flex-wrap gap-4">
          {tags.map((tag, index) => (
            <Badge 
              key={tag}
              style={{
                background: getTagColor(index),
                color: 'white',
                border: 'none',
                cursor: 'pointer'
              }}
              className="text-lg px-6 py-3 font-semibold hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg transform rounded-xl"
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
