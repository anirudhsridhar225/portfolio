import Image from "next/image";
import Neovim from "@/components/Neovim"
import Terminal from "@/components/Terminal";

export default function Home() {
  return (
    <div className="min-h-screen min-w-screen bg-[rgb(32,33,37)]">
      <Terminal />
    </div>
  );
}
