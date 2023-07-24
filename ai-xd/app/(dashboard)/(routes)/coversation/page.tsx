"use client";


import * as z from "zod";
import { Heading } from "@/components/heading";
import { MessageSquare } from "lucide-react";
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
import { ChatCompletionRequestMessage } from "openai";

const CoversationPage = () => {
    const router = useRouter();
    const [messages , setMessages] = useState<ChatCompletionRequestMessage[]> 52;29

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ""
        }
    });

const isLoading = form.formState.isSubmitting;

const onSubmit = async (values : z.infer<typeof formSchema>) => {
    try{

    } catch (error : any){
        console.log(error);
    }finally{
        router.refresh();
    }
};


    return (
        <div>
            <Heading
                title="Conversation"
                description="Our Most Advance Convaersation model"
                icon={MessageSquare}
                iconColor="text-violet-500"
                bgColor="bg-violet-500/10" />
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
                                                 placeholder="How do I Calculate the power of Thanos?"
                                                {...field}/>
                                    </FormControl>
                                </FormItem>
                             )} />
                             <Button className="col-span-12 lg:col-span-2 w-full" disabled={isLoading}>
                                Generate
                             </Button>
                        </form>
                    </Form>
                    <div className="space-y-4 mt-4">
                        Messages Content
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CoversationPage;