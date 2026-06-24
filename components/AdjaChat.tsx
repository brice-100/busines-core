"use client";

import { useState } from "react";
import { Bot, Send, Sparkles } from "lucide-react";

// Strict message type
type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function AdjaChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    loading || setLoading(true);
    setError(null);

    try {
      // 1. Alignement de la clé du payload attendue par l'API (messageHistory)
      const payload = { messageHistory: [...messages, userMsg] };
      
      // 2. Redirection vers la nouvelle route globale /api/chat
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => null);
        console.error("Adja API error", err);
        // Intercepte .reply pour capter nos messages d'erreur personnalisés de l'API
        const serverMessage = err?.reply || err?.error || err?.message || "Erreur serveur";
        setError(typeof serverMessage === "string" ? serverMessage : JSON.stringify(serverMessage));
        setLoading(false);
        return;
      }

      const data = await response.json();
      const reply = data.reply ?? "";
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (err) {
      console.error(err);
      setError("Le service d’IA est indisponible. Veuillez réessayer plus tard.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto my-12 p-8 bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-100">
      <header className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-primary-100 rounded-full">
          <Bot className="h-6 w-6 text-primary-600" />
        </div>
        <h1 className="text-2xl font-display font-bold text-primary-800">Adja – Assistant IA</h1>
      </header>

      <section className="flex flex-col gap-4 h-80 overflow-y-auto p-4 bg-gradient-to-b from-gray-50 to-gray-100 rounded-xl mb-6">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === "assistant" ? "justify-start" : "justify-end"}`}>
            {msg.role === "assistant" && (
              <div className="mr-2 flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-primary-200">
                <Sparkles className="h-4 w-4 text-primary-600" />
              </div>
            )}
            <div
              className={`max-w-xs px-4 py-2 rounded-xl text-sm leading-relaxed ${
                msg.role === "assistant" ? "bg-primary-100 text-primary-900" : "bg-primary-600 text-white"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary-200 flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-primary-600 animate-pulse" />
            </div>
            <span className="text-gray-600 animate-pulse">Génération en cours…</span>
          </div>
        )}

        {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
      </section>

      <form onSubmit={handleSubmit} className="flex gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Posez votre question…"
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
        >
          <Send className="h-4 w-4" />
          Envoyer
        </button>
      </form>
    </div>
  );
}