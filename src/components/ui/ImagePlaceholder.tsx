import React from 'react';
import { cn } from '@/lib/utils';
import { ImageIcon } from 'lucide-react';

interface ImagePlaceholderProps {
  className?: string;
  text?: string;
  icon?: React.ReactNode;
}

export const ImagePlaceholder: React.FC<ImagePlaceholderProps> = ({ 
  className, 
  text = "Image", 
  icon 
}) => {
  return (
    <div 
      className={cn(
        "flex flex-col items-center justify-center w-full h-full bg-muted/50 rounded-md",
        className
      )}
      aria-label={`Placeholder for ${text}`}
    >
      {icon || <ImageIcon className="h-8 w-8 text-muted-foreground/60" />}
      {text && (
        <span className="mt-2 text-xs text-muted-foreground/80">{text}</span>
      )}
    </div>
  );
};

export default ImagePlaceholder; 