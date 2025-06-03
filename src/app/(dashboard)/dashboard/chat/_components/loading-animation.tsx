"use client";

import { useEffect, useState } from "react";
import { useLottie } from "lottie-react";

const LoadingAnimation = () => {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch("/doc-loading.json")
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

  return <div className="w-1/3">{animationData && View}</div>;
};

export default LoadingAnimation;
