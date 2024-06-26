import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { ComponentPropsWithRef, ElementRef, forwardRef } from 'react';

import { cn } from '~/lib/utils';

export const buttonVariants = cva(
  'inline-flex w-full justify-center items-center border-2 py-2.5 px-[30px] text-base leading-6 font-semibold border-primary disabled:border-gray-400 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/20',
  {
    variants: {
      variant: {
        primary:
          'rounded-md bg-primary text-white hover:bg-secondary hover:border-secondary disabled:bg-gray-400 disabled:hover:bg-gray-400 disabled:hover:border-gray-400',
        secondary:
          'px-4 py-2 rounded-full border-2 border-black shadow w-max hover:scale-105 duration-200',
        subtle:
          'border-none bg-transparent text-primary hover:bg-secondary hover:bg-opacity-10 hover:text-secondary disabled:text-gray-400 disabled:hover:bg-transparent disabled:hover:text-gray-400',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  },
);

export interface ButtonProps extends ComponentPropsWithRef<'button'> {
  variant?: 'primary' | 'secondary' | 'subtle';
  asChild?: boolean;
}

export const Button = forwardRef<ElementRef<'button'>, ButtonProps>(
  ({ asChild = false, children, className, variant, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp className={cn(buttonVariants({ variant, className }))} ref={ref} {...props}>
        {children}
      </Comp>
    );
  },
);

Button.displayName = 'Button';
