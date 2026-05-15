import { NextResponse } from "next/server";

/* ─── Types ──────────────────────────────────────────── */
interface SubscribeBody {
  email: string;
  firstName?: string;
  lastName?: string;
  language?: "pt" | "en";
}

interface MailchimpError {
  title?: string;
  detail?: string;
  status?: number;
}

/* ─── Helpers ────────────────────────────────────────── */
function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getEnvVars() {
  const API_KEY = process.env.MAILCHIMP_API_KEY;
  const SERVER_PREFIX = process.env.MAILCHIMP_SERVER_PREFIX;
  const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;

  if (!API_KEY || !SERVER_PREFIX || !AUDIENCE_ID) {
    throw new Error(
      "Mailchimp environment variables not configured. Add MAILCHIMP_API_KEY, MAILCHIMP_SERVER_PREFIX, MAILCHIMP_AUDIENCE_ID to your .env.local",
    );
  }
  return { API_KEY, SERVER_PREFIX, AUDIENCE_ID };
}

/* ─── Route Handler ──────────────────────────────────── */
export async function POST(request: Request) {
  try {
    /* Parse body */
    let body: SubscribeBody;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const { email, firstName = "", lastName = "", language = "pt" } = body;

    /* Validate */
    if (!email || !validateEmail(email)) {
      return NextResponse.json(
        { error: "Valid email address required" },
        { status: 400 },
      );
    }

    /* Build Mailchimp request */
    const { API_KEY, SERVER_PREFIX, AUDIENCE_ID } = getEnvVars();

    const mcLang = language === "pt" ? "pt" : "en";
    const tag = language === "pt" ? "Site-PT" : "Site-EN";

    const mcUrl = `https://${SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`;

    const mcRes = await fetch(mcUrl, {
      method: "POST",
      headers: {
        Authorization: `apikey ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email_address: email,
        status: "pending", // double opt-in — GDPR-compliant
        language: mcLang,
        tags: [tag],
        merge_fields: {
          FNAME: firstName.trim(),
          LNAME: lastName.trim(),
        },
      }),
      // Abort after 8s to avoid serverless timeout
      signal: AbortSignal.timeout(8000),
    });

    /* Handle Mailchimp response */
    if (mcRes.ok) {
      return NextResponse.json({ success: true }, { status: 201 });
    }

    const err: MailchimpError = await mcRes.json().catch(() => ({}));

    /* Already subscribed — treat as success to avoid leaking info */
    if (err.title === "Member Exists") {
      return NextResponse.json(
        { error: "already_subscribed", message: "Member already subscribed" },
        { status: 409 },
      );
    }

    /* CORREÇÃO: Forgotten Email (Permanently Deleted) */
    if (err.title === "Forgotten Email Not Subscribed") {
      return NextResponse.json(
        {
          error: "forgotten_email",
          message:
            "Email was permanently deleted and cannot be re-imported via API.",
        },
        { status: 400 },
      );
    }

    /* Compliance state (unsubscribed/cleaned) */
    if (err.title === "Invalid Resource") {
      return NextResponse.json(
        { error: "invalid_email", message: err.detail || "Invalid email" },
        { status: 422 },
      );
    }

    /* Generic Mailchimp error */
    console.error("Mailchimp API error:", err);
    return NextResponse.json(
      {
        error: "provider_error",
        message: err.detail || "Newsletter provider error",
      },
      { status: 502 },
    );
  } catch (error: unknown) {
    /* Env not configured */
    if (error instanceof Error && error.message.includes("not configured")) {
      console.error(error.message);
      return NextResponse.json(
        { error: "not_configured", message: "Newsletter not configured" },
        { status: 503 },
      );
    }
    console.error("Subscribe route error:", error);
    return NextResponse.json(
      { error: "server_error", message: "Internal server error" },
      { status: 500 },
    );
  }
}
