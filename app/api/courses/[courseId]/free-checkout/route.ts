import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


export async function POST (
    req: Request,
    {params}: {params: {courseId: string}}
) {
    try {

        const {userId} = auth()

        if (!userId) {

            return new NextResponse("Unauthorized", {status: 401});
        }

        const course = await db.course.findUnique({
            where:{
                id: params.courseId,
                isPublished: true,
            }
        });

        
        
        if (!course) {
            console.log('[COURSE_ID_CHECKOUT] Course not found');
            return new NextResponse("Course not found", {status: 404});
        }
        
        if (!course?.isFree){
            console.log('[COURSE_ID_CHECKOUT] Course is not free');
            return new NextResponse("Course is not free", {status: 404});
        }
      
        console.log('[COURSE_ID_CHECKOUT] Request completed');

        const checkout = await db.purchase.create({
            data: {
                courseId: params.courseId,
                userId: userId,
              },
            });

        return  NextResponse.json(checkout)

        
    } catch (error) {
        console.log('[COURSE_ID_CHECKOUT]', error);
        return new NextResponse("Internal error", {status: 500});
    }
}
