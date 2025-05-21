import Image from "next/image";
import classNames from "classnames";
export default function ListItem({
  title,
  icon,
  id,
  selected,
  onClick,
}: {
  title: string;
  icon: string;
  id: number;
  selected: number;
  onClick: () => void;
}) {
  const listClass = classNames(
    "w-18 h-16 flex flex-col items-center justify-center cursor-pointer hover:bg-accent p-1 rounded",
    {
      "bg-gray-200": id === selected,
    },
  );
  return (
    <div className={listClass} onClick={onClick}>
      <Image src={icon} alt="book logo" width={35} height={35} />
      <p className="text-xs text-gray-600  w-full text-center">
        {title.slice(0, Math.min(title.length, 8))}
      </p>
    </div>
  );
}
