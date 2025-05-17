import { SignupCard } from "@/components/signup-card";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
export default function Page() {
  const classes = classNames("flex w-full h-dvh items-center");
  return (
    <div className={classes}>
      <div className="w-1/2 h-full grow grid grid-rows-3 grid-cols-3 place-items-center">
        <Link
          href="/"
          className="flex row-start-1 row-end-1 col-start-start-1 col-end-2 place-self-start mt-3 ml-3"
        >
          <ArrowLeft className="mr-2" />
          Home
        </Link>
        <SignupCard
          className="shadow-none border-0 row-start-2 row-end-3 col-start-2 col-end-3"
          authIconPosition="down"
        />
      </div>
      <div className="w-1/2 h-full overflow-hidden hidden md:block">
        <Image
          src="https://www.svgrepo.com/show/508699/landscape-placeholder.svg"
          alt="Placeholder Image"
          className="object-cover w-full h-full"
          width={"5"}
          height={"5"}
        />
      </div>
    </div>
  );
}
