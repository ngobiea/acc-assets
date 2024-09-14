import { Button } from '@/components/materialTailwind';
import type { MouseEventHandler } from 'react';
import type {
  color,
  variant,
} from '@material-tailwind/react/types/components/button';

type LinkButtonProps = {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  loading?: boolean;
  color?: color;
  variant?: variant;
  fullWidth?: boolean;
  ripple?: boolean;
};

export default function AppButton({
  children,
  type,
  onClick,
  className,
  loading,
  color,
  variant,
  fullWidth,
  ripple,
}: Readonly<LinkButtonProps>) {
  return (
    <Button
      color={color}
      type={type}
      onClick={onClick}
      className={` ${className} hover:animate-bounce`}
      loading={loading}
      variant={variant}
      fullWidth={fullWidth}
      ripple={ripple}
    >
      {children}
    </Button>
  );
}
