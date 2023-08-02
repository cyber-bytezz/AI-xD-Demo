"use client";

import { Dialog, DialogDescription, DialogHeader } from "@/components/ui/dialog";
import { useProModal } from "@/hooks/use-promodal";
import { DialogContent, DialogTitle } from "@radix-ui/react-dialog";
import { Badge } from "@/components/ui/badge";
 

export const ProModal = () => {
const proModal = useProModal();

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
                    <DialogDescription></DialogDescription>
                </DialogHeader>
            </DialogContent>
         </Dialog>
    )
}