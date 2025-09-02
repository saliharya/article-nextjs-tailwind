import * as React from "react"
import { FileText, LogOut, Tag } from "lucide-react"
import { usePathname } from "next/navigation"

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
import { useDispatch } from "react-redux"
import { useRouter } from "next/navigation"
import LogoutConfirmModal from "./logout-confirm-modal"

const data = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [
    {
      items: [
        {
          title: "Articles",
          url: "/admin/articles",
          icon: FileText,
        },
        {
          title: "Categories",
          url: "/admin/categories",
          icon: Tag,
        },
        {
          title: "Logout",
          url: "/logout",
          icon: LogOut,
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()

  const [isModalOpen, setIsModalOpen] = React.useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <>
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
                      const isLogout = subItem.title === "Logout"
                      const isActive = pathname === subItem.url

                      return (
                        <SidebarMenuItem key={subItem.title}>
                          <SidebarMenuButton asChild>
                            {isLogout ? (
                              <button
                                onClick={openModal}
                                className={`flex items-center gap-2 rounded-md px-2 py-1.5 transition-colors
                                text-white hover:bg-gray-100`}
                              >
                                <subItem.icon className="h-4 w-4 text-white hover:text-gray-500" />
                                {subItem.title}
                              </button>
                            ) : (
                              <a
                                href={subItem.url}
                                className={`flex items-center gap-2 rounded-md px-2 py-1.5 transition-colors
                                ${isActive
                                    ? "bg-blue-500 text-white hover:bg-blue-600"
                                    : "text-white hover:bg-gray-100"
                                  }`}
                              >
                                <subItem.icon
                                  className={`h-4 w-4 ${isActive ? "text-white" : "text-gray-500"}`}
                                />
                                {subItem.title}
                              </a>
                            )}
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
      <LogoutConfirmModal open={isModalOpen} onClose={closeModal} />
    </>
  )
}
