"use client";
import { MessageSquare } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  // SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { chatType, useChats } from "@/context/chatsContext";

// // Menu items.
// const items = [
//   {
//     title: "Home",
//     url: "#",
//     icon: MessageSquare,
//   },
//   {
//     title: "Inbox",
//     url: "#",
//     icon: MessageSquare,
//   },
//   {
//     title: "Calendar",
//     url: "#",
//     icon: MessageSquare,
//   },
//   {
//     title: "Search",
//     url: "#",
//     icon: MessageSquare,
//   },
//   {
//     title: "Settings",
//     url: "#",
//     icon: MessageSquare,
//   },
// ];

export function AppSidebar() {
  const { chat } = useChats();
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xl font-semibold mb-8">
            GEMINI CLONE
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <h2 className="text-xl font-semibold mb-5">
                Recent Questions...
              </h2>
              {chat.length > 1 ? (
                chat.map((ch: chatType, id: number) => (
                  <SidebarMenuItem key={id} className="flex items-center">
                    <MessageSquare size={24} />
                    <span className="ml-4 font-semibold text-lg">
                      {ch.chat as unknown as string}
                    </span>
                  </SidebarMenuItem>
                ))
              ) : (
                <h3 className="font-semibold hover:underline duration-500 cursor-pointer no-underline">
                  No Chats are available ...
                </h3>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
