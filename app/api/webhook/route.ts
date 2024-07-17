import Stripe from "stripe";
import { headers } from 'next/headers';
import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: Request) {
  console.log("{Webhook Event} Request received");

  const body = await req.text();
  const headersList = headers();
  const signature = headersList.get("Stripe-Signature") as string;

  console.log("{Webhook Event} Headers:", headersList);
  console.log("{Webhook Event} Body:", body);
  console.log("{Webhook Event} Signature:", signature);

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
    console.log("{Webhook Event} Event constructed successfully");
  } catch (error: any) {
    console.error(`Webhook Error: ${error.message}`);
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  console.log("{Webhook Event} Event type:", event.type);

  const session = event.data.object as Stripe.Checkout.Session;
  const userId = session?.metadata?.userId;
  const courseId = session?.metadata?.courseId;

  console.log("{Webhook Event} Session:", session);
  console.log("{Webhook Event} User ID:", userId);
  console.log("{Webhook Event} Course ID:", courseId);

  if (event.type === "checkout.session.completed") {
    if (!userId || !courseId) {
      console.error("WEBHOOKS Error: Missing Metadata");
      return new NextResponse("WEBHOOKS Error: Missing Metadata", { status: 400 });
    }

    try {
      await db.purchase.create({
        data: {
          courseId: courseId,
          userId: userId,
        },
      });
      console.log("{Webhook Event} Purchase recorded successfully");
    } catch (dbError) {
      console.error("WEBHOOKS Error: Database operation failed", dbError);
      return new NextResponse("WEBHOOKS Error: Database operation failed", { status: 500 });
    }
  } else {
    console.error(`WEBHOOKS Error: Unhandled Event Type ${event.type}`);
    return new NextResponse(`WEBHOOKS Error: Unhandled Event Type ${event.type}`, { status: 200 });
  }

  console.log("{Webhook Event} Request completed");
  return new NextResponse(null, { status: 200 });
}
