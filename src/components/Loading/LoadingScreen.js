"use server";
const LoadingScreen = () => {
  return (
    <div
      className={"w-full h-screen flex flex-col content-center justify-center"}
    >
      <div className="w-8 h-8 border-4 border-black-subtle border-t-transparent border-solid rounded-full animate-spin mx-auto">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingScreen;
