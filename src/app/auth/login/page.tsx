import { LoginCard } from "@/components/login-card";
import classNames from "classnames";
import Image from "next/image";

export default function Page() {
  const classes = classNames("flex w-full h-dvh items-center");
  return (
    <div className={classes}>
      <div className="w-1/2 h-full grow flex justify-center items-center">
        <LoginCard
          className="shadow-none border-0"
          authIconPosition="down"
          externalAuth={true}
        />
      </div>
      <div className="w-1/2 h-full overflow-hidden hidden md:block">
        <Image
          src="https://www.svgrepo.com/show/508699/landscape-placeholder.svg"
          alt="Placeholder Image"
          className="object-cover w-full h-full"
          width={5}
          height={5}
        />
      </div>
    </div>
  );
}
