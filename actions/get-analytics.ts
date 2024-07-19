import { db } from "@/lib/db";
import { Course, Purchase } from "@prisma/client";

type PurchaseWithCourse = Purchase &{
    course : Course;
}

const groupByCourse = (purchases: PurchaseWithCourse[]) => {
    const grouped: {[courseTitle: string]: number } = {};

    purchases.forEach((purchase) => {
        const courseTitle = purchase.course.title;
        if (!grouped[courseTitle]){
            grouped[courseTitle] = 0;
        }
        grouped[courseTitle] += purchase.course.price!;
    });

    return grouped;
}

const groupBySale = (purchases: PurchaseWithCourse[]) => {
    const grouped: { [courseTitle: string]: number } = {};

    purchases.forEach((purchase) => {
        const courseTitle = purchase.course.title;
        if (!grouped[courseTitle]) {
            grouped[courseTitle] = 0;
        }
        grouped[courseTitle]++;
    });

    return grouped;
};

export const getAnalytics = async (userId: string) => {
    try {
        
    
        const purchases = await db.purchase.findMany({
            where: {
                course:{
                    userId : userId
                }
            },
            include: {

                course : true
            },
            
        });

    

        const groupedEarning = groupByCourse(purchases);

        const data = Object.entries(groupedEarning).map(([courseTitle, total]) => ({
            name: courseTitle,
            total: total
        }));

        const groupedSale = groupBySale(purchases);

        const dataSale= Object.entries(groupedSale).map(([courseTitle, total]) => ({
            name: courseTitle,
            total: total
        }));



        const totalRevenue = data.reduce((acc, curr) => acc + curr.total, 0);

        const totalSale = purchases.length;

    return {
        data,
        totalRevenue,
        totalSale,
        dataSale
    };



    } catch (error) {
        console.error("Error getting analytics", error);
        return {
            data: [],
            dataSale: [],
            totalRevenue: 0,
            totalSale: 0
        }
    }
}