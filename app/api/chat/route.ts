
// import { OpenAI } from "@ai-sdk/openai";
// import { streamText } from "ai";
// import { StreamingTextResponse } from "ai";



// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY!,
// });

// export async function POST(req: Request) {

//     const { messages } = await req.json();

   

//     const result = await streamText({
//       model: openai.chat("gpt-3.5-turbo"),
  
//       messages: [
//         {
//           role: "system",
//           content: `You are a helpful assistant for Godfrey Okoye University. 
//         Provide accurate information about:
//         - Postgraduate programs (Masters, PhD, Certificates)
//         - Admission requirements
//         - Application deadlines
//         - Research opportunities
//         - Student resources
        
//         If unsure, direct users to the official website or contact:
//         pg.admissions@gouni.edu.ng`,
//         },
//         ...messages,
//       ],
//     });

//     return new StreamingTextResponse(result.toAIStream());

// }
