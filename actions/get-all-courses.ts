import { Category, Course } from "@prisma/client";

import { db } from "@/lib/db";

type CourseWithProgressWithCategory = Course & { 
    category: Category | null;
    chapter: {id : string}[];
    progress: number | null;
};

type GetCourses = {
    categoryId?: string;
    title?: string;
}

export const getAllCourses = async ({ categoryId, title}: GetCourses): Promise<CourseWithProgressWithCategory[]> => {
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
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        const allCourses = await Promise.all(
            courses.map(async (course) => {
                return {
                    ...course,
                    progress: null,
                    chapter: course.chapters,
                };
            })
        );
        

        return allCourses;
        
    } catch (error) {
        console.log("[GET_COURSES]", error);
        return [];
    }
};