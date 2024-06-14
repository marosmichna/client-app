import { BellIcon } from "lucide-react";
import SearchBar from "./SearchBar";
import { Button } from "./ui/button";
import UserItemSmall from "./UserItemSmall";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
  
import { useState } from "react";

const Header = () => {

  const [myNotifications, setMyNotifications] = useState([
    {
        text: "This is a old notification",
        date: "13-05-2024",
        read: true,
    },
    {
        text: "This is a new notification",
        date: "13-06-2024",
        read: false,
    }
  ])

  const handleNotification = () => {
    setMyNotifications([]);
  }

  return (
    <div className="grid grid-cols-2 border-b p-4 gap-4">
      <SearchBar />
      <div className="flex items-center justify-end gap-4">
        <DropdownMenu>
            <DropdownMenuTrigger>
            <Button onClick={handleNotification} className="relative" variant="outline" size="icon">
            <div className={`absolute -top-2 -right-1 h-3 w-3 rounded-full my-1 ${myNotifications.find((x) => x.read === true) ? 'bg-green-800' : 'bg-gray-200'}`}></div>
                <BellIcon className="h-4 w-4" />
            </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {myNotifications.map((item, index) => (
                    <DropdownMenuItem 
                        key={index}
                        className="flex items-start gap-3 p-2 cursor-pointer hover:bg-gray-200 transition"
                    >
                        <div className={`h-3 w-3 rounded-full my-1 ${!item.read ? 'bg-green-800' : 'bg-gray-200'}`}></div>
                        <div>
                            <p>{item.text}</p>
                            <p>{item.date}</p>
                        </div>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
        <DropdownMenuTrigger>
            <UserItemSmall />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">LogOut</DropdownMenuItem>
        </DropdownMenuContent>
        </DropdownMenu>
        
      </div>
    </div>
  )
}

export default Header;
