import Link from 'next/link';

type LinkButtonProps = {
  children: React.ReactNode;
  href: string;
  icon?: React.ReactNode;
  className?: string;
};

export default function LinkButton({
  children,
  href,
  className,
}: Readonly<LinkButtonProps>) {
  return (
    <Link
      href={href}
      className={`${className} flex items-center gap-3 align-middle font-sans font-bold text-center uppercase transition-all text-xs py-3 px-6 rounded-lg bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] hover:animate-bounce`}
    >
      {children}
    </Link>
  );
}
