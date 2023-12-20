"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useOrganization } from "@clerk/nextjs";
import { CreditCard } from "lucide-react";
import Image from "next/image";

interface InfoProps {
  isPro: boolean
}

export const Info = ({
  isPro
}: InfoProps) => {
  const { organization, isLoaded } = useOrganization();

  if (!isLoaded) {
    return (
      <Info.Skeleton />
    );
  }

  return (
    <div className="flex items-center gap-x-4">
      <div className="w-[60px] h-[60px] relative">
        <Image
          fill
          src={organization?.imageUrl!}
          alt=""
          className="rounded-md object-cover"
        />
      </div>
      <div className="space-y-1">
        <p className="font-medium text-xl">{organization?.name}</p>
        {isPro ? (
          <div className="flex items-center text-xs text-muted-foreground">
            <Image src="/premium.png" alt="" height={18} width={18} className="mr-1" />
            <span className="text-base font-semibold text-blue-600">Pro</span>
          </div>
        ) : (
          <div className="flex items-center text-xs text-muted-foreground">
            <CreditCard className="h-4 w-4 mr-1" />
            <span className=" font-semibold ">Free</span>
          </div>
        )}
      </div>
    </div>
  );
};

Info.Skeleton = function SkeletonInfo() {
  return (
    <div className="flex items-center gap-x-4">
      <div className="w-[60px] h-[60px] relative">
        <Skeleton className="w-full h-full absolute bg-slate-300" />
      </div>
      <div className="sapce-y-2">
        <Skeleton className="h-10 w-[200px] bg-slate-300" />
        <div className="flex items-center mt-2">
          <Skeleton className="h-4 w-4 mr-2 bg-slate-300" />
          <Skeleton className="h-4 w-[100px] bg-slate-300" />
        </div>
      </div>
    </div>
  );
};
