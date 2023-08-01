import { ChatCompletionRequestMessage, Configuration , OpenAIApi } from "openai";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";


const configuration = new Configuration({
    apiKey:process.env.OPEN_API_KEY
});

const openai = new OpenAIApi(configuration);

const instructionMessage: ChatCompletionRequestMessage = {
    role:"system",
    content: "You are a code generator . You Must answer only in markdown code snippets.Use code comments for explanations"
}

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

        const reponse = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages : [instructionMessage, ...messages]
        });

        return NextResponse.json(reponse.data.choices[0].message);

    } catch (error) {
        console.log("[CODE_ERROR]", error);
        return new NextResponse("Internal error",{ status:500});
    }
}