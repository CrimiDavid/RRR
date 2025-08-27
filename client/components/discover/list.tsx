"use client"
import {
  Shield,
  Cloud,
  Briefcase,
  BarChart3,
  Cpu,
  Globe,
  Users,
  Database,
  CreditCard,
  Headphones,
  Rocket,
  ShoppingCart,
  Monitor,
  MessageSquare,
  Lock,
  Settings,
  Zap,
  FileText,
} from "lucide-react"
import { TbFishHook } from "react-icons/tb";
import { FaPaintBrush } from "react-icons/fa";

import { cn } from "@/lib/utils";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table";
import {getPosts, PAGE_SIZE} from "@/lib/api/posts";
import React from "react";
import {useRepos} from "@/hooks/useList";

export const data = [
  {
    icon: <Shield strokeWidth={2} />,
    category: "Security",
    description: "AI-driven firewall with real-time network protection",
    year: 2024,
    offer: "Enterprise",
    segment: "Business",
  },
  {
    icon: <Cloud strokeWidth={2} />,
    category: "Technology",
    description: "Next-gen cloud infrastructure with auto healing nodes",
    year: 2023,
    offer: "Professional",
    segment: "Enterprise",
  },
  {
    icon: <Briefcase strokeWidth={2} />,
    category: "Services",
    description: "Outsourced IT management tailored for SMEs",
    year: 2022,
    offer: "Free",
    segment: "Startup",
  },
  {
    icon: <BarChart3 strokeWidth={2} />,
    category: "Analytics",
    description: "Predictive analytics engine with machine learning models",
    year: 2025,
    offer: "Enterprise",
    segment: "Business",
  },
  {
    icon: <Cpu strokeWidth={2} />,
    category: "Hardware",
    description: "Custom-built processors optimized for AI workloads",
    year: 2024,
    offer: "Professional",
    segment: "Enterprise",
  },
  {
    icon: <Globe strokeWidth={2} />,
    category: "Networking",
    description: "Global CDN with ultra-low latency edge computing",
    year: 2023,
    offer: "Enterprise",
    segment: "Business",
  },
  {
    icon: <Users strokeWidth={2} />,
    category: "Collaboration",
    description: "Team productivity suite with integrated AI assistants",
    year: 2024,
    offer: "Free",
    segment: "Business",
  },
  {
    icon: <Database strokeWidth={2} />,
    category: "Database",
    description: "Serverless database with instant horizontal scaling",
    year: 2022,
    offer: "Professional",
    segment: "Enterprise",
  },
  {
    icon: <CreditCard strokeWidth={2} />,
    category: "Fintech",
    description: "Payment gateway with fraud detection and global support",
    year: 2025,
    offer: "Enterprise",
    segment: "Business",
  },
  {
    icon: <Headphones strokeWidth={2} />,
    category: "Support",
    description: "24/7 AI-powered customer service chatbot",
    year: 2024,
    offer: "Professional",
    segment: "Startup",
  },
  {
    icon: <Rocket strokeWidth={2} />,
    category: "Innovation",
    description: "Rapid prototyping tools for product development",
    year: 2023,
    offer: "Free",
    segment: "Startup",
  },
  {
    icon: <ShoppingCart strokeWidth={2} />,
    category: "E-commerce",
    description: "Omnichannel platform for online retail businesses",
    year: 2024,
    offer: "Enterprise",
    segment: "Business",
  },
  {
    icon: <Monitor strokeWidth={2} />,
    category: "Monitoring",
    description: "Infrastructure monitoring with anomaly detection",
    year: 2022,
    offer: "Professional",
    segment: "Enterprise",
  },
  {
    icon: <MessageSquare strokeWidth={2} />,
    category: "Communication",
    description: "Secure encrypted messaging app for enterprises",
    year: 2023,
    offer: "Free",
    segment: "Business",
  },
  {
    icon: <Lock strokeWidth={2} />,
    category: "Compliance",
    description: "GDPR and HIPAA compliance tracking platform",
    year: 2024,
    offer: "Enterprise",
    segment: "Healthcare",
  },
  {
    icon: <Settings strokeWidth={2} />,
    category: "Automation",
    description: "Robotic process automation for repetitive tasks",
    year: 2025,
    offer: "Professional",
    segment: "Business",
  },
  {
    icon: <Zap strokeWidth={2} />,
    category: "Energy",
    description: "Smart energy management system for data centers",
    year: 2023,
    offer: "Enterprise",
    segment: "Enterprise",
  },
  {
    icon: <FileText strokeWidth={2} />,
    category: "Documentation",
    description: "Collaborative documentation with AI summarization",
    year: 2022,
    offer: "Free",
    segment: "Startup",
  },  {
    icon: <Shield strokeWidth={2} />,
    category: "Security",
    description: "AI-driven firewall with real-time network protection",
    year: 2024,
    offer: "Enterprise",
    segment: "Business",
  },
  {
    icon: <Cloud strokeWidth={2} />,
    category: "Technology",
    description: "Next-gen cloud infrastructure with auto healing nodes",
    year: 2023,
    offer: "Professional",
    segment: "Enterprise",
  },
  {
    icon: <Briefcase strokeWidth={2} />,
    category: "Services",
    description: "Outsourced IT management tailored for SMEs",
    year: 2022,
    offer: "Free",
    segment: "Startup",
  },
  {
    icon: <BarChart3 strokeWidth={2} />,
    category: "Analytics",
    description: "Predictive analytics engine with machine learning models",
    year: 2025,
    offer: "Enterprise",
    segment: "Business",
  },
  {
    icon: <Cpu strokeWidth={2} />,
    category: "Hardware",
    description: "Custom-built processors optimized for AI workloads",
    year: 2024,
    offer: "Professional",
    segment: "Enterprise",
  },
  {
    icon: <Globe strokeWidth={2} />,
    category: "Networking",
    description: "Global CDN with ultra-low latency edge computing",
    year: 2023,
    offer: "Enterprise",
    segment: "Business",
  },
  {
    icon: <Users strokeWidth={2} />,
    category: "Collaboration",
    description: "Team productivity suite with integrated AI assistants",
    year: 2024,
    offer: "Free",
    segment: "Business",
  },
  {
    icon: <Database strokeWidth={2} />,
    category: "Database",
    description: "Serverless database with instant horizontal scaling",
    year: 2022,
    offer: "Professional",
    segment: "Enterprise",
  },
  {
    icon: <CreditCard strokeWidth={2} />,
    category: "Fintech",
    description: "Payment gateway with fraud detection and global support",
    year: 2025,
    offer: "Enterprise",
    segment: "Business",
  },
  {
    icon: <Headphones strokeWidth={2} />,
    category: "Support",
    description: "24/7 AI-powered customer service chatbot",
    year: 2024,
    offer: "Professional",
    segment: "Startup",
  },
  {
    icon: <Rocket strokeWidth={2} />,
    category: "Innovation",
    description: "Rapid prototyping tools for product development",
    year: 2023,
    offer: "Free",
    segment: "Startup",
  },
  {
    icon: <ShoppingCart strokeWidth={2} />,
    category: "E-commerce",
    description: "Omnichannel platform for online retail businesses",
    year: 2024,
    offer: "Enterprise",
    segment: "Business",
  },
  {
    icon: <Monitor strokeWidth={2} />,
    category: "Monitoring",
    description: "Infrastructure monitoring with anomaly detection",
    year: 2022,
    offer: "Professional",
    segment: "Enterprise",
  },
  {
    icon: <MessageSquare strokeWidth={2} />,
    category: "Communication",
    description: "Secure encrypted messaging app for enterprises",
    year: 2023,
    offer: "Free",
    segment: "Business",
  },
  {
    icon: <Lock strokeWidth={2} />,
    category: "Compliance",
    description: "GDPR and HIPAA compliance tracking platform",
    year: 2024,
    offer: "Enterprise",
    segment: "Healthcare",
  },
  {
    icon: <Settings strokeWidth={2} />,
    category: "Automation",
    description: "Robotic process automation for repetitive tasks",
    year: 2025,
    offer: "Professional",
    segment: "Business",
  },
  {
    icon: <Zap strokeWidth={2} />,
    category: "Energy",
    description: "Smart energy management system for data centers",
    year: 2023,
    offer: "Enterprise",
    segment: "Enterprise",
  },
  {
    icon: <FileText strokeWidth={2} />,
    category: "Documentation",
    description: "Collaborative documentation with AI summarization",
    year: 2022,
    offer: "Free",
    segment: "Startup",
  },
]

