import { LoaderCircle } from "lucide-react";

function Loader2() {
  return (
    <div className="shrink-0 flex items-center justify-center bg-primary-500 backdrop-blur-sm z-50 h-0">
      <LoaderCircle size={69} className="text-primary-500 font-bold animate-spin" />
    </div>
  );
}

export default Loader2;
