import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { isTeacher } from "@/lib/teacher";
export async function PUT(
    req:Request,
    {params} : {params: {courseId: string, chapterId: string}}
) {
    try {
        const {userId} = auth();
        const {isCompleted} = await req.json();

        if (!userId || !isTeacher(userId)) {
            return new NextResponse("Unauthorized", {status: 401});
        }
        const userProgress = await db.userProgress.upsert({
            where: {
                userId_chapterId: {
                    userId,
                    chapterId: params.chapterId
                }
            },
            create: {
                userId,
                chapterId: params.chapterId,
                isCompleted
            },
            update: {
                isCompleted
            }
        });
        
        return NextResponse.json(userProgress);

        
    } catch (error) {
        console.error("[CHAPTER_ID_PROGRESS]",error);
        new NextResponse("Internal Server Error", {status: 500});
        
    }
}