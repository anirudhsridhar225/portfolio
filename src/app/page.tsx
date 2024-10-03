import { Cover } from "@/components/cover";
import { TypewriterEffectSmooth } from "@/components/typewriter";

export default function Home() {

  const words = [
    {
      text: "Hello,"
    },
    {
      text: "I am"
    },
    {
      text: "Anirudh",
      className: "text-blue-500 dark:text-blue-500"
    },
    {
      text: "Sridhar",
      className: "text-blue-500 dark:text-blue-500"
    }
  ];

  return (
    <main>
      <Cover className = "text-xl font-bold">
        This is a Next.js project with Tailwind CSS and TypeScript. It includes
        a custom ESLint configuration and Prettier setup. It also includes a
        custom Jest configuration with React Testing Library and a GitHub
        Actions workflow for continuous integration.
      </Cover>

      <TypewriterEffectSmooth words= {words} />
    </main>
  );
}
