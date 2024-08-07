const { PrismaClient} = require("@prisma/client");

const database = new PrismaClient();

async function main() {
    try {
        await database.category.createMany({
            data: [
                { name: "Objet" },
                { name: "Décor" },
                { name: "Animation" },
                { name: "Personnage" },
                { name: "Texture" },

            ]
        });

        console.log("Categories seeded successfully");
    } catch (error) {
        console.error("Error seeding the database categories",error);
    } finally {
        await database.$disconnect();
    }
}

main();