import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { ActivityItem } from "@/components/activity-item";
import { NoActivityFound } from "@/components/no-activity-found";
import { Skeleton } from "@/components/ui/skeleton";
import { db } from "@/lib/db";

export const ActivityList = async () => {
  const { orgId } = auth();

  if (!orgId) {
    redirect("/select-org");
  }

  const auditLogs = await db.auditLog.findMany({
    where: {
      orgId,
    },
    orderBy: {
      createdAt: "desc"
    }
  });

  return (
    <ol className="space-y-4 my-4">
      {auditLogs.length === 0 ? (
          <NoActivityFound />
      ): (
        <>
            {auditLogs.map((log) => (
                <ActivityItem key={log.id} data={log} />
            ))}
        </>
      )}
    </ol>
  );
};

ActivityList.Skeleton = function ActivityListSkeleton() {
  return (
    <ol className="space-y-4 mt-4">
      <Skeleton className="w-[80%] h-14" />
      <Skeleton className="w-[50%] h-14" />
      <Skeleton className="w-[70%] h-14" />
      <Skeleton className="w-[80%] h-14" />
      <Skeleton className="w-[75%] h-14" />
    </ol>
  );
};