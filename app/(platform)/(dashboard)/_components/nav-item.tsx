"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Activity, CreditCard, History, LayoutDashboard, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export type Organization = {
  id: string;
  slug: string;
  imageUrl: string;
  name: string;
};

interface NavItemProps {
  isExpanded: boolean;
  isActive: boolean;
  organization: Organization;
  onExpand: (id: string) => void;
}

export const NavItem = ({
  isExpanded,
  isActive,
  organization,
  onExpand,
}: NavItemProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const routes = [
    {
      label: "Boards",
      icon: <LayoutDashboard className="h-5 w-5 mr-2" />,
      href: `/organization/${organization.id}`,
    },
    {
      label: "Activity History",
      icon: <History className="h-5 w-5 mr-2" />,
      href: `/organization/${organization.id}/activity`,
    },
    {
      label: "Billing",
      icon: <CreditCard className="h-5 w-5 mr-2" />,
      href: `/organization/${organization.id}/billing`,
    },
    {
      label: "Settings",
      icon: <Settings className="h-5 w-5 mr-2" />,
      href: `/organization/${organization.id}/settings`,
    },
  ];

  const onClick = (href: string) => {
    router.push(href);
  };

  return (
    <>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger
            onClick={() => onExpand(organization.id)}
            className={cn(
              "flex items-center gap-x-2 p-1.5 rounded-md hover:bg-neutral-500/10 transition text-start no-underline hover:no-underline",
              isActive && !isExpanded && "bg-blue-600/10 text-blue-600"
            )}
          >
            <div className="flex items-center gap-x-2">
              <div className="w-7 h-7 relative">
                <Image
                  fill
                  src={organization.imageUrl}
                  alt=""
                  className="rounded-md object-cover"
                />
              </div>
              {organization.name}
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-1">
            {routes.map((route) => (
              <Button
                key={route.href}
                size="sm"
                onClick={() => onClick(route.href)}
                className={cn(
                  "w-full font-semibold justify-start pl-10 mb-1",
                  pathname === route.href ? "bg-blue-600/10 text-blue-600 hover:text-blue-500" : "text-slate-600"
                )}
                variant="ghost"
              >
                {route.icon}
                {route.label}
              </Button>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
};

NavItem.Skeleton = function SkeletonNavItem() {
  return (
    <div className="flex items-center gap-x-2">
      <div className="w-10 h-10 relative shrink-0">
        <Skeleton className="h-full w-full absolute rounded-md bg-slate-300" />
      </div>
        <Skeleton className="h-10 w-full bg-slate-300" />
    </div>
  );
};
