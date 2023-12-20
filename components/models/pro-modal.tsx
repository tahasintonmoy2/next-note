"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { useProModal } from "@/hooks/use-pro-modal";
import Image from "next/image";
import { useAction } from "@/hooks/use-action";
import { stripeRedirect } from "@/actions/stripe-redirect";
import { toast } from "sonner";

export const ProModal = () => {
    const proModal = useProModal();

    const { execute, isLoading } = useAction(stripeRedirect, {
        onSuccess: (data) => {
            window.location.href = data;
        },
        onError: (error) => {
            toast.error(error);
        },
    });

    const onClick = () => {
        execute({});
    };

    return (
        <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
            <DialogContent className="max-w-md p-0 overflow-hidden">
                <div className="aspect-video relative flex items-center justify-center">
                    <Image
                        src="/image_folder.png"
                        alt=""
                        height={300}
                        width={300}
                        className="object-cover"
                    />
                </div>
                <div className="mx-auto space-y-4 p-6 flex flex-col items-center justify-center">
                    <h2 className="font-semibold text-xl">
                        Upgrade to Next Note Pro Today!
                    </h2>
                    <p className="text-xs font-semibold text-neutral-600">
                        Explore the best of Next Note
                    </p>
                    <div className="pl-3">
                        <ul className="text-sm list-disc">
                            <li>Unlimited boards</li>
                            <li>Advanced checklists</li>
                            <li>Admin and security features</li>
                            <li>And more!</li>
                        </ul>
                    </div>
                    <Button onClick={onClick} disabled={isLoading}>
                        Upgrade to pro
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};
