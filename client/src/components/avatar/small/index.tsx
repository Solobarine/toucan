import { ImgHTMLAttributes } from "react";

const SmallAvatar = ({
  className,
  src,
  alt,
  ...props
}: ImgHTMLAttributes<HTMLImageElement>) => {
  return (
    <img
      src={src}
      alt={alt}
      {...props}
      className={`w-8 h-8 rounded-full bg-light dark:bg-stone-700 ${className}`}
    />
  );
};

export default SmallAvatar;
