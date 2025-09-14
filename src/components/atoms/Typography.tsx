'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { fadeInUp } from '@/lib/animations';

interface TypographyProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2' | 'caption' | 'overline';
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
  as?: React.ElementType;
  color?: 'primary' | 'secondary' | 'accent' | 'muted';
}

const Typography: React.FC<TypographyProps> = ({
  variant = 'body1',
  children,
  className,
  animate = false,
  as,
  color = 'primary',
  ...props
}) => {
  const variants = {
    h1: 'text-4xl md:text-5xl lg:text-6xl font-bold leading-tight',
    h2: 'text-3xl md:text-4xl lg:text-5xl font-bold leading-tight',
    h3: 'text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight',
    h4: 'text-xl md:text-2xl lg:text-3xl font-semibold leading-tight',
    h5: 'text-lg md:text-xl lg:text-2xl font-medium leading-tight',
    h6: 'text-base md:text-lg lg:text-xl font-medium leading-tight',
    body1: 'text-base md:text-lg leading-relaxed',
    body2: 'text-sm md:text-base leading-relaxed',
    caption: 'text-xs md:text-sm leading-normal',
    overline: 'text-xs uppercase tracking-wider font-medium',
  };

  const colors = {
    primary: 'text-gray-900 dark:text-white',
    secondary: 'text-gray-600 dark:text-gray-300',
    accent: 'text-blue-600 dark:text-blue-400',
    muted: 'text-gray-500 dark:text-gray-400',
  };

  const defaultTags = {
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    h5: 'h5',
    h6: 'h6',
    body1: 'p',
    body2: 'p',
    caption: 'span',
    overline: 'span',
  };

  const Component = as || defaultTags[variant];
  const MotionComponent = motion(Component);

  const content = (
    <Component
      className={cn(
        variants[variant],
        colors[color],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );

  if (animate) {
    return (
      <MotionComponent
        className={cn(
          variants[variant],
          colors[color],
          className
        )}
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        {...props}
      >
        {children}
      </MotionComponent>
    );
  }

  return content;
};

export default Typography;
