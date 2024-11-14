import { auth } from "@clerk/nextjs/server";
import prismadb from "./prismadb";

const Day_in_Milliseconds = 86_400_000;

// Date : 2024-12-14T15:57:07.000Z
export const checkSubscription = async () => {
    const { userId } = await auth();
    if (!userId) return false;

    const userSubscription = await prismadb.userSubscription.findUnique({
        where: {
            userId
        },
        select: {
            stripeCurrentPeriodEnd: true,
            stripeCustomerId: true,
            stripePriceId: true,
            stripeSubscriptionId: true
        }
    });
    if (!userSubscription) return false;

    const isValid = userSubscription.stripePriceId && userSubscription.stripeCurrentPeriodEnd?.getTime()! + Day_in_Milliseconds > Date.now();
    return !!isValid;
}