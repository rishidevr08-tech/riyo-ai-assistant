import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Helper to write files to public/uploads/
async function handleFileUpload(file: any): Promise<string | null> {
  if (!file || !(file instanceof File) || file.size === 0) {
    return null;
  }

  try {
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // Sanitize filename to avoid directory traversal
    const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const uniqueName = `${Date.now()}_${safeName}`;
    const filePath = path.join(uploadsDir, uniqueName);

    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(filePath, buffer);

    return `/uploads/${uniqueName}`;
  } catch (error) {
    console.error("Error writing uploaded file:", error);
    return null;
  }
}

// POST endpoint: Handle RFQ Wizard Submission (FormData)
export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    // Core fields
    const productId = formData.get("productId") as string;
    const productName = formData.get("productName") as string;
    const type = formData.get("type") as "sample" | "quotation";
    const fabric = formData.get("fabric") as string;
    const gsm = formData.get("gsm") as string;
    const size = formData.get("size") as string;
    const color = formData.get("color") as string;
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const brand = formData.get("brand") as string;
    const volume = formData.get("volume") as string;
    const scope = (formData.get("scope") as string) || "Private Label Production";
    const phone = (formData.get("phone") as string) || "";
    const message = formData.get("message") as string;

    if (!productId || !productName || !name || !email || !brand) {
      return NextResponse.json(
        { error: "Missing required contact or product brief fields" },
        { status: 400 }
      );
    }

    // Handle optional file uploads
    const techPackFile = formData.get("techPack");
    const logoFile = formData.get("logo");
    const designFile = formData.get("design");
    const referenceImageFile = formData.get("referenceImage");

    const techPackUrl = await handleFileUpload(techPackFile);
    const logoUrl = await handleFileUpload(logoFile);
    const designUrl = await handleFileUpload(designFile);
    const referenceImageUrl = await handleFileUpload(referenceImageFile);

    // Database path
    const dbDir = path.join(process.cwd(), "data");
    const dbPath = path.join(dbDir, "inquiries.json");

    if (!fs.existsSync(dbDir)) {
      fs.mkdirSync(dbDir, { recursive: true });
    }

    // Read current inquiries to calculate sequential ID
    let inquiries: any[] = [];
    if (fs.existsSync(dbPath)) {
      try {
        const fileContent = fs.readFileSync(dbPath, "utf-8");
        inquiries = JSON.parse(fileContent);
      } catch (err) {
        console.error("Error reading inquiries, resetting count...", err);
        inquiries = [];
      }
    }

    // Sequential ID: FB-2026-00001, FB-2026-00002...
    const count = inquiries.length;
    const referenceId = `FB-2026-${String(count + 1).padStart(5, "0")}`;

    // Lead Scoring logic based on volume selection
    let leadScore: "Small Lead" | "Medium Lead" | "High Value Lead" = "Medium Lead";
    if (volume.includes("Sample")) {
      leadScore = "Small Lead";
    } else if (volume.includes("300") || volume.includes("Under")) {
      leadScore = "Medium Lead";
    } else if (
      volume.includes("1,000") ||
      volume.includes("5,000") ||
      volume.includes("5000")
    ) {
      leadScore = "High Value Lead";
    }

    // Create the inquiry record
    const newInquiry = {
      id: referenceId,
      productId,
      productName,
      type,
      fabric,
      gsm,
      size,
      color,
      name,
      email,
      brand,
      volume,
      scope,
      phone,
      message,
      techPackUrl,
      logoUrl,
      designUrl,
      referenceImageUrl,
      leadScore,
      status: "New", // Default status
      notes: [
        {
          text: "RFQ Submitted",
          author: "System",
          createdAt: new Date().toISOString().split("T")[0]
        }
      ],
      timestamp: new Date().toISOString(),
    };

    // Append and save inquiry
    inquiries.push(newInquiry);
    fs.writeFileSync(dbPath, JSON.stringify(inquiries, null, 2), "utf-8");

    // ==========================================
    // EMAIL DISPATCH SYSTEM (SIMULATOR + LIVE RESEND)
    // ==========================================
    const emailsDir = path.join(process.cwd(), "data");
    const emailsPath = path.join(emailsDir, "sent_emails.json");

    let sentEmails: any[] = [];
    if (fs.existsSync(emailsPath)) {
      try {
        sentEmails = JSON.parse(fs.readFileSync(emailsPath, "utf-8"));
      } catch (err) {
        sentEmails = [];
      }
    }

    const opsHtml = `
      <div style="font-family: sans-serif; max-width: 600px; padding: 25px; border: 1px solid #eaeaea; border-radius: 4px; background-color: #fafafa;">
        <h2 style="color: #111; font-weight: 300; text-transform: uppercase; border-bottom: 2px solid #111; padding-bottom: 10px; margin-bottom: 20px;">COMMERCIAL RFQ INCOMING BRIEF</h2>
        
        <p style="color: #666; font-size: 14px;"><strong>Reference Code:</strong> <span style="font-family: monospace; font-size: 16px; font-weight: bold; color: #000;">${referenceId}</span></p>
        <p style="color: #666; font-size: 14px;"><strong>Lead Class Score:</strong> <span style="background-color: #fffbeb; color: #b45309; padding: 2px 6px; border: 1px solid #fde68a; border-radius: 3px; font-weight: bold;">${leadScore}</span></p>
        <p style="color: #666; font-size: 14px;"><strong>Silhouette Model:</strong> <span style="text-transform: uppercase; font-weight: bold;">${productName}</span></p>
        <p style="color: #666; font-size: 14px;"><strong>RFQ Type:</strong> ${type === "sample" ? "TECHNICAL SAMPLE" : "VOLUME PRODUCTION RUN"}</p>
        
        <h3 style="color: #333; font-weight: 400; border-bottom: 1px solid #eee; padding-bottom: 5px; margin-top: 25px;">TECHNICAL SPECIFICATIONS</h3>
        <ul style="color: #555; font-size: 13px; line-height: 1.6; padding-left: 20px;">
          <li><strong>Fabric Selection:</strong> ${fabric}</li>
          <li><strong>GSM Weight Spec:</strong> ${gsm}</li>
          <li><strong>Base Size Profile:</strong> ${size}</li>
          <li><strong>Yarn Dye Colorway:</strong> ${color}</li>
        </ul>
        
        <h3 style="color: #333; font-weight: 400; border-bottom: 1px solid #eee; padding-bottom: 5px; margin-top: 25px;">CORPORATE ENTITY</h3>
        <ul style="color: #555; font-size: 13px; line-height: 1.6; padding-left: 20px;">
          <li><strong>Brand Name:</strong> <span style="text-transform: uppercase; font-weight: bold;">${brand}</span></li>
          <li><strong>Contact Person:</strong> ${name}</li>
          <li><strong>Contact Email:</strong> ${email}</li>
          <li><strong>Target volume:</strong> ${volume}</li>
        </ul>
        
        <h3 style="color: #333; font-weight: 400; border-bottom: 1px solid #eee; padding-bottom: 5px; margin-top: 25px;">UPLOADED DESIGN ASSETS</h3>
        <ul style="color: #555; font-size: 13px; line-height: 1.6; padding-left: 20px; font-family: monospace;">
          <li><strong>Tech Pack:</strong> ${techPackUrl ? `http://localhost:3000${techPackUrl}` : "None"}</li>
          <li><strong>Brand Logo:</strong> ${logoUrl ? `http://localhost:3000${logoUrl}` : "None"}</li>
          <li><strong>Vector Design:</strong> ${designUrl ? `http://localhost:3000${designUrl}` : "None"}</li>
          <li><strong>Reference Image:</strong> ${referenceImageUrl ? `http://localhost:3000${referenceImageUrl}` : "None"}</li>
        </ul>
        
        <h3 style="color: #333; font-weight: 400; border-bottom: 1px solid #eee; padding-bottom: 5px; margin-top: 25px;">Technical Comments</h3>
        <p style="color: #555; font-size: 13px; line-height: 1.6; font-style: italic; background-color: #fff; padding: 10px; border-left: 3px solid #ccc;">
          "${message}"
        </p>
      </div>
    `;

    const clientHtml = `
      <div style="font-family: sans-serif; max-width: 600px; padding: 25px; border: 1px solid #eaeaea; border-radius: 4px;">
        <h2 style="color: #111; font-weight: 300; text-transform: uppercase; letter-spacing: 2px;">FASHION BERG CO.</h2>
        <p style="color: #444; font-size: 14px; line-height: 1.6;">Dear ${name},</p>
        <p style="color: #444; font-size: 14px; line-height: 1.6;">
          Thank you for submitting your custom apparel specifications to Fashion Berg Co.
        </p>
        <p style="color: #444; font-size: 14px; line-height: 1.6;">
          Your B2B commercial RFQ brief has been successfully logged inside our secure procurement vault under reference ID: <strong style="font-family: monospace; font-size: 15px; color: #111;">${referenceId}</strong>.
        </p>
        
        <div style="background-color: #fafafa; border: 1px solid #eee; padding: 15px; border-radius: 4px; margin: 20px 0;">
          <h4 style="margin-top: 0; color: #111; font-weight: 500; text-transform: uppercase; font-size: 12px; letter-spacing: 1px;">Summary of Custom Program</h4>
          <table style="width: 100%; font-size: 12px; line-height: 1.8; color: #555;">
            <tr><td style="width: 140px; font-weight: bold;">Silhouette Model:</td><td style="text-transform: uppercase;">${productName}</td></tr>
            <tr><td style="font-weight: bold;">Sourcing type:</td><td>${type === "sample" ? "Technical Fit Sample" : "Volume Production Run"}</td></tr>
            <tr><td style="font-weight: bold;">Expected Volume:</td><td>${volume}</td></tr>
            <tr><td style="font-weight: bold;">Fabric Composition:</td><td>${fabric}</td></tr>
            <tr><td style="font-weight: bold;">GSM Custom Weight:</td><td>${gsm}</td></tr>
            <tr><td style="font-weight: bold;">Base Size Spec:</td><td>${size}</td></tr>
            <tr><td style="font-weight: bold;">Yarn Dye Color:</td><td>${color}</td></tr>
          </table>
        </div>
        
        <p style="color: #666; font-size: 13px; line-height: 1.6;">
          Our sourcing operations team in Düsseldorf is currently reviewing your technical remarks and uploaded vector patterns. A dedicated account engineer will reach out to you within 24 hours to schedule a pricing and design consultation review call.
        </p>
        
        <hr style="border: 0; border-top: 1px solid #eaeaea; margin: 25px 0;" />
        <p style="color: #999; font-size: 11px; line-height: 1.6;">
          Sincerely,<br />
          <strong>Commercial Sourcing Desk</strong><br />
          FASHION BERG CO.<br />
          Königsallee 92a, Düsseldorf, Germany
        </p>
      </div>
    `;

    // 1. Log to simulated json database
    sentEmails.push(
      {
        id: `MAIL-OPS-${Date.now()}-1`,
        inquiryId: referenceId,
        recipient: "sourcing@fashionberg.com",
        subject: `New Product Inquiry - ${referenceId}`,
        body: opsHtml,
        timestamp: new Date().toISOString(),
      },
      {
        id: `MAIL-CLIENT-${Date.now()}-2`,
        inquiryId: referenceId,
        recipient: email,
        subject: `RFQ Received - ${referenceId} - Fashion Berg Co.`,
        body: clientHtml,
        timestamp: new Date().toISOString(),
      }
    );
    fs.writeFileSync(emailsPath, JSON.stringify(sentEmails, null, 2), "utf-8");

    // 2. DISPATCH LIVE TRANSACTIONAL EMAILS VIA RESEND SDK
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      try {
        const { Resend } = require("resend");
        const resend = new Resend(resendApiKey);

        // Send copy of Brief to account email (acting Sourcing Desk in Onboarding)
        await resend.emails.send({
          from: "onboarding@resend.dev",
          to: ["rishidevr007@gmail.com"],
          subject: `[ADMIN Desk] Sourcing RFQ Brief - ${referenceId}`,
          html: opsHtml,
        });

        // Send client confirmation copy directly to user's registered address for review
        await resend.emails.send({
          from: "onboarding@resend.dev",
          to: ["rishidevr007@gmail.com"],
          subject: `[Client Confirmation Copy] RFQ Received - ${referenceId} - Fashion Berg Co.`,
          html: clientHtml,
        });

        console.log("==========================================");
        console.log(`LIVE RESEND TRANSACTIONS DISPATCHED SUCCESSFULLY`);
        console.log(`Reference: ${referenceId}`);
        console.log("==========================================");
      } catch (mailError) {
        console.error("Live Resend dispatch error (gracefully caught):", mailError);
      }
    }

    return NextResponse.json(
      { success: true, referenceId, inquiry: newInquiry },
      { status: 201 }
    );
  } catch (error) {
    console.error("API error submitting RFQ:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// PATCH endpoint: Update Sourcing Inquiry CRM Status or Append Internal Notes
export async function PATCH(request: Request) {
  try {
    const data = await request.json();
    const { id, status, note, noteAuthor } = data;

    if (!id) {
      return NextResponse.json(
        { error: "Missing required Sourcing Spec ID" },
        { status: 400 }
      );
    }

    const dbPath = path.join(process.cwd(), "data", "inquiries.json");

    if (!fs.existsSync(dbPath)) {
      return NextResponse.json(
        { error: "Sourcing Database not found" },
        { status: 404 }
      );
    }

    let inquiries: any[] = [];
    try {
      inquiries = JSON.parse(fs.readFileSync(dbPath, "utf-8"));
    } catch (err) {
      return NextResponse.json(
        { error: "Failed to read Sourcing Database" },
        { status: 500 }
      );
    }

    const itemIndex = inquiries.findIndex((item) => item.id === id);

    if (itemIndex === -1) {
      return NextResponse.json(
        { error: `Inquiry with ID ${id} not found` },
        { status: 404 }
      );
    }

    const target = inquiries[itemIndex];
    if (!target.notes) {
      target.notes = [];
    }

    // 1. Status Update pathway
    if (status && status !== target.status) {
      const oldStatus = target.status;
      target.status = status;
      
      // Auto-log status change to Sourcing Timeline
      target.notes.push({
        text: `Status updated from ${oldStatus} to ${status}`,
        author: "System",
        createdAt: new Date().toISOString().split("T")[0]
      });
    }

    // 2. Manual Note addition pathway
    if (note && note.trim().length > 0) {
      target.notes.push({
        text: note.trim(),
        author: noteAuthor || "Rishi",
        createdAt: new Date().toISOString().split("T")[0]
      });
    }

    fs.writeFileSync(dbPath, JSON.stringify(inquiries, null, 2), "utf-8");

    return NextResponse.json({
      success: true,
      message: `Inquiry ${id} updated successfully`,
      inquiry: target,
    });
  } catch (error) {
    console.error("API error updating inquiry details:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// GET endpoint: Retrieve Sourcing Inquiries (for CRM or single view)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    const dbPath = path.join(process.cwd(), "data", "inquiries.json");

    let inquiries: any[] = [];
    if (fs.existsSync(dbPath)) {
      try {
        inquiries = JSON.parse(fs.readFileSync(dbPath, "utf-8"));
      } catch (err) {
        inquiries = [];
      }
    }

    // Filter by ID if requested
    if (id) {
      const inquiry = inquiries.find((item) => item.id === id);
      if (!inquiry) {
        return NextResponse.json(
          { error: `Inquiry ${id} not found` },
          { status: 404 }
        );
      }
      return NextResponse.json({ inquiry });
    }

    // Sort all inquiries by timestamp descending
    inquiries.sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    return NextResponse.json({ inquiries });
  } catch (error) {
    console.error("API error fetching inquiries:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
