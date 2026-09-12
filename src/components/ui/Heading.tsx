import type { HTMLAttributes, ElementType } from 'react';

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  gradient?: boolean;
}

export const Heading: React.FC<HeadingProps> = ({ 
  level = 2, 
  gradient = false, 
  className = '', 
  children, 
  ...props 
}) => {
  const Tag = `h${level}` as ElementType;
  
  const baseStyles = 'font-bold tracking-tight';
  
  const sizes = {
    1: 'text-4xl md:text-5xl lg:text-6xl',
    2: 'text-3xl md:text-4xl',
    3: 'text-2xl md:text-3xl',
    4: 'text-xl md:text-2xl',
    5: 'text-lg md:text-xl',
    6: 'text-base md:text-lg',
  };

  const colorStyles = gradient 
    ? 'text-transparent bg-clip-text bg-gradient-to-r from-brand-200 to-brand-500'
    : 'text-text-primary';

  return (
    <Tag className={`${baseStyles} ${sizes[level]} ${colorStyles} ${className}`} {...props}>
      {children}
    </Tag>
  );
};
