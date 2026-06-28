import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { LogEvent } from "@/types";

const logsFilePath = path.join(process.cwd(), "data", "logs.json");

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ message: "userId est requis" }, { status: 400 });
    }

    if (!fs.existsSync(logsFilePath)) {
      return NextResponse.json([]);
    }

    const fileContent = fs.readFileSync(logsFilePath, "utf8");
    const logs: LogEvent[] = JSON.parse(fileContent);

    const userLogs = logs
      .filter((log) => log.userId === userId)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    return NextResponse.json(userLogs);
  } catch (error) {
    console.error("Erreur GET /api/logs:", error);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    // Guard against empty or malformed bodies
    const contentType = request.headers.get("content-type") ?? "";
    if (!contentType.includes("application/json")) {
      return NextResponse.json({ message: "Content-Type doit être application/json" }, { status: 400 });
    }

    let body: Record<string, unknown>;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ message: "Corps de requête JSON invalide ou vide" }, { status: 400 });
    }

    const { userId, eventType, description, metadata } = body as {
      userId?: string;
      eventType?: string;
      description?: string;
      metadata?: Record<string, unknown>;
    };

    if (!userId || !eventType || !description) {
      return NextResponse.json({ message: "Champs requis manquants (userId, eventType, description)" }, { status: 400 });
    }

    const newLog: LogEvent = {
      id: `log_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      userId,
      eventType: eventType as LogEvent["eventType"],
      description,
      metadata,
      ipAddress: request.headers.get("x-forwarded-for") || "127.0.0.1",
      timestamp: new Date().toISOString(),
    };

    let logs: LogEvent[] = [];
    if (fs.existsSync(logsFilePath)) {
      const fileContent = fs.readFileSync(logsFilePath, "utf8");
      logs = JSON.parse(fileContent);
    }

    logs.push(newLog);
    fs.writeFileSync(logsFilePath, JSON.stringify(logs, null, 2));

    return NextResponse.json({ message: "Log enregistré avec succès", log: newLog }, { status: 201 });
  } catch (error) {
    console.error("Erreur POST /api/logs:", error);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}

