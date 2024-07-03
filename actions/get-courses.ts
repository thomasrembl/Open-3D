import { Category, Course } from "@prisma/client";

import { getProgress } from "@/actions/get-progress";
import { db } from "@/lib/db";

type CourseWithProgressWithCategory = Course & { 
    category: Category | null;
    chapter: {id : string}[];
    progress: number | null;
};

type GetCourses = {
    userId: string;
    categoryId?: string;
    title?: string;
}

export const getCourses = async ({userId, categoryId, title}: GetCourses): Promise<CourseWithProgressWithCategory[]> => {
    try {
        const courses = await db.course.findMany({
            where: {
                isPublished: true,
                title: {
                    contains: title,
                },
                categoryId
            },
            include: {
                category: true,
                chapters: {
                    where: {
                        isPublished: true,
                    },
                    select: {
                        id: true,
                    }
                },
                purchases: {
                    where: {
                        userId,
                    }
                }
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        const coursesWithProgress: CourseWithProgressWithCategory[] = await Promise.all(
            courses.map(async (course) => {
                if (course.purchases.length === 0) {
                    return {
                        ...course,
                        progress: null,
                        chapter: course.chapters,
                    };
                }
                const progressPercentage = await getProgress(userId, course.id);
                return {
                    ...course,
                    progress: progressPercentage,
                    chapter: course.chapters,
                };
            })
        );
        

        return coursesWithProgress;
        
    } catch (error) {
        console.log("[GET_COURSES]", error);
        return [];
    }
};