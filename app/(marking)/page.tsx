import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs";
import { Medal } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const {userId} = auth()
  return (
    <div className="flex items-center justify-center flex-col">
      <div className="flex items-center justify-center flex-col">
        <div className="mb-4 flex items-center border shadow-sm p-4 bg-amber-100 text-amber-700 rounded-full font-semibold uppercase">
          <Medal className="h-6 w-6 mr-2" />
          No 1 task managment app
        </div>
        <h1 className="text-3xl mx-4 md:mx-0 md:text-6xl text-center mb-6">
          Next Note helps team move
        </h1>
        <div className="text-3xl md:text-5xl bg-gradient-to-r from-fuchsia-600 via-purple-500 to-pink-500 text-white px-4 py-2 pb-4 rounded-md">
          work forword
        </div>
      </div>
      <div className="text-sm md:text-xl text-neutral-400 mt-4 max-w-xs md:max-w-2xl text-center mx-auto">
        Collaborate, manage projects, and reach new productivity peaks. From
        high rises to the home office, the way your team works is unique -
        accomplish it all with Next Note
      </div>
      {!userId && (
      <Button className="mt-6" size="lg" asChild>
       <Link href="/sign-up">
        Get Started for free
       </Link> 
      </Button>
      )}
    </div>
  );
}
