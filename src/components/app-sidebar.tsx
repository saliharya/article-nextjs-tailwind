import * as React from "react"
import { FileText, LogOut, Tag } from "lucide-react"

import { VersionSwitcher } from "@/components/version-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

const data = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [
    {
      items: [
        {
          title: "Articles",
          url: "#",
          icon: FileText,
          isActive: true,
        },
        {
          title: "Categories",
          url: "#",
          icon: Tag,
          isActive: false,
        },
        {
          title: "Logout",
          url: "#",
          icon: LogOut,
          isActive: false,
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <VersionSwitcher
          versions={data.versions}
          defaultVersion={data.versions[0]}
        />
      </SidebarHeader>
      <SidebarContent>
        {data.navMain.map((item, index) => (
          <SidebarGroup key={index}>
            <SidebarGroupContent>
              <div className="px-2">
                <SidebarMenu>
                  {item.items.map((subItem) => {
                    return (
                      <SidebarMenuItem key={subItem.title}>
                        <SidebarMenuButton asChild>
                          <a
                            href={subItem.url}
                            className={`flex items-center gap-2 rounded-md px-2 py-1.5 transition-colors text-white
                              ${subItem.isActive
                                ? "bg-blue-500 text-white hover:bg-blue-600"
                                : "text-gray-700 hover:bg-gray-100"
                              }`}
                          >
                            <subItem.icon
                              className={`h-4 w-4 text-white
                                ${subItem.isActive
                                  ? "text-white"
                                  : "text-gray-500"
                                }`}
                            />
                            {subItem.title}
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    )
                  })}
                </SidebarMenu>
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
