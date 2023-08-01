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
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";
import { cn } from "@/lib/utils";
import { UserAvatar } from "@/components/user-avatar";
import { BotAvatar } from "@/components/bot-avatar";
import { Select, SelectItem } from "@/components/ui/select";
import { SelectContent, SelectTrigger, SelectValue } from "@radix-ui/react-select";
import { amountOptions , formSchema , resolutionOptions } from "./constants";

const ImagePage = () => {
    const router = useRouter();
    const [images ,setImages] =useState<string[]>([]);
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: "",
            amount:"1",
            resolution:"512x512"
        };
    });

const isLoading = form.formState.isSubmitting;

const onSubmit = async (values : z.infer<typeof formSchema>) => {
    try{
        setImages([];)
         const response = await axios.post("/api/image" , values);
        };

        const urls = response.data.map((image:{url:string} )=> image.url);
       setImages{urls};
        form.reset();
    } catch (error : any){
        //To-Do:Open Pro Model
        console.log(error);
    }finally{
        router.refresh();
    }
};


    return (
        <div>
            <Heading
                title="Image Generation"
                description="Turn Your Prompt Into Image"
                icon={MessageSquare}
                iconColor="text-pink-700"
                bgColor="bg-pink-700/10" />
            <div className="px-4 lg:px-8">
                <div>
                    <Form {...form}>
                        <form
                        onSubmit={Form.handleSubmit(onSubmit)}
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
                                <FormItem className="col-span-12 lg:col-span-6">
                                    <FormControl className="m-0 p-0">
                                     <Input
                                            className="border-0 outline-none
                                                        focus-visible:ring-0
                                                         focus-visible:ring-transparant" 
                                                             disabled={isLoading}
                                                 placeholder="A picture Of an future AI"
                                                {...field}/>
                                    </FormControl>
                                </FormItem>
                             )} />
                             <FormField
                             control = {form.control}
                             name="amount"
                             render={({field}) =>(
                                <FormItem className="col-span-12 lg:col-span-2">
                                    <Select 
                                    disabled={isLoading}
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue defaultValue={field.value}/>
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {amountOptions.map((option)=> {
                                                <SelectItem
                                                key={option.value}
                                                value={option.value}>
                                                    {option.label}
                                                </SelectItem>
                                            })}
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                             )}/>
                                <FormField
                             control = {form.control}
                             name="resulations"
                             render={({field}) =>(
                                <FormItem className="col-span-12 lg:col-span-2">
                                    <Select 
                                    disabled={isLoading}
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue defaultValue={field.value}/>
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {amountOptions.map((option)=> {
                                                <SelectItem
                                                key={option.value}
                                                value={option.value}>
                                                    {option.label}
                                                </SelectItem>
                                            })}
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                             )}/>
                             <Button className="col-span-12 lg:col-span-2 w-full" disabled={isLoading}>
                                Generate
                             </Button>
                        </form>
                    </Form>
                    <div className="space-y-4 mt-4">
                        {isLoading && (
                            <div className="p-20">
                                <Loader/>
                                </div>
                        )}
                        {images.length === 0 && !isLoading &&(
                            <Empty label="No Image Generated"/>
                        )}
                        <div
                        Image Will be rendered here >

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImagePage;