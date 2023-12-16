import { siteConfig } from "@/config/site";
import { SignUp } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
  description: siteConfig.description,
};

export default function Page() {
  return <SignUp />;
}