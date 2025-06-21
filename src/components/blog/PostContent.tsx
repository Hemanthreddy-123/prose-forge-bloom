
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Card, CardContent } from '@/components/ui/card';

interface PostContentProps {
  content: string;
}

const PostContent = ({ content }: PostContentProps) => {
  return (
    <Card className="mb-8 shadow-2xl bg-white border-0 overflow-hidden">
      <CardContent className="p-8 lg:p-12">
        <div className="prose prose-lg max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ children }) => (
                <h1 className="text-4xl font-bold text-gray-900 mb-8 mt-12 first:mt-0 pb-4 border-b-4 border-gradient-to-r from-blue-500 to-purple-500">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-3xl font-semibold text-gray-800 mb-6 mt-10 pb-3 border-b-2 border-gray-200">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">
                  {children}
                </h3>
              ),
              p: ({ children }) => (
                <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                  {children}
                </p>
              ),
              ul: ({ children }) => (
                <ul className="list-disc list-inside text-gray-700 mb-6 space-y-3 text-lg pl-4">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal list-inside text-gray-700 mb-6 space-y-3 text-lg pl-4">
                  {children}
                </ol>
              ),
              code: ({ children, className }) => {
                const isBlock = className?.includes('language-');
                if (isBlock) {
                  return (
                    <pre className="bg-gradient-to-r from-gray-900 to-gray-800 text-gray-100 p-8 rounded-xl overflow-x-auto mb-8 shadow-2xl border-l-4 border-blue-500">
                      <code className="text-sm font-mono">{children}</code>
                    </pre>
                  );
                }
                return (
                  <code className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-3 py-1 rounded-lg text-sm font-mono font-semibold shadow-sm">
                    {children}
                  </code>
                );
              },
              blockquote: ({ children }) => (
                <blockquote className="border-l-8 border-gradient-to-b from-blue-500 to-purple-500 pl-8 py-6 my-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-r-2xl italic text-gray-700 text-lg shadow-lg">
                  {children}
                </blockquote>
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostContent;