interface ListProps {
  page: number,
  setPage: (page: number) => void
}
const List = ({page, setPage}: ListProps) => {
  const [isPreviousData, startTransition] = React.useTransition()

  console.log("rendering list")
  let {data} = useRepos(page)
  return (
    <section >
      <div className="container px-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              <TableHead className="hidden font-bold text-primary md:table-cell">
                Name
              </TableHead>
              <TableHead>
                <span className="hidden font-bold text-primary md:block">
                  Description
                </span>
                <span className="block font-bold text-primary md:hidden">
                  Project
                </span>
              </TableHead>
              <TableHead className="hidden text-right font-bold text-primary md:table-cell">
                Type
              </TableHead>

              <TableHead className="hidden font-bold text-primary md:table-cell">
                Creator
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody style={{ opacity: isPreviousData ? 0.5 : 1 }}>
            {data.posts.map((item, index: number) => (
                <TableRow key={index}>
                  <TableCell className="">
                    <div className="flex items-center gap-2 align-top">
                      {item.type === "UI" ? <FaPaintBrush strokeWidth={2} size={25} /> : <TbFishHook strokeWidth={2} size={25}/>}
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {item.name}
                  </TableCell>
                  <TableCell className="pl-0 align-top md:pl-4">
                    <div className="flex flex-col gap-2">
                      <p className="text-sm text-muted-foreground md:text-primary">
                        {item.description}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="hidden text-right md:table-cell">
                    {item.type} {/* change to upvotes */}
                  </TableCell>
                  <TableCell className="hidden text-left md:table-cell">
                    {item.creator.name}
                  </TableCell>
                </TableRow>
            ))}
          </TableBody>
        </Table>
        <hr/>
        <footer className={"flex w-full justify-center mt-2 space-x-2"}>
          {page > 1 && (
              <button
                  className={"hover:cursor-pointer hover:text-yellow-500"}
                  style={{opacity: isPreviousData ? 0.5 : 1}}
                  onClick={() => {
                    startTransition(() => {
                      setPage((p) => p - 1)
                    })
                  }}
                  disabled={isPreviousData || page === 1}
              >
                Previous
              </button>
          )}
          <span>Page {page}</span>
          {page < data.pages && (
              <button
                  className={"hover:cursor-pointer hover:text-yellow-500"}
                  style={{opacity: isPreviousData ? 0.5 : 1}}
                  disabled={isPreviousData}
                  onClick={() => {
                    startTransition(() => {
                      setPage(prev => prev + 1)
                    })
                    console.log("clicked")
                  }}
              >
                Next
              </button>
          )}


        </footer>
      </div>
    </section>
  );
};

export default React.memo(List);
