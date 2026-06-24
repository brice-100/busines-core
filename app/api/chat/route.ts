import { NextResponse } from "next/server";
import OpenAI from "openai";

const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export async function POST(req: Request) {
  try {
    const { messageHistory } = await req.json();
    
    if (!messageHistory || messageHistory.length === 0) {
      return NextResponse.json({ reply: "Historique vide." }, { status: 400 });
    }

    // Consigne système globale combinant le contexte de ton projet et ton expertise académique
    const systemInstruction = `
      Tu es l'Assistant IA officiel de la plateforme "Business Core", une application axée sur la fintech, l'entrepreneuriat et l'orientation.
      Ce projet est développé à l'École Nationale Supérieure Polytechnique de Yaoundé (ENSPY).

      Règles à suivre :
      1. Rôle : Tu guides les utilisateurs et réponds avec précision sur l'écosystème tech, l'entrepreneuriat et l'inclusion financière (tontines numériques, Mobile Money, leapfrogging, blockchain).
      2. Style : Reste concis (3 à 4 sentences maximum par réponse), clair, pédagogique et hautement professionnel.
      3. Mémoire : Utilise le contexte des messages précédents pour répondre aux pronoms ("ses avantages", "ce mécanisme", etc.).
    `;

    // Transformation de ton tableau frontend vers le format rigide de l'API OpenAI/Groq
    const formattedMessages = messageHistory.map((msg: { role: string; content: string }) => ({
      role: msg.role === "assistant" ? "assistant" : "user",
      content: msg.content,
    }));

    console.log(`🦙 Requête optimisée reçue. Analyse de l'historique (${formattedMessages.length} messages)...`);

    // Utilisation du modèle Llama 3.1 ultra-rapide
    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant", 
      messages: [
        { role: "system", content: systemInstruction },
        ...formattedMessages // On injecte l'historique complet pour que "ses avantages" fonctionne !
      ],
      temperature: 0.6, // Légèrement baissée pour des réponses plus stables et précises
    });

    const responseText = completion.choices[0].message.content;
    return NextResponse.json({ reply: responseText });

  } catch (error: any) {
    console.error("💥 Erreur avec l'API Groq :", error);
    return NextResponse.json(
      { reply: "Une petite perturbation technique est survenue sur le serveur." }, 
      { status: 500 }
    );
  }
}