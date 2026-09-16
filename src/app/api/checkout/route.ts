import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { formData, items, paymentMethod } = body;

    const wpUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL || "https://staging.bom1.mystaging.site";
    const cleanBase = wpUrl.replace(/\/graphql\/?$/, "").replace(/\/$/, "");

    const ck = process.env.WC_CONSUMER_KEY;
    const cs = process.env.WC_CONSUMER_SECRET;

    // Check if live WooCommerce REST API credentials exist
    if (ck && cs) {
      const authHeader = `Basic ${Buffer.from(`${ck}:${cs}`).toString("base64")}`;

      const orderPayload = {
        payment_method: paymentMethod || "cod",
        payment_method_title:
          paymentMethod === "upi"
            ? "Instant UPI / QR"
            : paymentMethod === "card"
            ? "Credit / Debit Card"
            : "Cash on Delivery",
        set_paid: paymentMethod === "card" || paymentMethod === "upi",
        billing: {
          first_name: formData.firstName,
          last_name: formData.lastName,
          address_1: formData.address,
          city: formData.city,
          state: formData.state,
          postcode: formData.postalCode,
          country: "IN",
          email: formData.email,
          phone: formData.phone,
        },
        shipping: {
          first_name: formData.firstName,
          last_name: formData.lastName,
          address_1: formData.address,
          city: formData.city,
          state: formData.state,
          postcode: formData.postalCode,
          country: "IN",
        },
        line_items: items.map((item: any) => ({
          product_id: parseInt(item.productId, 10) || 0,
          quantity: item.quantity || 1,
        })),
      };

      const res = await fetch(`${cleanBase}/wp-json/wc/v3/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader,
        },
        body: JSON.stringify(orderPayload),
      });

      if (res.ok) {
        const order = await res.json();
        return NextResponse.json({
          success: true,
          orderId: `#${order.id}`,
          orderNumber: order.number || String(order.id),
          total: order.total,
          status: order.status,
        });
      } else {
        const errJson = await res.json().catch(() => ({}));
        console.error("[WooCommerce API Error]:", errJson);
      }
    }

    // Fallback order ID if WC credentials are not yet entered in Vercel
    const fallbackId = `ZEL-${Math.floor(100000 + Math.random() * 900000)}`;
    return NextResponse.json({
      success: true,
      orderId: fallbackId,
      orderNumber: fallbackId,
      note: "Live WooCommerce REST API keys not yet provided. Order placed in preview mode.",
    });
  } catch (error: any) {
    console.error("[Checkout Route Error]:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to process order" },
      { status: 500 }
    );
  }
}
