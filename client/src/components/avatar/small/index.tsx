import { capitalizeText } from "../../../utils";

const SmallAvatar = ({
  first_name,
  last_name,
  avatar,
  type = "post",
  size = "small",
}: {
  first_name: string;
  last_name: string;
  avatar: string;
  type?: string;
  size?: "small" | "xs";
}) => {
  return (
    <div
      className={`${
        size == "xs" ? "w-8 h-8" : "w-10 h-10"
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
          <span className="text-white font-semibold text-lg">
            {first_name.charAt(0).toUpperCase()}
          </span>
        )
      )}
    </div>
  );
};

export default SmallAvatar;
