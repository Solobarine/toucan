import { capitalizeText } from "../../../utils";

const LargeAvatar = ({
  first_name,
  last_name,
  avatar,
  type = "post",
  size = "lg",
}: {
  first_name: string;
  last_name: string;
  avatar: string;
  type?: string;
  size?: "lg" | "xl" | "3xl";
}) => {
  const returnAvatarSize = () => {
    switch (size) {
      case "lg":
        return "w-12 h-12";
      case "xl":
        return "w-16 h-16";
      case "3xl":
        return "w-28 h-28";
      default:
        return "w-12 h-12";
    }
  };

  const returnAvatarTextSize = () => {
    switch (size) {
      case "lg":
        return "text-lg";
      case "xl":
        return "text-xl";
      case "3xl":
        return "text-2xl";
      default:
        return "text-lg";
    }
  };
  return (
    <div
      className={`${returnAvatarSize()} rounded-full bg-gradient-to-r ${
        type == "post"
          ? "from-blue-500 to-purple-600"
          : "from-green-500 to-teal-600"
      } flex items-center justify-center`}
    >
      {avatar ? (
        <img
          src={avatar}
          alt={capitalizeText(first_name) + " " + capitalizeText(last_name)}
          className={`${returnAvatarSize()} rounded-full object-fill`}
        />
      ) : (
        first_name && (
          <span
            className={`text-white font-semibold ${returnAvatarTextSize()}`}
          >
            {first_name.charAt(0).toUpperCase()}
          </span>
        )
      )}
    </div>
  );
};

export default LargeAvatar;
