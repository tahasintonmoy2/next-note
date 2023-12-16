import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs";
import Link from "next/link";

export const Navbar = () => {
  const { userId, orgId } = auth();

  return (
    <div className="fixed top-0 w-full px-4 py-4 flex items-center">
      <div className="md:max-w-screen-2xl mx-auto flex items-center justify-between w-full">
        <Logo href="/" />
        <div className="space-x-4 md:w-auto flex items-center">
          {userId ? (
            <Button>
              <Link href={`/organization/${orgId}`}>
                Organization
              </Link>
            </Button>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/sign-in">
                  Sign In
                </Link>
              </Button>
              <Button>
                <Link href="/sign-up">
                  Get Started for free
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
