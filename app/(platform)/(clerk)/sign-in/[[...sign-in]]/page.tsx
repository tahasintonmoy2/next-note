import { SignIn } from "@clerk/nextjs";
import { siteConfig } from "@/config/site";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
  description: siteConfig.description,
};
 
export default function Page() {
  return <SignIn />;
}