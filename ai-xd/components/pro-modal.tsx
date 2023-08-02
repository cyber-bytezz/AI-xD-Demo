"use client";

import { Dialog, DialogDescription, DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { useProModal } from "@/hooks/use-promodal";
import { DialogContent, DialogTitle } from "@radix-ui/react-dialog";
import { Badge } from "@/components/ui/badge";
import { Check, Code, MessageSquare, Music, VideoIcon, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useState } from "react";

const tools = [
    {
      lable:"Conversation",
      icon:MessageSquare,
      color:"text-violet-500",
      bgcolor:"bg-violet-500/10",
    },
    {
      lable:"Music Genneration",
      icon:Music,
      color:"text-emerald-500",
      bgcolor:"bg-violet-500/10",
    },
    {
      lable:"Image Generation",
      icon:MessageSquare,
      color:"text-pink-700",
      bgcolor:"bg-emerald-500/10",
    },
    {
      lable:"Video Generation",
      icon:VideoIcon,
      color:"text-orange-700",
      bgcolor:"bg-orange-700/10",
    },
    {
      lable:"Code Generation",
      icon:Code,
      color:"text-green-700",
      bgcolor:"bg-green-700/10",
    },
   ]

export const ProModal = () => {
const proModal = useProModal();
const [loading, setLoading] = useState(false);

const onSubscribe = async () => {
  try{
    setLoading(true);
    const response = await axios.get("/api/stripe")
    window.location.href = (response) .data.url;
  }catch (error){
    console.log(error, "STRIPE_CLIENTERROR");
  } finally{
    setLoading(false);
  }
}

    return (
         <Dialog open = {proModal.isOpen} onOpenChange={proModal.onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle 
                    className="flrx justify-center item-center flrx-col gap-y-4 pb-2">
                        <div className="flex item-center gap-x-2 font-bold py-1">
                    Upgrade to AI-xD  
                    <Badge variant="premium" className="uppercase test-sm py-1">
                        pro
                        </Badge>   
                        </div>                
                    </DialogTitle>
                    <DialogDescription className="text-ceter pt-2 space-y-2 text-zinc-900 font-medium">
                          {tools.map((tool) => (
                            <Card
                            key={tool.lable}
                            className="p-3 border-black/5 flex items-center justify-between">
                                <div className="flex items-center gap-x-4">
                                    <div className={cn("p-2 w-fit rounded-md" , tool.bgcolor)}>
                                        <tool.icon className={cn("w-6 h-6" , tool.color)}/>
                                    </div>
                                    <div className="font-semibold text-sm">
                                        {tool.lable}
                                    </div>
                                </div>
                                <Check className="text-promary w-5 h-5"/>
                            </Card>
                          ))}  
                    </DialogDescription> 
                </DialogHeader>
                <DialogFooter>
                    <Button 
                    onClick={onSubscribe}
                    size="lg"
                    variant="premium"
                    className="w-full"
                    >
                        Upggrade
                        <Zap className="w-4 h-4 ml-2 fill-white"/> 
                    </Button>
                </DialogFooter>
            </DialogContent>
         </Dialog>
    )
}