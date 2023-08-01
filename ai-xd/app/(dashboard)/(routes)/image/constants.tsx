import * as z from "zod";

export const formSchema = z.object({
    prompt: z.string().min(1 , {
        message:"Image Prompt is Required"
    }),
    amount:z.string().min(1),
    resolution:z.string().min(1)
});

export const amountOptions = [
    {
      value:"1",
      lable:"1 Photo",
    },
    {
       value:"2",
       lable:"2 Photo",
    },
    {
        value:"3",
        lable:"3 Photo",
    },
    {
          value:"4",
        lable:"4 Photo",
    }, 
    {
        value:"5",
        lable:"5 Photo",
    },
];