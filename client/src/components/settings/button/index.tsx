const Button = ({
  isSelected,
  setIsSelected,
}: {
  isSelected: boolean;
  setIsSelected: () => void;
}) => {
  return (
    <button className="text-4xl p-0 m-0" onClick={setIsSelected}>
      {isSelected ? (
        <i className="bx bxs-toggle-right text-green-600" />
      ) : (
        <i className="bx bx-toggle-left text-stone-800/60 dark:text-gray-100/30" />
      )}
    </button>
  );
};

export default Button;
