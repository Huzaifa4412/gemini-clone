"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Bot, Send, Sparkles } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useChats } from "@/context/chatsContext";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: string;
}

export default function ChatInterface() {
  const { chat, setChat } = useChats();
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [input, setInput] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const chatEndRef = React.useRef<HTMLDivElement>(null);

  // Scroll to bottom when new messages arrive
  React.useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Simulate API call

  const fetchAIResponse = async (userMessage: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const genAI = new GoogleGenerativeAI(
        "AIzaSyBC0L5FSbMbJFr3hKFJJTIbZzI8evgnUtU"
      );
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(userMessage);
      const text = result.response.text();

      // Simulate AI response
      const aiResponse: Message = {
        id: Date.now().toString(),
        content: text,
        role: "assistant",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, aiResponse]);
    } catch (error) {
      console.error("Error:", error);
      // setResponse("Error fetching response.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setChat([...chat, { chat: [input] }]);

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    await fetchAIResponse(input);
  };

  return (
    <div className="flex min-h-screen !w-full flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 backdrop-blur-xl bg-white/80 px-4 py-3 border-b border-slate-200/80">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-200">
            <Sparkles className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-slate-800">Gemini</h1>
            <p className="text-xs text-slate-500">Powered by Huzaifa Mukhar</p>
          </div>
        </div>
      </header>

      {/* Chat Container */}
      <div className="flex-1 overflow-auto p-4 scroll-smooth">
        <div className="mx-auto max-w-3xl space-y-6">
          {/* Welcome Message */}
          <Card className="border-0 bg-white/50 backdrop-blur-sm p-4 shadow-sm transition-all hover:shadow-md">
            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
                <Bot className="h-5 w-5" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-slate-700">
                    Gemini
                  </span>
                  <span className="text-xs text-slate-400">
                    {new Date().toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-slate-600">
                  Hi, I&apos;m Gemini. I`&apos;m an AI that can help you with
                  various tasks like writing, analysis, math, and coding. What
                  would you like to explore?
                </p>
              </div>
            </div>
          </Card>

          {/* Chat Messages */}
          {messages.map((message) => (
            <Card
              key={message.id}
              className={`border-0 ${
                message.role === "user" ? "ml-12 bg-blue-50/50" : "bg-white/50"
              } backdrop-blur-sm p-4 shadow-sm transition-all hover:shadow-md`}
            >
              <div className="flex gap-4">
                {message.role === "assistant" && (
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
                    <Bot className="h-5 w-5" />
                  </div>
                )}
                <div className="space-y-2 flex-1">
                  <div
                    className={`flex items-center gap-2 ${
                      message.role === "user" ? "justify-end" : ""
                    }`}
                  >
                    <span className="text-xs text-slate-400">
                      {message.timestamp}
                    </span>
                    <span className="text-sm font-medium text-slate-700">
                      {message.role === "user" ? "You" : "Gemini"}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-slate-600">
                    {message.content}
                  </p>
                </div>
              </div>
            </Card>
          ))}

          {/* Loading State */}
          {isLoading && (
            <Card className="border-0 bg-white/50 backdrop-blur-sm p-4 shadow-sm">
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
                  <Bot className="h-5 w-5" />
                </div>
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-[100px]" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[90%]" />
                    <Skeleton className="h-4 w-[80%]" />
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Error Message */}
          {error && (
            <Card className="border-0 bg-red-50/50 backdrop-blur-sm p-4 shadow-sm">
              <p className="text-sm text-red-600">{error}</p>
            </Card>
          )}

          {/* Scroll to bottom anchor */}
          <div ref={chatEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="sticky bottom-0 border-t border-slate-200/80 bg-white/80 backdrop-blur-xl p-4">
        <div className="mx-auto max-w-3xl">
          <form
            onSubmit={handleSubmit}
            className="relative transition-all duration-200 ease-in-out"
          >
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Message Gemini..."
              className="min-h-[60px] max-h-[200px] resize-none overflow-hidden rounded-2xl pe-12 pr-16 shadow-sm focus:ring-2 focus:ring-blue-500 border-slate-200 transition-all duration-200"
            />
            <Button
              type="submit"
              size="icon"
              disabled={isLoading || !input.trim()}
              className="absolute bottom-2 right-2 h-8 w-8 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="h-4 w-4" />
              <span className="sr-only">Send message</span>
            </Button>
          </form>
          <p className="mt-2 text-center text-xs text-slate-500">
            Gemini may display inaccurate info, including about people, places,
            or facts.
          </p>
        </div>
      </div>
    </div>
  );
}
