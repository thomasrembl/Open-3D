import { db } from "@/lib/db";
import { Attachment, Chapter } from "@prisma/client";


interface GetChapterPropos {
    courseId: string;
    chapterId: string;
}

export const getAllChapters = async ({
    courseId,
    chapterId
} : GetChapterPropos) => {

    try {

        const course = await db.course.findUnique({
            where:{
                isPublished: true,
                id: courseId
            },
            select: {
                price: true,
            }
        })

        const chapter = await db.chapter.findUnique({
            where: {
                id: chapterId,
                isPublished: true,
            }
        })
        
        if (!chapter || !course){
            throw new Error("Chapter or course not found")
        }

        let attachments: Attachment[] = [];
        let nextChapter : Chapter | null = null;

        return {
            chapter,
            course,
            attachments,
            nextChapter,
        }

    } catch (error) {
        console.log("[GET_CHAPTER]", error);
        return{
            chapter: null,
            course: null,
            attachments: [],
            nextChapter: null,

        }
    }
}