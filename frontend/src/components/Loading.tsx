const Loading = () => {
  return (
    <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex items-center justify-center mb-4">
        <p className="text-lg md:text-xl font-semibold text-gray-1000">
          Loading...
        </p>
      </div>
    </div>
  );
};

export default Loading;
