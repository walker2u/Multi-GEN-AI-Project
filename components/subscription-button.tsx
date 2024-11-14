"use client";

import { Zap } from "lucide-react";
import { Button } from "./ui/button";
import axios from "axios";
import React from "react";
import { set } from "zod";

export const SubscriptionButton = ({ isPro }: { isPro: boolean }) => {
    const [loading, setLoading] = React.useState(false);
    const clicked = async () => {
        try {
            setLoading(true);
            const response = await axios.get("/api/stripe");
            window.location.href = response.data.url;
        } catch (error) {
            console.log("Billing client error", error);
        } finally {
            setLoading(false);
        }
    }
    return (
        <Button variant={isPro ? "default" : "premium"} onClick={clicked} disabled={loading}>
            {isPro ? "Manage Subscription" : "Upgrade"}
            {!isPro && <Zap className="w-4 h-4 ml-2 fill-white" />}
        </Button>
    )
}