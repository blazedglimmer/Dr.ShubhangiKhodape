'use client';

import { Share2 } from 'lucide-react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface ShareButtonProps {
  url?: string;
  title?: string;
  text?: string;
  children?: React.ReactNode;
  className?: string;
}

export function ShareButton({
  url,
  title,
  text,
  children,
  className,
}: ShareButtonProps) {
  const isMobile = useIsMobile();
  const Wrapper = isMobile ? Drawer : Dialog;
  const WrapperContent = isMobile ? DrawerContent : DialogContent;
  const WrapperTrigger = isMobile ? DrawerTrigger : DialogTrigger;

  const path = usePathname();

  // Use the current URL if none provided
  // const shareUrl =
  //   url || (typeof window !== 'undefined' ? window.location.href : '');
  const shareUrl = url || `${process.env.NEXT_PUBLIC_DOMAIN_NAME}${path}`;
  const shareTitle = title || 'Check this out!';
  const shareText = text || 'I found this interesting content';

  const handleNativeShare = async (
    e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>
  ) => {
    e.stopPropagation();
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        });
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          toast.error('Error sharing content');
        }
      }
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    toast.success('Link copied to clipboard!');
  };

  const shareOptions = [
    {
      name: 'Copy Link',
      icon: '📋',
      onClick: handleCopyLink,
    },
    {
      name: 'WhatsApp',
      icon: '💬',
      onClick: () =>
        window.open(`https://wa.me/?text=${encodeURIComponent(shareUrl)}`),
    },
    {
      name: 'Twitter',
      icon: '🐦',
      onClick: () =>
        window.open(
          `https://twitter.com/intent/tweet?url=${encodeURIComponent(
            shareUrl
          )}&text=${encodeURIComponent(shareText)}`
        ),
    },
    {
      name: 'Facebook',
      icon: '👥',
      onClick: () =>
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            shareUrl
          )}`
        ),
    },
    {
      name: 'Email',
      icon: '📧',
      onClick: () =>
        window.open(
          `mailto:?subject=${encodeURIComponent(
            shareTitle
          )}&body=${encodeURIComponent(shareUrl)}`
        ),
    },
    {
      name: 'Telegram',
      icon: '✈️',
      onClick: () =>
        window.open(
          `https://t.me/share/url?url=${encodeURIComponent(
            shareUrl
          )}&text=${encodeURIComponent(shareText)}`
        ),
    },
  ];

  // If native sharing is available, use it directly
  if (typeof navigator !== 'undefined') {
    return (
      <>
        {children ? (
          <div
            className={cn(className, `hover:text-purple-400 transition-colors`)}
            onClick={handleNativeShare}
          >
            {children}
          </div>
        ) : (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleNativeShare}
            className="flex items-center gap-2 hover:text-purple-400 transition-colors"
          >
            <Share2 className="h-4 w-4" />
            <span>Share</span>
          </Button>
        )}
      </>
    );
  }

  // Otherwise, show our custom share menu
  return (
    <Wrapper>
      <WrapperTrigger asChild>
        {children ? (
          <div
            className={cn(className, `hover:text-purple-400 transition-colors`)}
            onClick={handleNativeShare}
          >
            {children}
          </div>
        ) : (
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-2 hover:text-purple-400 transition-colors"
          >
            <Share2 className="h-4 w-4" />
            <span>Share</span>
          </Button>
        )}
      </WrapperTrigger>
      <WrapperContent className="w-full sm:max-w-md">
        <div className="grid gap-4 p-4">
          <div className="flex flex-col space-y-1.5">
            <h3 className="text-lg font-semibold">Share</h3>
            <p className="text-sm text-muted-foreground">
              Choose how you want to share this content
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {shareOptions.map(option => (
              <Button
                key={option.name}
                variant="outline"
                className="flex flex-col items-center gap-2 h-auto py-4"
                onClick={option.onClick}
              >
                <span className="text-2xl">{option.icon}</span>
                <span className="text-xs">{option.name}</span>
              </Button>
            ))}
          </div>
        </div>
      </WrapperContent>
    </Wrapper>
  );
}
