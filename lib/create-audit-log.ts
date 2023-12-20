import { auth, currentUser } from '@clerk/nextjs';
import { ACTION, ENTITY_TYPE } from '@prisma/client';

import { db } from "@/lib/db";
import { toast } from 'sonner';

interface Props {
    entityId: string,
    entityType: ENTITY_TYPE,
    entityTitle: string,
    action: ACTION
}

export const createAuditLog =async (props:Props) => {
    try {
        const { orgId } = auth()
        const user = await currentUser()

        if (!user || !orgId) {
            throw new Error("User not found!");
        }

        const {action, entityId, entityTitle, entityType} = props;

        await db.auditLog.create({
            data: {
                orgId,
                entityId,
                entityTitle,
                entityType,
                action,
                userId: user.id,
                userImage: user?.imageUrl,
                userName: user?.firstName + " " + user?.lastName
            }
        })
    } catch (error) {
        toast.error(`Someting went wrong!, error ${error}`)
        console.log(error);
    }
}