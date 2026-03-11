"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarGroupLabel,
  SidebarRail,
  SidebarInset,
} from "@/components/ui/sidebar";
import { FaLinkedin } from "react-icons/fa6";
import { SiGmail } from "react-icons/si";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";

export function AppSidebar() {
  return (
    <>
      <Sidebar className="">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <p className={"text-xl text-bold font-main-heading"}>
                {"Niteesh's Portfolio"}
              </p>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className={"text-md lg:text-sm"}>
              Content
            </SidebarGroupLabel>
            <SidebarMenu>
              <Link href="/" className="text-xl lg:text-md font-sub-heading">
                Chat
              </Link>
              <SidebarMenuItem>
                <Link
                  href="/about-me"
                  className="text-xl lg:text-md font-sub-heading"
                >
                  About Me
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link
                  href="/projects"
                  className="text-xl lg:text-md font-sub-heading"
                >
                  Projects
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link
                  href="/experiences"
                  className="text-xl lg:text-md font-sub-heading"
                >
                  Experiences
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link
                  href="/education"
                  className="text-xl lg:text-md font-sub-heading"
                >
                  Education
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarGroupLabel className={"text-md lg:text-sm"}>
              Socials
            </SidebarGroupLabel>
            <SidebarMenuItem className="flex w-full h-full justify-start gap-5">
              <Link
                href="https://github.com/Niteesh3110"
                className="hover:cursor-pointer"
              >
                <FaGithub className="text-3xl lg:text-2xl" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/niteesh-panchal/"
                className="hover:cursor-pointer"
              >
                <FaLinkedin className="text-3xl lg:text-2xl " />
              </Link>
              <a
                href="mailto:niteeshpanchal@gmail.com?subject=Portfolio Inquiry&body=Hi Niteesh, I saw your portfolio and wanted to connect."
                className=" hover:cursor-pointer"
              >
                <SiGmail className="text-3xl lg:text-2xl" />
              </a>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    </>
  );
}
