"use client";

import { useEffect, useState } from "react";
import { useLottie } from "lottie-react";

const RobotAnimation = () => {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch("/robot.json")
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch((err) => console.error("Failed to load animation:", err));
  }, []);

  const options = {
    animationData,
    loop: true,
    autoplay: true,
  };

  const { View } = useLottie(options);

  return <div className="w-52">{animationData && View}</div>;
};

export default RobotAnimation;
