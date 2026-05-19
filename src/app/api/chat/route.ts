import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { streamText } from "ai";
import { NextResponse } from "next/server";
import { KNOWLEDGE_BASE } from "./context";

export const maxDuration = 30;

/* ─── INSTRUÇÕES DO SISTEMA ───────────────────────── */
const SYSTEM_PROMPT = `
Você é o assistente virtual de inteligência artificial do portfólio de Victor Rocha.
Sua missão é responder a perguntas sobre o Victor, sua carreira, habilidades, projetos e interesses, baseando-se ESTRITAMENTE na Base de Conhecimento fornecida abaixo.

🔥 REGRAS DE IDIOMA (CRÍTICO):
- OBRIGATÓRIO: Identifique o idioma em que o usuário fez a pergunta.
- Se a pergunta for em Inglês, você DEVE responder 100% em Inglês. Traduza mentalmente os dados da base de conhecimento antes de responder.
- Se a pergunta for em Português, responda 100% em Português.
- NUNCA misture idiomas na mesma resposta.

REGRAS DE COMPORTAMENTO CRÍTICAS:
1. Responda de forma amigável e profissional.
2. NUNCA responda sobre tópicos que não estejam relacionados ao Victor. Se sair do escopo, diga que você é focado no portfólio.
3. Não invente informações. Se não souber, oriente a enviar um email para janhero.victor@gmail.com.

🔥 REGRAS DE CONCISÃO:
- Seja direto e objetivo (máximo de 2 parágrafos curtos).
- Use bullet points (*) sempre que for listar informações.
`;

const VICTOR_CONTEXT = `${SYSTEM_PROMPT}\n\n================\nBASE DE CONHECIMENTO:\n================\n${KNOWLEDGE_BASE}`;

/* ─── Rate limit simples (por IP) ──────────────────────── */
const messageCount = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 20;
const WINDOW_MS = 60 * 60 * 1000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = messageCount.get(ip);
  if (!entry || now > entry.resetAt) {
    messageCount.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT) return false;
  entry.count++;
  return true;
}

export async function POST(req: Request) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      req.headers.get("x-real-ip") ??
      "unknown";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Muitas mensagens. Tente novamente em uma hora." },
        { status: 429 },
      );
    }

    const { messages } = await req.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "messages required" }, { status: 400 });
    }

    const recentMessages = messages.slice(-6).map((m: any) => ({
      role: m.role,
      content: m.content,
    }));

    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Chatbot não configurado." },
        { status: 503 },
      );
    }

    const google = createGoogleGenerativeAI({ apiKey });

    const result = streamText({
      model: google("gemini-2.5-flash"),
      system: VICTOR_CONTEXT,
      messages: recentMessages,
      maxTokens: 400, 
      temperature: 0.3,
    });

    return result.toDataStreamResponse({
      getErrorMessage: (err) => {
        console.error("Erro fatal no Stream do Gemini:", err);
        return "Desculpe, ocorreu um erro interno na IA.";
      },
    });
  } catch (err) {
    console.error("Chat route error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
