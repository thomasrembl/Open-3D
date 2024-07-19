import { IconBadge } from "@/components/icon-badge";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import {
  CircleDollarSign,
  File,
  LayoutDashboard,
  ListChecks,
} from "lucide-react";
import { redirect } from "next/navigation";
import { TitleForm } from "./_components/title-fom";
import { DescriptionForm } from "./_components/description-form";
import { ImageForm } from "./_components/image-form";
import { CategoryForm } from "./_components/category-form";
import { PriceForm } from "./_components/price-form";
import { AttachmentForm } from "./_components/attachment-form";
import { ChapterForm } from "./_components/chapter-form";
import { Banner } from "@/components/Banner";
import { Actions } from "./_components/action";

const CourseIdPage = async ({ params }: { params: { courseId: string } }) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }
  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
      userId,
    },
    include: {
      chapters: {
        orderBy: {
          position: "asc",
        },
      },
      attachments: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  if (!course) {
    return redirect("/");
  }

  const requiredFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.price || course.isFree,
    course.categoryId,
    course.chapters.some((chapter) => chapter.isPublished),
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  const isCompleted = requiredFields.every(Boolean);
  let divHeight = "86vh";
  if (!course.isPublished) {
    divHeight = "78.5vh";
  }

  return (
    <div className=" relative ">
      {!course.isPublished && (
        <>
          <Banner label="Votre cours n'est pas publié" />
        </>
      )}

      <div
        style={{ height: divHeight }}
        className="p-6  overflow-scroll scrollbar-hidden"
      >
        <div className="flex items-center justify-between ">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-semibold font-poppins text-cod-gray-950">
              Paramètre du Cours
            </h1>
            <span className="text-sm font-manrope text-cod-gray-950">
              Complétez tout les champs {completionText}
            </span>
          </div>
          <Actions
            disabled={!isCompleted}
            courseId={params.courseId}
            isPublished={course.isPublished}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div>
            <div className=" flex items-center gap-x-2">
              <IconBadge variant={"edit"} icon={LayoutDashboard} />
              <h2 className="text-lg font-poppins font-[400] text-cod-gray-950">
                Customisez votre Cours
              </h2>
            </div>
            <TitleForm initialData={course} courseId={course.id} />
            <DescriptionForm initialData={course} courseId={course.id} />
            <ImageForm initialData={course} courseId={course.id} />
            <CategoryForm
              initialData={course}
              courseId={course.id}
              options={categories.map((categorie) => ({
                label: categorie.name,
                value: categorie.id,
              }))}
            />
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge variant={"edit"} icon={ListChecks} />
                <h2 className="text-lg font-poppins font-[400] text-cod-gray-950">
                  Chapitre de votre Cours
                </h2>
              </div>
              <ChapterForm initialData={course} courseId={course.id} />
            </div>
            {!course.isFree && (
              <div>
                <div className="flex items-center gap-x-2">
                  <IconBadge variant={"edit"} icon={CircleDollarSign} />
                  <h2 className="ttext-lg font-poppins font-[400] text-cod-gray-950">
                    Vendez votre Cours
                  </h2>
                </div>
                <PriceForm initialData={course} courseId={course.id} />
              </div>
            )}
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge variant={"edit"} icon={File} />
                <h2 className="text-lg font-poppins font-[400] text-cod-gray-950">
                  Ressources
                </h2>
              </div>
              <AttachmentForm initialData={course} courseId={course.id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseIdPage;
