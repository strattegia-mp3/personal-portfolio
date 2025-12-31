import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, language, firstName, lastName } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const API_KEY = process.env.MAILCHIMP_API_KEY;
    const SERVER_PREFIX = process.env.MAILCHIMP_SERVER_PREFIX;
    const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;

    if (!API_KEY || !SERVER_PREFIX || !AUDIENCE_ID) {
      throw new Error("Mailchimp credentials not configured");
    }

    const url = `https://${SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`;

    const mcLanguage = language === "pt" ? "pt" : "en";
    const tag = language === "pt" ? "Site-PT" : "Site-EN";

    const data = {
      email_address: email,
      status: "pending",
      language: mcLanguage,
      tags: [tag],
      merge_fields: {
        FNAME: firstName || "",
        LNAME: lastName || "",
      },
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `apikey ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();

      if (errorData.title === "Member Exists") {
        return NextResponse.json(
          { error: "Member already exists" },
          { status: 400 }
        );
      }

      throw new Error(errorData.detail || "Mailchimp Error");
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Mailchimp API Error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
