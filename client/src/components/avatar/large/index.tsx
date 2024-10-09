import { ImgHTMLAttributes } from "react";

const LargeAvatar = ({
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
      className={`w-10 h-10 rounded-full bg-light dark:bg-stone-700 ${className}`}
    />
  );
};

export default LargeAvatar;
