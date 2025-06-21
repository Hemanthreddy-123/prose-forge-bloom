
import { Share2, Twitter, Facebook, Linkedin, Link2, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useState } from 'react';

interface SocialShareProps {
  title: string;
  url: string;
  excerpt: string;
}

const SocialShare = ({ title, url, excerpt }: SocialShareProps) => {
  const [copied, setCopied] = useState(false);

  const shareUrl = `${window.location.origin}${url}`;
  
  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${title} ${shareUrl}`)}`
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const nativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: excerpt,
          url: shareUrl
        });
      } catch (err) {
        console.error('Error sharing: ', err);
      }
    }
  };

  return (
    <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
      <CardHeader className="pb-4">
        <h3 className="text-lg font-semibold flex items-center">
          <Share2 className="h-5 w-5 mr-2 text-blue-600" />
          Share this article
        </h3>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={() => window.open(shareLinks.twitter, '_blank')}
            className="bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white"
          >
            <Twitter className="h-4 w-4 mr-2" />
            Twitter
          </Button>
          
          <Button
            onClick={() => window.open(shareLinks.facebook, '_blank')}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
          >
            <Facebook className="h-4 w-4 mr-2" />
            Facebook
          </Button>
          
          <Button
            onClick={() => window.open(shareLinks.linkedin, '_blank')}
            className="bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-800 hover:to-indigo-800 text-white"
          >
            <Linkedin className="h-4 w-4 mr-2" />
            LinkedIn
          </Button>
          
          <Button
            onClick={() => window.open(shareLinks.whatsapp, '_blank')}
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            WhatsApp
          </Button>
        </div>
        
        <div className="mt-4 flex space-x-2">
          <Button
            onClick={copyToClipboard}
            variant="outline"
            className={`flex-1 ${copied ? 'bg-green-50 border-green-200 text-green-700' : ''}`}
          >
            <Link2 className="h-4 w-4 mr-2" />
            {copied ? 'Copied!' : 'Copy Link'}
          </Button>
          
          {navigator.share && (
            <Button onClick={nativeShare} variant="outline">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SocialShare;
