import { Loader2 } from "lucide-react";

const loading = () => {
  return (
    <div
      className="dark:text-blackfrom-slate-100 z-[1000]  
    bg-fixed dark:bg-[)] transition-all 
    bg-white 
   w-screen h-screen  backdrop-blur-sm fixed
    inset-0 flex flex-col gap-4 justify-center items-center"
    >
      <div
        className="font-bold dark:text-primary-purple
        mb-9 dark:text-white animate-pulse text-black text-2xl"
      >
        Loading your Page...{" "}
      </div>
      <Loader2 className="animate-spin h-[70px] w-[70px]" />
    </div>
  );
};

export default loading;
