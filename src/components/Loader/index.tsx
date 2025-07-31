
const Loader = () => {
  return (
    <div className="fixed z-50 w-full h-full top-0 left-0">
      <div className="absolute top-0 left-0 w-full h-full bg-white/60 opacity-50 backdrop-blur-sm" />
      <div className="relative w-full h-full flex gap-x-2 justify-center items-center">
        <div className="w-5 h-5 rounded-full bg-[#d991c2] animate-pulse" />
        <div className="w-5 h-5 rounded-full bg-[#9869b8] animate-pulse" />
        <div className="w-5 h-5 rounded-full bg-[#6756cc] animate-pulse" />
      </div>
    </div>
  );
};

export default Loader;
