// components/ChatBot.tsx
"use client";
import { useChat } from "ai/react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bot, X, Loader2, Send } from "lucide-react";

export default function ChatBot() {
  const { messages, input, handleInputChange, handleSubmit, isLoading,  } =
    useChat({
      api: "/api/chat",
    });

  return (
    <div className='fixed bottom-4 right-4 z-50'>
      <Card className='w-[350px] shadow-xl'>
        <CardHeader className='flex flex-row items-center justify-between pb-2'>
          <div className='flex items-center gap-2'>
            <Bot className='h-6 w-6 text-primary' />
            <h3 className='font-semibold'>GO Uni Assistant</h3>
          </div>
          <Button variant='ghost' size='sm'>
            <X className='h-4 w-4' />
          </Button>
        </CardHeader>

        <CardContent className='h-[400px] overflow-y-auto space-y-4'>
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex gap-3 ${
                m.role === "user" ? "justify-end" : ""
              }`}>
              {m.role !== "user" && (
                <Avatar className='h-8 w-8'>
                  <AvatarImage src='/bot-avatar.png' />
                  <AvatarFallback>AI</AvatarFallback>
                </Avatar>
              )}
              <div
                className={`p-3 rounded-lg ${
                  m.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}>
                <p className='text-sm'>{m.content}</p>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className='flex items-center gap-2 text-muted-foreground'>
              <Loader2 className='h-4 w-4 animate-spin' />
              <p>Thinking...</p>
            </div>
          )}
        </CardContent>

        <CardFooter>
          <form onSubmit={handleSubmit} className='flex w-full gap-2'>
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder='Ask about admissions, programs, etc...'
              className='flex-1'
            />
            <Button type='submit' disabled={isLoading}>
              <Send className='h-4 w-4' />
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
