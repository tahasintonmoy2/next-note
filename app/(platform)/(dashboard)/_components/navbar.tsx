import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { OrganizationSwitcher, UserButton, auth } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import { MobileSidebar } from "./mobile-sidebar";
import { NavFormPopover } from "./popover";

export const Navbar = () => {
  const { orgId } = auth();

  return (
    <nav className="fixed z-50 top-0 h-14 px-4 w-full bg-white border-b shadow-sm flex items-center">
      <MobileSidebar />
      <div className="flex items-center gap-x-4">
        <div className="hidden md:flex">
          <Logo href={`/organization/${orgId}`} />
        </div>
        <NavFormPopover align="start" side="bottom" sideOffset={18}>
          <Button
            size="sm"
            variant="primary"
            className="rounded-sm hidden md:block h-auto py-1.5 px-2"
          >
            Create
          </Button>
        </NavFormPopover>
        <NavFormPopover align="start" side="bottom" sideOffset={18}>
          <Button
            size="sm"
            variant="primary"
            className="rounded-sm block md:hidden h-auto py-1.5 px-2"
          >
            <Plus />
          </Button>
        </NavFormPopover>
      </div>
      <div className="ml-auto flex items-center gap-x-2">
        <OrganizationSwitcher
          hidePersonal
          afterCreateOrganizationUrl="/organization/:id"
          afterLeaveOrganizationUrl="/select-org"
          afterSelectOrganizationUrl="/organization/:id"
        />
        <UserButton afterSignOutUrl="/" />
      </div>
    </nav>
  );
};
