
import { useState } from 'react';
import { Mail, Gift, Star, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => setIsSubscribed(false), 3000);
      setEmail('');
    }
  };

  if (isSubscribed) {
    return (
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <CardContent className="text-center py-8">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-green-800 mb-2">Welcome aboard! 🎉</h3>
          <p className="text-green-600">Check your email for a special welcome gift!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 border-0 shadow-xl">
      <CardHeader className="text-center pb-4">
        <div className="flex justify-center mb-4">
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 rounded-full">
            <Mail className="h-8 w-8 text-white" />
          </div>
        </div>
        <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Join 25,000+ Developers
        </h3>
        <p className="text-gray-600">Get the latest tutorials, tips, and exclusive content delivered to your inbox.</p>
        
        <div className="flex justify-center space-x-2 mt-4">
          <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black">
            <Gift className="h-3 w-3 mr-1" />
            Free eBook
          </Badge>
          <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            <Star className="h-3 w-3 mr-1" />
            Premium Tips
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10 py-3 border-2 border-gray-200 focus:border-blue-500 rounded-xl"
              required
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Subscribe & Get Free eBook 📚
          </Button>
        </form>
        
        <p className="text-xs text-gray-500 text-center mt-4">
          No spam. Unsubscribe anytime. 🔒 Your privacy is protected.
        </p>
      </CardContent>
    </Card>
  );
};

export default NewsletterSignup;
