export default function TabsContainer({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`bg-gray-100 flex w-60 p-1 items-center border rounded-md gap-2 mt-2 ${className}`}
    >
      {children}
    </div>
  );
}
