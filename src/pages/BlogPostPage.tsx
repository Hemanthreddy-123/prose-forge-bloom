
import { useParams, Navigate } from 'react-router-dom';
import BlogPost from '@/components/blog/BlogPost';
import { blogPosts } from '@/data/blogPosts';

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  
  const post = blogPosts.find(p => p.slug === slug);
  
  if (!post) {
    return <Navigate to="/blog" replace />;
  }
  
  return <BlogPost post={post} />;
};

export default BlogPostPage;
