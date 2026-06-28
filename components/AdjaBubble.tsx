"use client";

import { useState, useRef, useEffect } from "react";
import { Bot, Send, Sparkles, X, MessageCircle } from "lucide-react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function AdjaBubble() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  // Focus input when panel opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const payload = { messageHistory: [...messages, userMsg] };
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => null);
        const serverMessage =
          err?.reply || err?.error || err?.message || "Erreur serveur";
        setError(
          typeof serverMessage === "string"
            ? serverMessage
            : JSON.stringify(serverMessage)
        );
        setLoading(false);
        return;
      }

      const data = await response.json();
      const reply = data.reply ?? "";
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setError("Le service d'IA est indisponible. Veuillez réessayer plus tard.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ─── Floating Bubble Button ─── */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="adja-bubble-btn"
        aria-label={isOpen ? "Fermer l'assistant" : "Ouvrir l'assistant Adja"}
      >
        <span className="adja-bubble-icon">
          {isOpen ? (
            <X className="h-6 w-6 text-white" />
          ) : (
            <MessageCircle className="h-6 w-6 text-white" />
          )}
        </span>
        {/* Online indicator dot */}
        {!isOpen && <span className="adja-bubble-dot" />}
      </button>

      {/* ─── Chat Panel ─── */}
      <div className={`adja-panel ${isOpen ? "adja-panel--open" : ""}`}>
        {/* Header */}
        <header className="adja-panel-header">
          <div className="adja-panel-header-left">
            <div className="adja-avatar">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="adja-panel-title">Adja</h2>
              <p className="adja-panel-subtitle">Assistant IA BusinessCore</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="adja-panel-close"
            aria-label="Fermer"
          >
            <X className="h-4 w-4" />
          </button>
        </header>

        {/* Messages */}
        <div className="adja-messages" ref={scrollRef}>
          {messages.length === 0 && !loading && (
            <div className="adja-empty">
              <div className="adja-empty-icon">
                <Sparkles className="h-8 w-8 text-blue-400" />
              </div>
              <p className="adja-empty-title">Bienvenue 👋</p>
              <p className="adja-empty-subtitle">
                Je suis Adja, votre assistant IA. Posez-moi une question sur la fintech, l&apos;entrepreneuriat ou les carrières !
              </p>
            </div>
          )}

          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`adja-msg ${msg.role === "user" ? "adja-msg--user" : "adja-msg--assistant"}`}
            >
              {msg.role === "assistant" && (
                <div className="adja-msg-avatar">
                  <Sparkles className="h-3.5 w-3.5 text-blue-600" />
                </div>
              )}
              <div
                className={`adja-msg-bubble ${
                  msg.role === "user"
                    ? "adja-msg-bubble--user"
                    : "adja-msg-bubble--assistant"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {loading && (
            <div className="adja-msg adja-msg--assistant">
              <div className="adja-msg-avatar">
                <Sparkles className="h-3.5 w-3.5 text-blue-600 animate-pulse" />
              </div>
              <div className="adja-msg-bubble adja-msg-bubble--assistant">
                <span className="adja-typing">
                  <span className="adja-typing-dot" />
                  <span className="adja-typing-dot" />
                  <span className="adja-typing-dot" />
                </span>
              </div>
            </div>
          )}

          {error && <p className="adja-error">{error}</p>}
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="adja-input-bar">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Posez votre question…"
            className="adja-input"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="adja-send-btn"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </>
  );
}
