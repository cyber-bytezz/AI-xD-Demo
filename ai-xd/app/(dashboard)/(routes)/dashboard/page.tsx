"use client";
import { MessageSquare } from "lucide-react";

 
 const tools = [
  {
    lable:"Conversation",
    icon:MessageSquare,
    color:"text-violet-500/10",
    href:"/coversation"
  }
 ]
 
 
 const DashboardPage = () => {
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
      {tools.map((tool) => ( !2:13pm

      ))}
   </div>
 
  )
}

export default DashboardPage;