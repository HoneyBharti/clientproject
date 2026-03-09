"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useEffect, useRef } from "react";
import { Bot, Send, User, Loader2 } from "lucide-react";
import { askQuestion, type ChatState } from "@/app/actions";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const initialMessages = [
    {
      role: 'assistant' as const,
      content: 'Hello! I am LegalEase AI. How can I help you with your basic legal questions today? Please remember, I am not a substitute for a lawyer.',
      id: 'initial-message',
    },
];

const initialState: ChatState = {
  messages: initialMessages,
  loading: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="icon" disabled={pending}>
      {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
      <span className="sr-only">Send</span>
    </Button>
  );
}

export function ChatAssistant() {
  const [state, formAction] = useFormState(askQuestion, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [state.messages]);

  const handleFormAction = (formData: FormData) => {
    formAction(formData);
    formRef.current?.reset();
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex flex-row items-center gap-2">
        <Bot className="h-6 w-6 text-primary" />
        <CardTitle>Legal Assistant</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden">
        <ScrollArea className="h-[55vh] pr-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {state.messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex gap-3 text-sm",
                  message.role === "user" && "justify-end"
                )}
              >
                {message.role === "assistant" && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback><Bot size={20} /></AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={cn(
                    "rounded-lg px-3 py-2",
                    message.role === "assistant"
                      ? "bg-muted"
                      : "bg-primary text-primary-foreground"
                  )}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                </div>
                {message.role === "user" && (
                  <Avatar className="h-8 w-8">
                     <AvatarFallback><User size={20}/></AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            {state.loading && (
                <div className="flex gap-3 text-sm">
                    <Avatar className="h-8 w-8">
                        <AvatarFallback><Bot size={20} /></AvatarFallback>
                    </Avatar>
                    <div className="rounded-lg px-3 py-2 bg-muted flex items-center">
                        <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                    </div>
                </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <form
          ref={formRef}
          action={handleFormAction}
          className="flex w-full items-center space-x-2"
        >
          <Input
            id="question"
            name="question"
            placeholder="Type your legal question..."
            className="flex-1"
            autoComplete="off"
            disabled={state.loading}
          />
          <SubmitButton />
          {state.error && <p className="text-sm text-destructive">{state.error}</p>}
        </form>
      </CardFooter>
    </Card>
  );
}
