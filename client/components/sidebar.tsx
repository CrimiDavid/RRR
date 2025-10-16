"use client";
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";

import { getFavoritedPosts } from "@/lib/api/posts";
import { useEffect, useState } from "react";

export function AppSidebar() {
  const [favs, setFavs] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getFavoritedPosts();
        console.log(data); // Now this will log the actual JSON data
        setFavs(data);
      } catch (error) {
        console.error("Error fetching favorited posts:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <Sidebar>
      <SidebarHeader>
        <div className={"flex space-x-2 justify-center items-center mt-5"}>
          <img
            src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg"
            className="max-h-8 dark:invert"
            alt="Shadcn UI Navbar"
          />
          <span className="text-lg font-semibold tracking-tighter">RRR</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium text-muted-foreground/70 uppercase tracking-wider">
            Favorites
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {favs.length > 0 ? (
                favs.map((fav, index) => (
                  <SidebarMenuItem key={index}>
                    <SidebarMenuButton
                      asChild
                      className="group h-9 px-3 hover:bg-accent/50 transition-colors duration-200"
                    >
                      <a className="flex items-center gap-3 w-full">
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm truncate text-foreground group-hover:text-foreground/90">
                            {fav.name}
                          </div>
                          <div className="text-xs text-muted-foreground truncate mt-0.5">
                            {fav.description}
                          </div>
                        </div>
                        <div className="flex-shrink-0">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                            {fav.type}
                          </span>
                        </div>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))
              ) : (
                <div className="px-3 py-6 text-center">
                  <div className="text-sm text-muted-foreground">
                    No favorites yet
                  </div>
                </div>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
