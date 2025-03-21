"use client";

import { useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { useState } from "react";
import { Textarea } from "./ui/textarea";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const askAI = useAction(api.askAI.askAI);

 const handleAsk = async () => {
   if (!question) return; // Don't proceed if the question is empty
   setLoading(true);
   setResponse(""); // Clear previous response

   try {
     const answer = await askAI({ question });
     // Ensure the response is always a string
     setResponse(
       answer || "Sorry, I couldn't generate a response. Please try again."
     );
   } catch (error) {
     console.error("Error fetching response:", error);
     setResponse("Sorry, something went wrong. Please try again.");
   } finally {
     setLoading(false); // Reset loading state
   }
 };

  return (
    <div className='w-full fixed bottom-6 right-6 flex flex-col items-end'>
      {/* Floating Chat Avatar */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className='bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition duration-300'>
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </motion.button>

      {/* Chat Box */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className='bg-white shadow-xl rounded-xl p-4 w-full max-w-[320px] sm:max-w-[450px] md:max-w-[520px] mt-3 border border-gray-200'>
          <h2 className='text-lg font-semibold mb-2'>Ask Me Anything</h2>
          <Card className='p-2 space-y-2'>
            <Textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder='Ask about admissions, programs...'
              className='w-full h-32 resize-none p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            <Button
              className='w-full'
              onClick={handleAsk}
              disabled={loading || !question.trim()}>
              {loading ? "Thinking..." : "Send"}
            </Button>
          </Card>
          {response && (
            <Card className='p-2 mt-2 bg-gray-100'>
              <CardContent>{response}</CardContent>
            </Card>
          )}
        </motion.div>
      )}
    </div>
  );
}
