const NetworkError = ({ message }: { message: string | undefined }) => {
  return (
    <div className="bg-white dark:bg-stone-900 w-10/12 mx-auto mt-10 rounded-md grid place-content-center py-10">
      <p className="text-center text-lg">{message}</p>
    </div>
  );
};

export default NetworkError;
