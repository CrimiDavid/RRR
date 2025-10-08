"use client";
import { AppWindowIcon, CodeIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Favorite } from "@/components/posts/favorite-star";

interface ResizablePanelsSmallProps {
  creator: string;
  post: string;
}

export default function ResizablePanelsSmall({
  creator,
  post,
}: ResizablePanelsSmallProps) {
  return (
    <div className="flex w-full h-screen flex-col gap-6 p-4">
      <Tabs defaultValue="read">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="read">Readme</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
          </TabsList>
          <Favorite creator={creator} post={post} />
        </div>
        <TabsContent value="read">
          <div className="h-full p-4 overflow-auto">{/* <Demo /> */}</div>
        </TabsContent>
        <TabsContent value="code">
          <div className="h-full p-4 overflow-auto">
            <h1 className="text-2xl font-bold text-green-800 mb-4">
              Right Panel
            </h1>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
