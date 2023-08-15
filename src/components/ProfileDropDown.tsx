import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Link from 'next/link'
import { FaUserCircle } from 'react-icons/fa'
import { BiSolidGroup } from 'react-icons/bi'
import LogoutBtn from './LogoutBtn'

export default function ProfileDropDown({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
            <DropdownMenuContent className='text-medium-gray font-medium'>
                <DropdownMenuItem>
                    <Link href={'/profile'} className='flex items-center gap-2'>
                        <FaUserCircle className='text-xl' />
                        My Profile
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <div className='flex items-center gap-2 cursor-pointer'>
                        <BiSolidGroup className='text-xl' />
                        Group Chat
                    </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className='text-[#EB5757]'>
                    <LogoutBtn />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
