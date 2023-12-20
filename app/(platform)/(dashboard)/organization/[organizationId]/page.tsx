import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";
import { Boardlist } from "./_components/board-list";
import { Info } from "./_components/info";
import { checkSubscription } from "@/lib/subscription";

const OrganizationPage = async() => {
  const isPro = await checkSubscription();

  return (
  <div className="w-full mb-20">
    <Info isPro={isPro} />
    <Separator className="my-4"/>
    <div className="px-2 md:px-4">
      <Suspense fallback={<Boardlist.Skeleton />}>
        <Boardlist />
      </Suspense>
    </div>
  </div>
  );
};

export default OrganizationPage;
