import { Resend } from "resend";
import { ContactEmail } from "@/emails/contact-notification";
import { AutoReplyEmail } from "@/emails/auto-reply";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { fullName, email, phone, message } = await request.json();

    // Send notification email to you
    await resend.emails.send({
      from: "contact@ernyg.com",
      to: "contact@ernyg.com",
      subject: `New Contact Form Submission from ${fullName}`,
      react: ContactEmail({ fullName, email, phone, message }),
    });

    // Send auto-reply to the user
    await resend.emails.send({
      from: "contact@ernyg.com",
      to: email,
      subject: "Thank you for contacting Ernyg",
      react: AutoReplyEmail({ fullName }),
    });

    return NextResponse.json(
      { message: "Emails sent successfully" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: `Failed to send emails: ${error instanceof Error ? error.message : "Unknown error"}`,
      },
      { status: 500 },
    );
  }
}
