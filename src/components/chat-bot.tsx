"use client";

import { useState, useRef, useEffect, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Send,
  Sparkles,
  Bot,
  RotateCcw,
  ExternalLink,
  Download,
  ChevronRight,
  Minimize2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  getBotResponse,
  INITIAL_SUGGESTIONS,
  type ChatAction,
} from "@/lib/portfolio-knowledge";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: string;
  actions?: ChatAction[];
  suggestions?: string[];
}

const WELCOME_MESSAGE: Message = {
  id: "welcome",
  sender: "bot",
  text: "Hello! 👋 I'm **Omkar's Portfolio Assistant**.\n\nAsk me anything about his software engineering projects, Generative AI video pipelines, work experience, tech stack, or download his resumes!",
  timestamp: "Just now",
  suggestions: INITIAL_SUGGESTIONS,
};

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const messageCounter = useRef(0);

  // Auto-scroll to bottom of chat when new message arrives or bot is typing
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping, isOpen]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Auto-hide tooltip after 12 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 12000);
    return () => clearTimeout(timer);
  }, []);

  const toggleChat = () => {
    setIsOpen((prev) => {
      const next = !prev;
      if (next) setShowTooltip(false);
      return next;
    });
  };

  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend ?? input).trim();
    if (!query || isTyping) return;

    messageCounter.current += 1;
    const currentCount = messageCounter.current;
    const nowTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const userMessage: Message = {
      id: `user-${currentCount}`,
      sender: "user",
      text: query,
      timestamp: nowTime,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Realistic typing delay (450ms)
    setTimeout(() => {
      const response = getBotResponse(query);
      const botMessage: Message = {
        id: `bot-${currentCount}`,
        sender: "bot",
        text: response.text,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        actions: response.actions,
        suggestions: response.suggestions,
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 450);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSendMessage();
  };

  const handleRestart = () => {
    messageCounter.current += 1;
    setMessages([
      {
        ...WELCOME_MESSAGE,
        id: `welcome-${messageCounter.current}`,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
  };

  const handleActionClick = (action: ChatAction) => {
    if (action.action === "scroll" && action.href) {
      const targetId = action.href.replace("#", "");
      const elem = document.getElementById(targetId);
      if (elem) {
        elem.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      {/* Floating Chat Trigger Button */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        {/* Floating Greeting Pill */}
        <AnimatePresence>
          {showTooltip && !isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              onClick={toggleChat}
              className="mb-3 cursor-pointer group flex items-center gap-2.5 px-4 py-2 rounded-full bg-background/95 backdrop-blur-xl border border-primary/20 shadow-lg shadow-primary/10 text-xs font-semibold text-foreground hover:border-primary/40 transition-all duration-200"
            >
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              <span>Ask Omkar&apos;s AI Assistant</span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowTooltip(false);
                }}
                className="text-muted-foreground hover:text-foreground ml-1 p-0.5"
                aria-label="Dismiss tooltip"
              >
                <X className="w-3 h-3" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Circular Trigger Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleChat}
          className={cn(
            "relative flex items-center justify-center w-14 h-14 rounded-full shadow-xl transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50",
            isOpen
              ? "bg-muted text-foreground border border-border shadow-md"
              : "bg-gradient-to-tr from-primary via-blue-600 to-cyan-500 text-white shadow-primary/30 hover:shadow-primary/50 hover:shadow-2xl"
          )}
          aria-label={isOpen ? "Close Chat Assistant" : "Open Chat Assistant"}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <X className="w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div
                key="chat"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="relative"
              >
                <Bot className="w-6 h-6" />
                {/* Active indicator dot */}
                <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400 border-2 border-primary" />
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Floating Chat Modal / Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-22 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[410px] max-h-[82vh] h-[580px] bg-background/95 backdrop-blur-2xl border border-border/80 rounded-3xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-border/60 bg-muted/40 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative w-9 h-9 rounded-full bg-gradient-to-tr from-primary to-cyan-500 flex items-center justify-center text-white shadow-sm shrink-0">
                  <Bot className="w-5 h-5" />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-background" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-heading font-bold text-sm text-foreground">
                      Omkar&apos;s AI Assistant
                    </h3>
                    <Badge
                      variant="outline"
                      className="text-[10px] py-0 px-1.5 font-mono text-emerald-600 dark:text-emerald-400 border-emerald-500/30 bg-emerald-500/10"
                    >
                      Instant
                    </Badge>
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    Ask anything about projects, skills &amp; resume
                  </p>
                </div>
              </div>

              {/* Header Action Buttons */}
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleRestart}
                  className="h-8 w-8 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted"
                  title="Restart conversation"
                  aria-label="Restart conversation"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted"
                  title="Minimize chat"
                  aria-label="Minimize chat"
                >
                  <Minimize2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    "flex flex-col gap-1.5 max-w-[88%]",
                    msg.sender === "user"
                      ? "ml-auto items-end"
                      : "mr-auto items-start"
                  )}
                >
                  <div
                    className={cn(
                      "px-4 py-3 rounded-2xl text-xs sm:text-sm whitespace-pre-wrap leading-relaxed",
                      msg.sender === "user"
                        ? "bg-primary text-primary-foreground rounded-br-xs shadow-sm"
                        : "bg-muted/80 text-foreground border border-border/60 rounded-bl-xs"
                    )}
                  >
                    {msg.text}
                  </div>

                  {/* Action Buttons inside Bot Message */}
                  {msg.actions && msg.actions.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-1 w-full">
                      {msg.actions.map((act) => {
                        if (act.action === "scroll" && act.href) {
                          return (
                            <button
                              key={act.label}
                              onClick={() => handleActionClick(act)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-background border border-border hover:border-primary/50 hover:bg-muted text-foreground transition-all cursor-pointer shadow-xs"
                            >
                              <span>{act.label}</span>
                              <ChevronRight className="w-3 h-3 text-primary" />
                            </button>
                          );
                        }

                        if (act.action === "link" && act.href) {
                          return (
                            <a
                              key={act.label}
                              href={act.href}
                              target={act.download ? undefined : "_blank"}
                              rel={act.download ? undefined : "noopener noreferrer"}
                              download={act.download}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-primary/10 border border-primary/20 hover:bg-primary/20 text-primary transition-all cursor-pointer shadow-xs"
                            >
                              {act.download ? (
                                <Download className="w-3 h-3" />
                              ) : (
                                <ExternalLink className="w-3 h-3" />
                              )}
                              <span>{act.label}</span>
                            </a>
                          );
                        }

                        return null;
                      })}
                    </div>
                  )}

                  {/* Suggestion Chips underneath Bot Message */}
                  {msg.suggestions && msg.suggestions.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {msg.suggestions.map((sug) => (
                        <button
                          key={sug}
                          onClick={() => handleSendMessage(sug)}
                          className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-background border border-border/80 hover:border-primary hover:text-primary transition-colors text-muted-foreground cursor-pointer shadow-xs"
                        >
                          {sug}
                        </button>
                      ))}
                    </div>
                  )}

                  <span className="text-[10px] text-muted-foreground/70 px-1">
                    {msg.timestamp}
                  </span>
                </div>
              ))}

              {/* Bot Typing Indicator */}
              {isTyping && (
                <div className="flex items-center gap-1.5 px-4 py-3 rounded-2xl bg-muted/80 border border-border/60 text-muted-foreground w-18 rounded-bl-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" />
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Form & Footer */}
            <div className="p-3 border-t border-border/60 bg-muted/20 shrink-0">
              <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about projects, skills, resume..."
                  className="flex-1 bg-background border border-border/80 rounded-full px-4 py-2.5 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                  disabled={isTyping}
                />
                <Button
                  type="submit"
                  size="icon"
                  disabled={!input.trim() || isTyping}
                  className="rounded-full w-10 h-10 shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-40 cursor-pointer shadow-sm"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </form>
              <div className="flex items-center justify-between px-2 pt-2">
                <p className="text-[10px] text-muted-foreground">
                  Instant response · Powered by Portfolio Engine
                </p>
                <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                  <Sparkles className="w-3 h-3 text-primary" />
                  <span>Omkar AI</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

