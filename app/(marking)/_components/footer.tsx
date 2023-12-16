import Logo from "@/components/logo";
import React from "react";

const Footer = () => {
  return (
    <div className="fixed bottom-0 w-full px-4 py-4 flex items-center bg-[#0f111a] text-white">
      <div className="md:max-w-screen-2xl mx-auto flex items-center justify-between w-full">
        <Logo href="/" />
        <div className="space-x-4 md:w-auto flex items-center cursor-pointer">
          <p>Privacy Policy</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;