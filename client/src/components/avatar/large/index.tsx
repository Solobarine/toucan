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
  size?: "lg" | "xl";
}) => {
  return (
    <div
      className={`${
        size == "xl" ? "w-16 h-16" : "w-12 h-12"
      } rounded-full bg-gradient-to-r ${
        type == "post"
          ? "from-blue-500 to-purple-600"
          : "from-green-500 to-teal-600"
      } flex items-center justify-center`}
    >
      {avatar ? (
        <img
          src={avatar}
          alt={capitalizeText(first_name) + " " + capitalizeText(last_name)}
          className="w-full h-full rounded-full object-cover"
        />
      ) : (
        first_name && (
          <span
            className={`text-white font-semibold ${
              size == "xl" ? "text-4xl" : "text-lg"
            }`}
          >
            {first_name.charAt(0).toUpperCase()}
          </span>
        )
      )}
    </div>
  );
};

export default LargeAvatar;
