import { getChapter } from "@/actions/get-chapter";
import { Banner } from "@/components/Banner";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import VideoPlayer from "./_components/video-player";
import CourseEnrollButton from "./_components/course-enroll-button";
import { Separator } from "@/components/ui/separator";
import { Preview } from "@/components/preview";
import { Skeleton } from "@/components/ui/skeleton";
import { File } from "lucide-react";
import CourseProgressButton from "./_components/course-progress-button";

const ChapterIdPage = async ({
  params,
}: {
  params: {
    courseId: string;
    chapterId: string;
  };
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/login");
  }

  const { chapter, course, attachments, nextChapter, userProgress, purchase } =
    await getChapter({
      userId,
      chapterId: params.chapterId,
      courseId: params.courseId,
    });

  if (!chapter || !course) {
    return redirect("/");
  }

  const isLocked = !chapter.isFree && !purchase;

  const completeOnEnd = !!purchase && userProgress?.isCompleted;

  return (
    <div>
      {userProgress?.isCompleted && (
        <Banner variant="success" label="Vous avez déjà terminé ce chapitre" />
      )}
      {isLocked && (
        <Banner
          variant="warning"
          label="Vous devez acheter ce cours pour débloquer le chapitre"
        />
      )}
      <div className="flex flex-col max-w-5xl mx-auto pb-20 h-[85vh] overflow-scroll scrollbar-hidden">
        <div className="mt-[48px] p-4">
          <VideoPlayer
            url={chapter.videoUrl}
            isLocked={isLocked}
            onComplete={completeOnEnd}
          />
        </div>
        <div>
          <div className="p-4 flex flex-col md:flex-row items-center justify-between">
            <h2 className="text-2xl font-semibold mb-2">{chapter.title}</h2>
            {purchase ? (
              <CourseProgressButton
                chapterId={params.chapterId}
                courseId={params.courseId}
                nextChapterId={nextChapter?.id}
                isCompleted={!!userProgress?.isCompleted}
              />
            ) : (
              <CourseEnrollButton
                courseId={params.courseId}
                price={course.price}
              />
            )}
          </div>
          <Separator />
          <div>
            {isLocked ? (
              <div className="space-y-2 mt-5 p-4">
                <Skeleton className="h-4 w-[90%]" />
                <Skeleton className="h-4 w-[88%]" />
                <Skeleton className="h-4 w-[70%]" />
              </div>
            ) : (
              chapter.description && <Preview value={chapter.description} />
            )}
          </div>
          {!!attachments.length && (
            <>
              <Separator />
              <div className="mt-4 ">
                {attachments.map((attachment) => (
                  <a
                    href={attachment.url}
                    key={attachment.id}
                    target="_blank"
                    className="p-4 flex items-centerp-3 w-fit bg-sky-200 text-sky-700 border rounded-md hover:underline"
                  >
                    <File className="w-6 h-6 mr-2" />
                    <p className="line-clamp-1">{attachment.name}</p>
                  </a>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChapterIdPage;
