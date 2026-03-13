import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("[PreOrder] request body:", JSON.stringify(body));

    const res = await fetch(
      `http://194.238.23.44:9080/api/products/pre-order-response/create`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );

    // Safely parse response — backend might return HTML on error
    const rawText = await res.text();
    console.log("[PreOrder] backend status:", res.status, "raw:", rawText.slice(0, 300));

    let data: Record<string, unknown> = {};
    try {
      data = JSON.parse(rawText);
    } catch {
      // Backend returned non-JSON (HTML error page, proxy error, etc.)
      return NextResponse.json(
        { success: false, message: `Backend error (${res.status}): ${rawText.slice(0, 120)}` },
        { status: 502 }
      );
    }

    if (!res.ok) {
      const errorStr = (data?.error as string) || "";
      if (errorStr.includes("duplicate key") || errorStr.includes("E11000")) {
        return NextResponse.json(
          { success: false, message: "You've already submitted an enquiry for this product. Our team will contact you soon." },
          { status: 409 }
        );
      }
      return NextResponse.json(
        { success: false, message: (data?.message as string) || "Submission failed" },
        { status: res.status }
      );
    }

    return NextResponse.json({ success: true, message: "Enquiry submitted successfully.", data });

  } catch (err) {
    console.error("[PreOrder] fetch error:", err);
    return NextResponse.json(
      { success: false, message: `Could not reach server: ${err instanceof Error ? err.message : String(err)}` },
      { status: 500 }
    );
  }
}
