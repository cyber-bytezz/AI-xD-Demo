import { Configuration , OpenAIApi } from "openai";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import { incrementApiLimit, checkApiLimit } from "@/lib/api-limit";
const configuration = new Configuration({
    apiKey:process.env.OPEN_API_KEY
});

const openai = new OpenAIApi(configuration);

export async function POST(
    req:Request
) {
    try { 
        const { userId } = auth();
        const body = await req.json();
        const { prompt , amount = 1, resolution="512x512"} = body;

        if (!userId) {
            return new NextResponse("Unauthorized" , {status : 401});
        }

        if (!configuration.apiKey) {
            return new NextResponse ("Open API KEy Not Configured", {status : 500});
        }

        if (!prompt) {
            return new NextResponse("Prompt Is required" , {status : 400});
        }
        if (!amount) {
            return new NextResponse("Amount Is required" , {status : 400});
        }
        if (!resolution) {
            return new NextResponse("Resolution Is required" , {status : 400});
        }

        
        const freeTrial = await checkApiLimit();

        if(!freeTrial){
            return new NextResponse("Free Trial Has expired") , {status:403}
        }

        const reponse = await openai.createImage({
            prompt,
            n:parseInt(amount ,10),
            size:resolution,
        });

        await incrementApiLimit();

        return NextResponse.json(reponse.data.data);

    } catch (error) {
        console.log("[IMAGE_ERROR]", error);
        return new NextResponse("Internal error",{ status:500});
    }
}