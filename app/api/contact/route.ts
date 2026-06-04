import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, company, service, message, website } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required fields." },
        { status: 400 }
      );
    }

    // In a real production setup, Braxton Codes would wire this to SendGrid, Resend, or a CRM.
    // Here we simulate successful reception and log to server container metrics
    console.log(`[Form Submitted] Name: ${name} | Email: ${email} | Company: ${company || 'N/A'} | Service: ${service} | Web: ${website || 'N/A'}`);
    
    return NextResponse.json({
      success: true,
      message: "Consultation request received successfully. Braxton Codes will reach out within 1 business day!",
      referenceId: `REF-${Math.floor(100000 + Math.random() * 900000)}`
    });

  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "An error occurred while sending message." },
      { status: 500 }
    );
  }
}
