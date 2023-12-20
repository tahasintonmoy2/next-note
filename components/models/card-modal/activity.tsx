"use client";

import { ActivityItem } from "@/components/activity-item";
import { NoActivityFound } from "@/components/models/card-modal/no-activity-found";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { AuditLog } from "@prisma/client";
import { History } from "lucide-react";

interface ActivityProps {
  items: AuditLog[];
}

export const Activity = ({ 
    items
}: ActivityProps) => {
  return (
    <div className="flex items-start gap-x-3 w-full">
      <div className="w-full">
        <div className="flex items-start">
          <History className="h-5 w-5 text-slate-800 mt-0.5 mr-2" />
          <p className="font-semibold mb-2">
            Activity History
          </p>
        </div>
        {items.length === 0 && (
          <NoActivityFound />
        )}
        <ol
          className={cn(
            "mt-2 space-y-4 overflow-y-auto w-[450px]",
            items.length > 2 ? "h-32" : "h-auto",
          )}
        >
          {items.map((item) => (
            <ActivityItem key={item.id} data={item} />
          ))}
        </ol>
      </div>
    </div>
  );
};

Activity.Skeleton = function ActivitySkeleton() {
  return (
    <div className="flex items-start gap-x-3 w-full">
      <Skeleton className="h-6 w-6 bg-neutral-200" />
      <div>
        <Skeleton className="h-6 w-24 mb-2 bg-neutral-200" />
        <Skeleton className="h-10 w-full bg-neutral-200" />
      </div>
    </div>
  );
};
