import Image from "next/image";
import Neovim from "@/components/Neovim"

export default function Home() {
  return (
    <div className="min-h-screen min-w-screen flex bg-[rgb(32,33,37)]">
      <Neovim />
    </div>
  );
}
