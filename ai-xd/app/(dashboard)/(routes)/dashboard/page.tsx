"use client";
import { Card } from "@/components/ui/card";
import { Code, MessageSquare, Music, VideoIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
 
 const tools = [
  {
    lable:"Conversation",
    icon:MessageSquare,
    color:"text-violet-500",
    bgcolor:"bg-violet-500/10",
    href:"/conversation"
  },
  {
    lable:"Music Genneration",
    icon:Music,
    color:"text-emerald-500",
    bgcolor:"bg-violet-500/10",
    href:"/music"
  },
  {
    lable:"Image Generation",
    icon:MessageSquare,
    color:"text-pink-700",
    bgcolor:"bg-emerald-500/10",
    href:"/image"
  },
  {
    lable:"Video Generation",
    icon:VideoIcon,
    color:"text-orange-700",
    bgcolor:"bg-orange-700/10",
    href:"/video"
  },
  {
    lable:"Code Generation",
    icon:Code,
    color:"text-green-700",
    bgcolor:"bg-green-700/10",
    href:"/code"
  },
 ]
 
 
 const DashboardPage = () => {
  const router = useRouter();
  return (
   <div>
     <div className="mb-8 space-y-4">
      <h2 className="text-2xl md:text-4xl font-bold text-center">
        Explore The Power Of AI
      </h2>
      <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
        Chat with the smartest Ai - Experience the power of AI
      </p>
     </div>
      <div className="px-4 md:px-20 lg:px-32 space-y-4"></div>
      {tools.map((tool) => ( 
        <Card
        onClick={() => router.push(tool.href)}
          key={tool.href}
          className="p-4 border-black/5 flex item-center justify-between hover:shadow-md transition cursor-pointer">
            <div className="flex items-center gap-4">
              <div className={cn("p-2 w-fit rounded-md" ,tool.bgcolor)}>
                <tool.icon className={cn("w-8 h-8",tool.color)}/>
              </div>
              <div className="font-semibold">
                {tool.lable}
              </div>
            </div>
            <ArrowRight className ="w-5 h-5"/>
        </Card>
      ))}
   </div>
 
  )
}

export default DashboardPage;