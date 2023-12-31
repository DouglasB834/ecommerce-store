import Stripe from "stripe";
import { NextResponse } from "next/server";
import { prismaClient } from "@/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});
export const POST = async (request: Request) => {
  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.error();
  }

  const text = await request.text();

  const event = stripe.webhooks.constructEvent(
    text,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET_KEY
  );

  if (event.type === "checkout.session.completed") {
    const sessionOrder = event.data.object as any;
    const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
      event.data.object.id,
      {
        expand: ["line_items"],
      }
    );
    // const lineItems = sessionWithLineItems.line_items; poderia pegar esses item que vem do carinho

    //add db
    await prismaClient.order.update({
      where: {
        id: sessionOrder.metadata.orderId, //foi colocado no data checkout
      },
      data: {
        status: "PAYMENT_CONFIRMED",
      },
    });
  }

  return NextResponse.json({ received: true });
};
