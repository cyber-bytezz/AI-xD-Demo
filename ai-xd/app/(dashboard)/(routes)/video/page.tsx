"use client";

import * as z from "zod";
import { Heading } from "@/components/heading";
import { useForm } from "react-hook-form";
import { formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { FormField,
         Form ,
         FormItem, 
         FormControl    
        } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";
import  { Video, VideoIcon } from "lucide-react";
import { useProModal } from "@/hooks/use-promodal";
 

const VideoPage = () => {
    const proModal = useProModal();
    const router = useRouter();
    const [Video , setVideo] = useState<string>();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ""
        }
});

const isLoading = form.formState.isSubmitting;

const onSubmit = async (values : z.infer<typeof formSchema>) => {
    try{
        setVideo(undefined);

        const response = await axios.post("/api/Video",values);

        setVideo: (response.data.data[0]);
        form.reset();
    } catch (error : any){
        if (error?.response?.status ===403) {
            proModal.onOpen();
         }
    }finally{
        router.refresh();
    }
};


    return (
        <div>
            <Heading
                title="Video Generation"
                description="Prompt Your Video"
                icon={VideoIcon}
                iconColor="text-orange-700"
                bgColor="bg-orange-700/10" />
            <div className="px-4 lg:px-8">
                <div>
                    <Form {...form}>
                        <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="
                        rounded-lg
                        border
                        w-full
                        p-4
                        px-3
                        md:px-6
                        focus-within:shadow=sm
                        grid
                        grid-cols-12
                        gap-2
                        ">
                            <FormField
                            name="prompt"
                            render={({field}) =>(
                                <FormItem className="col-span-12 lg:col-span-10">
                                    <FormControl className="m-0 p-0">
                                     <Input
                                            className="border-0 outline-none
                                                        focus-visible:ring-0
                                                         focus-visible:ring-transparant" 
                                                             disabled={isLoading}
                                                 placeholder="Funny"
                                                {...field}/>
                                    </FormControl>
                                </FormItem>
                             )} />
                             <Button className="col-span-12 lg:col-span-2 w-full" disabled={isLoading}>
                                Generate
                             </Button>
                        </form>
                    </Form>
                    </div>
                    <div className="space-y-4 mt-4">
                        {isLoading && (
                            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
                                <Loader/>
                                </div>
                        )}
                        {!Video && !isLoading &&(
                            <Empty label="No Music Generated"/>
                        )}
                        {Video && (
                             <video className="wfull aspectvideo mt8 roundedlg border bgblack" controls>
                                <source src="{video}"/>
                             </video>
                        )}
                </div>
            </div>
        </div>
    );
};

export default VideoPage;