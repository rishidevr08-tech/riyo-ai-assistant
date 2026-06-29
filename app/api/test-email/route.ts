import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const emailParam = searchParams.get("email");
    const recipient = emailParam || "rishidevr007@gmail.com";

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "RESEND_API_KEY environment variable is not defined" },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);

    const emailResponse = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: [recipient],
      subject: "Fashion Berg Test",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; padding: 20px; border: 1px solid #eaeaea; border-radius: 5px;">
          <h2 style="color: #171717; font-weight: 300; text-transform: uppercase; letter-spacing: 2px;">Fashion Berg Co.</h2>
          <p style="color: #666; font-size: 14px; line-height: 1.6;">
            <strong>Email integration working successfully!</strong>
          </p>
          <hr style="border: 0; border-top: 1px solid #eaeaea; margin: 20px 0;" />
          <p style="color: #999; font-size: 11px; font-family: monospace;">
            Simulated dispatch verify test for live RFQ notifications.
          </p>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: `Test email dispatched to ${recipient}`,
      data: emailResponse,
    });
  } catch (error: any) {
    console.error("Resend verification test failed:", error);
    return NextResponse.json(
      { error: error.message || "Failed to dispatch verification email" },
      { status: 500 }
    );
  }
}
