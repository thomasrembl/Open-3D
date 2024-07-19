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


  const body = await req.text();
  const headersList = headers();
  const signature = headersList.get("Stripe-Signature") as string;



  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);

  } catch (error: any) {

    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }



  const session = event.data.object as Stripe.Checkout.Session;
  const userId = session?.metadata?.userId;
  const courseId = session?.metadata?.courseId;



  if (event.type === "checkout.session.completed") {
    if (!userId || !courseId) {

      return new NextResponse("WEBHOOKS Error: Missing Metadata", { status: 400 });
    }

    try {
      await db.purchase.create({
        data: {
          courseId: courseId,
          userId: userId,
        },
      });

    } catch (dbError) {

      return new NextResponse("WEBHOOKS Error: Database operation failed", { status: 500 });
    }
  } else {

    return new NextResponse(`WEBHOOKS Error: Unhandled Event Type ${event.type}`, { status: 200 });
  }


  return new NextResponse(null, { status: 200 });
}
