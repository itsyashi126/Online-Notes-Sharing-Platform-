import Header from "./_components/Header";


import Hero from "./_components/Hero";
import { redirect } from "next/navigation";

export default async function Home() {
 

  return (
    <div className="items-center text-2xl">
    
      <Hero />
    </div>
  );
}
