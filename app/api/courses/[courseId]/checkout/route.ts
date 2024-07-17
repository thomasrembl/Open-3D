import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { currentUser } from "@clerk/nextjs";
import { url } from "inspector";
import { NextResponse } from "next/server";
import Stripe from "stripe";


export async function POST (
    req: Request,
    {params}: {params: {courseId: string}}
) {
    try {
        console.log('[COURSE_ID_CHECKOUT] Request received');

        const user = await currentUser();
        console.log('[COURSE_ID_CHECKOUT] User:', user);

        if (!user || !user.id || !user.emailAddresses?.[0]?.emailAddress) {
            console.log('[COURSE_ID_CHECKOUT] User not found or invalid');
            return new NextResponse("Unauthorized", {status: 401});
        }

        const course = await db.course.findUnique({
            where:{
                id: params.courseId,
                isPublished: true
            }
        });
        console.log('[COURSE_ID_CHECKOUT] Course:', course);

        if (!course) {
            console.log('[COURSE_ID_CHECKOUT] Course not found');
            return new NextResponse("Course not found", {status: 404});
        }

        const purchase = await db.purchase.findUnique({
            where:{
                userId_courseId:{
                    userId: user.id,
                    courseId: params.courseId
                }
            }
        });
        console.log('[COURSE_ID_CHECKOUT] Purchase:', purchase);

        if (purchase) {
            console.log('[COURSE_ID_CHECKOUT] Already purchased');
            return new NextResponse("Already purchased", {status: 400});
        }

        const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [
            {
                quantity: 1,
                price_data: {
                    currency: 'EUR',
                    product_data: {
                        name: course.title,
                        description: course.description!,
                    },
                    unit_amount: Math.round(course.price! * 100)
                }
            }
        ];

        let stripeCustomer = await db.stripeCustomer.findUnique({
            where:{
                userId: user.id
            },
            select:{
                stripeCustomerId: true
            }
        });
        console.log('[COURSE_ID_CHECKOUT] Stripe Customer:', stripeCustomer);

        if (!stripeCustomer) {
            const customer = await stripe.customers.create({
                email: user.emailAddresses?.[0]?.emailAddress,
            });
            console.log('[COURSE_ID_CHECKOUT] Stripe Customer created:', customer);

            stripeCustomer = await db.stripeCustomer.create({
                data:{
                    userId: user.id,
                    stripeCustomerId: customer.id
                }
            });
            console.log('[COURSE_ID_CHECKOUT] Stripe Customer saved:', stripeCustomer);
        }

        const session = await stripe.checkout.sessions.create({
            customer: stripeCustomer.stripeCustomerId,
            line_items,
            mode: 'payment',
            success_url: `${process.env.NEXT_PUBLIC_APP_URL}/courses/${course.id}?success=1`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/courses/${course.id}?canceled=1`,
            metadata: {
                userId: user.id,
                courseId: course.id
            },
        });
        console.log('[COURSE_ID_CHECKOUT] Stripe Session created:', session);

        console.log('[COURSE_ID_CHECKOUT] Request completed');
        return NextResponse.json({url: session.url});
        
    } catch (error) {
        console.log('[COURSE_ID_CHECKOUT]', error);
        return new NextResponse("Internal error", {status: 500});
    }
}
