export default function CustomZoom({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={`hover:cursor-pointer ${className}`} {...props}>
      {children}
    </button>
  );
}
