import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import ImagePlaceholder from './ImagePlaceholder';

interface ResponsiveImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackText?: string;
  fallbackIcon?: React.ReactNode;
  aspectRatio?: 'square' | '16:9' | '4:3' | '3:2' | 'auto';
  containerClassName?: string;
}

export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt = "",
  fallbackText,
  fallbackIcon,
  aspectRatio = 'auto',
  className,
  containerClassName,
  ...props
}) => {
  const [error, setError] = useState(false);
  
  const handleError = () => {
    setError(true);
  };
  
  const aspectRatioClasses = {
    'square': 'aspect-square',
    '16:9': 'aspect-video',
    '4:3': 'aspect-[4/3]',
    '3:2': 'aspect-[3/2]',
    'auto': ''
  };
  
  return (
    <div className={cn(
      'overflow-hidden relative rounded-md bg-muted/30',
      aspectRatioClasses[aspectRatio],
      containerClassName
    )}>
      {!error ? (
        <img
          src={src}
          alt={alt}
          onError={handleError}
          className={cn(
            'object-cover w-full h-full',
            className
          )}
          {...props}
        />
      ) : (
        <ImagePlaceholder 
          text={fallbackText || alt || "Image failed to load"} 
          icon={fallbackIcon}
        />
      )}
    </div>
  );
};

export default ResponsiveImage; 