"use client";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";

const MobileSidebar = ({ apiLimitCount }: { apiLimitCount: number }) => {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);
    if (!isMounted) return null;
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant={"ghost"} size={"icon"} className="md:hidden">
                    <Menu />
                </Button>
            </SheetTrigger>
            <SheetContent side={"left"} className="p-0">
                <SheetTitle className="hidden"></SheetTitle>
                <Sidebar apiLimitCount={apiLimitCount} />
            </SheetContent>
        </Sheet>
    )
}

export default MobileSidebar;