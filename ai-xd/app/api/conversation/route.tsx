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
        const { messages } = body;

        if (!userId) {
            return new NextResponse("Unauthorized" , {status : 401});
        }

        if (!configuration.apiKey) {
            return new NextResponse ("Open API KEy Not Configured", {status : 500});
        }

        if (!messages) {
            return new NextResponse("Message are required" , {status : 400});
        }

        const freeTrial = await checkApiLimit();

        if(!freeTrial){
            return new NextResponse("Free Trial Has expired") , {status:403}
        }

        const reponse = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages
        });

        await incrementApiLimit();

        return NextResponse.json(reponse.data.choices[0].message);

    } catch (error) {
        console.log("[CONVERSATION_ERROR]", error);
        return new NextResponse("Internal error",{ status:500});
    }
}