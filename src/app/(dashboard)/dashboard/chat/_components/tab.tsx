import classNames from "classnames";
export default function Tab({
  className,
  children,
  id,
  selected,
  select,
}: {
  className?: string;
  children: React.ReactNode;
  id: number;
  selected: number;
  select: () => void;
}) {
  const tabClass = classNames(
    "p-1 text-md grow text-center cursor-pointer rounded-md",
    className,
    {
      "bg-white": id === selected,
    },
  );
  return (
    <div className={tabClass} onClick={select}>
      {children}
    </div>
  );
}
