import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
export async function PATCH(
    req: Request,
    { params }: { params: {courseId:string; chapterId: string}}
) {
    try {
        const {userId} = auth()
        const {isPublised, ...values} = await req.json()
        if (!userId) {
            return new NextResponse("Unauthorized",{ status: 401 })
        }

        const ownCourse = await db.course.findFirst({
            where: {
                id: params.courseId,
                userId,
            }
        })

        if (!ownCourse) {
            return new NextResponse("Unauthorized",{ status: 401 })
        }

        const chapter = await db.chapter.update({
            where: {
                id: params.chapterId,
                courseId: params.courseId,
            },
            data: {
                ...values
            }
        });

        //TODO: HANDLE VIDEO UPLOAD

        return  NextResponse.json(chapter)
        
    } catch (error) {
        console.log("[COURSE_CHAPTER_ID]", error)
        return new NextResponse("Internal error",{ status: 500 })
        
    }
}
