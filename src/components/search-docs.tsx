import { ComponentProps, useEffect, useState } from "react";
import { Input } from "./ui/input";

type SearchDocsProps = ComponentProps<"input"> & {
  onSearch?: (keyword: string) => void;
};

export default function SearchDocs({ onSearch, ...props }: SearchDocsProps) {
  const [value, setValue] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      if (onSearch) onSearch(value);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  return (
    <Input
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      {...props}
    />
  );
}
