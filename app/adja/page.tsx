"use client";

import React, { useState } from "react";
import { Bot, Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

const MOCK_RESPONSES: Record<string, string> = {
  default: "Bonjour ! Je suis Adja, votre assistante IA en fintech. Comment puis-je vous aider ?",
  fintech: "La fintech désigne les entreprises qui utilisent la technologie pour innover dans les services financiers : paiement mobile, crédit en ligne, blockchain...",
  bitcoin: "Le Bitcoin est la première cryptomonnaie décentralisée, créée en 2009 par Satoshi Nakamoto.",
  blockchain: "La blockchain est un registre distribué et immuable garantissant la transparence et la sécurité des transactions.",
};

export default function AdjaPage() {
  const [messages, setMessages] = useState([
    { role: "assistant" as const, content: MOCK_RESPONSES.default },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setInput("");
    setMessages((m) => [...m, { role: "user" as const, content: userMsg }]);
    setIsTyping(true);
    await new Promise((r) => setTimeout(r, 1200));
    const lower = userMsg.toLowerCase();
    const key = Object.keys(MOCK_RESPONSES).find((k) => k !== "default" && lower.includes(k));
    const response = MOCK_RESPONSES[key ?? "default"];
    setIsTyping(false);
    setMessages((m) => [...m, { role: "assistant" as const, content: response }]);
  };

  return (
    <div className="px-6 py-10 lg:px-12">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-10 w-10 rounded-xl bg-primary-50 text-primary flex items-center justify-center">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-3xl font-display font-bold text-secondary">Adja IA</h1>
            <p className="text-xs text-gray-400 flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-green" />
              En ligne — simulation
            </p>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden">
          <div className="h-96 overflow-y-auto p-4 space-y-4 bg-surface">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                {msg.role === "assistant" && (
                  <div className="h-7 w-7 rounded-full bg-primary flex items-center justify-center mr-2 flex-shrink-0 mt-1">
                    <Sparkles className="h-3.5 w-3.5 text-white" />
                  </div>
                )}
                <div className={`max-w-xs px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${msg.role === "user" ? "bg-primary text-white" : "bg-white border border-gray-100 text-secondary shadow-sm"}`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-full bg-primary flex items-center justify-center">
                  <Sparkles className="h-3.5 w-3.5 text-white" />
                </div>
                <div className="bg-white border border-gray-100 rounded-2xl px-4 py-2.5 shadow-sm">
                  <div className="flex gap-1">
                    {[0, 1, 2].map((j) => (
                      <span key={j} className="h-2 w-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: `${j * 150}ms` }} />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="p-4 border-t border-gray-100 bg-white flex gap-2">
            <Input placeholder="Posez votre question…" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendMessage()} fullWidth />
            <Button variant="primary" onClick={sendMessage}><Send className="h-4 w-4" /></Button>
          </div>
        </div>
        <p className="mt-4 text-center text-xs text-gray-400">Essayez : &quot;fintech&quot;, &quot;bitcoin&quot;, &quot;blockchain&quot;</p>
      </div>
    </div>
  );
}
