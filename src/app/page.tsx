"use client";
import { AppSidebar } from "@/components/app-sidebar";
import MainUI from "@/components/MainUI";
import { SidebarTrigger } from "@/components/ui/sidebar";

const Page = () => {
  return (
    <div className="flex ">
      <AppSidebar />
      <SidebarTrigger />

      <MainUI />
    </div>
  );
};

export default Page;
