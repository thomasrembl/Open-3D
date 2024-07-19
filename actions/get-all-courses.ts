import { Category, Course } from "@prisma/client";
import { db } from "@/lib/db";

// Définition du type CourseWithoutProgressWithCategory
type CourseWithoutProgressWithCategory = Course & { 
    category: Category | null;
    chapters: { id: string }[];
};

type GetCourses = {
    categoryId?: string;
    title?: string;
}

export const getAllCourses = async ({ categoryId, title }: GetCourses): Promise<CourseWithoutProgressWithCategory[]> => {
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

        const allCourses: CourseWithoutProgressWithCategory[] = courses.map((course) => ({
            ...course,
            chapters: course.chapters, // Correction ici pour utiliser `chapters` au lieu de `chapter`
            progress: null, 
        }));


        return allCourses;
        
    } catch (error) {
        console.log("[GET_COURSES]", error);
        return [];
    }
};
