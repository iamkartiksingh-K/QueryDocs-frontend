import classNames from "classnames";
import { Button } from "@/components/ui/button";
export type Icon = {
  icon?: React.ReactNode;
  label?: string;
  className?: string;
  onClick?: () => void;
};
type IconGroupProps = {
  icons: Icon[];
  className?: string;
  type?: "default" | "inline";
} & React.ComponentProps<"div">;

export function IconGroup({
  icons,
  className,
  type = "default",
  ...props
}: IconGroupProps) {
  const classes = classNames(
    "flex flex-col gap-4",
    { "flex-row justify-center": type === "inline" },
    className,
  );
  return (
    <div className={classes} {...props}>
      {icons.map((icon, index) => (
        <Button
          key={index}
          onClick={icon.onClick}
          variant="outline"
          className={classNames(
            "flex justify-center items-center cursor-pointer",
            {
              "flex-grow": type === "inline",
            },
            icon.className,
          )}
        >
          {icon.icon}
          {icon.label && <span>{icon.label}</span>}
        </Button>
      ))}
    </div>
  );
}
