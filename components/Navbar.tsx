import { UserButton } from "@clerk/nextjs"
import { Button } from "./ui/button"
import { Menu } from "lucide-react"
import MobileSidebar from "./mobile-sidebar"
import { getApiLimitCount } from "@/lib/api-limit"
import { checkSubscription } from "@/lib/subscription"

const Navbar = () => {
    const apiLimitCount = getApiLimitCount();
    const isPro = checkSubscription();
    return (
        <div className='flex items-center p-4'>
            <MobileSidebar apiLimitCount={apiLimitCount} isPro={isPro} />
            <div className="flex w-full justify-end">
                <UserButton />
            </div>
        </div>
    )
}

export default Navbar