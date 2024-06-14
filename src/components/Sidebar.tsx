import UserItem from "./UserItem";
import {
    Command,
    CommandGroup,
    CommandItem,
    CommandList,
    CommandSeparator,
  } from "@/components/ui/command";
import { MenuGroup, MenuItem } from "@/model";

import { Bell, CalendarDays, ClipboardPlus, GlobeLock, LogIn, Settings, User, Users } from "lucide-react";
import { Link } from "react-router-dom";



const Sidebar = () => {

  const listOfMenu = [
    {
        group: "General",
        items: [
            {
                link: "/profile",
                icon: <User />,
                text: "Profile"
            },
            {
                link: "/a",
                icon: <CalendarDays />,
                text: "Calendar"
            },
            {
                link: "/",
                icon: <Users />,
                text: "Sessions"
            },
            {
                link: "/add-session",
                icon: <ClipboardPlus />,
                text: "Add Sessions"
            },
            {
                link: "/c",
                icon: <Bell />,
                text: "Notifications"
            }
        ]
    },
    {
        group: "Settings",
        items: [
            {
                link: "/d",
                icon: <Settings />,
                text: "General Settings"
            },
            {
                link: "/e",
                icon: <GlobeLock />,
                text: "Privacy"
            },
            {
                link: "/f",
                icon: <LogIn />,
                text: "Logs"
            }
        ]
    }
  ]

  return (
    <div className="flex flex-col w-[300px] min-w-[300px] border-r min-h-screen p-5 gap-5">
      <div>
        <UserItem />
      </div>
      <div className="grow">
        <Command>
            {listOfMenu.map((list: MenuGroup, index: number) => (
                <CommandList key={index}>
                <CommandGroup heading={list.group}>
                {list.items.map((item: MenuItem, itemIndex: number) => (
                    <Link to={item.link} key={itemIndex}>
                        <CommandItem className="flex gap-2 cursor-pointer">
                            {item.icon}
                            {item.text}
                        </CommandItem>
                    </Link>

                ))}
                </CommandGroup>
                <CommandSeparator />
            </CommandList>
            ))}
        </Command>
      </div>
    </div>
  )
}

export default Sidebar;
