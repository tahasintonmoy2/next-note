import { siteConfig } from "@/config/site";
import { OrganizationProfile } from "@clerk/nextjs";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Settings",
  description: siteConfig.description,
};

const Settings = () => {
  return (
    <div className="w-full">
      <OrganizationProfile
        appearance={{
          elements: {
            rootBox: {
              boxShadow: "none",
              width: "98%",
            },
            card: {
              border: "1px solid #e5e5e5",
              boxShadow: "none",
              width: "98%",
            },
          },
        }}
      />
    </div>
  );
};

export default Settings;
