import { getChapter } from "@/actions/get-chapter";
import { Banner } from "@/components/Banner";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import VideoPlayer from "./_components/video-player";
import CourseEnrollButton from "./_components/course-enroll-button";
import { Separator } from "@/components/ui/separator";
import { Preview } from "@/components/preview";
import { Skeleton } from "@/components/ui/skeleton";
import { File } from "lucide-react";
import CourseProgressButton from "./_components/course-progress-button";
import { getAllChapters } from "@/actions/get-all-chapters";
import CourseLogButton from "./_components/course-log-button";

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
    const { chapter, course, attachments } = await getAllChapters({
      chapterId: params.chapterId,
      courseId: params.courseId,
    });
    if (!chapter || !course) {
      return redirect("/");
    }

    const isLocked = !chapter.isFree;
    let skeletonSize = 0;
    if (chapter.description) {
      if (chapter.description.length < 100) {
        skeletonSize = 4;
      } else {
        skeletonSize = chapter.description?.length / 100;
      }
    } else {
      skeletonSize = 0;
    }

    const roundedSkeleton = Math.ceil(skeletonSize);
    let key = 1;
    const skeleton = Array.from({ length: roundedSkeleton }, (_, index) => {
      key++;
      const randomWidth = `${90 + Math.random() * 10}%`;
      return (
        <>
          <Skeleton key={key} className="h-4 " style={{ width: randomWidth }} />
        </>
      );
    });
    let divHeight = "85vh";
    if (isLocked) {
      divHeight = "80vh";
    }
    return (
      <>
        {isLocked && (
          <Banner
            variant="warning"
            label="Vous devez vous connecter et acheter ce cours pour débloquer le chapitre"
          />
        )}
        <div
          style={{ height: divHeight }}
          className="flex flex-col max-w-5xl mx-auto pb-20  overflow-scroll scrollbar-hidden"
        >
          <div className="mt-[48px] p-4">
            {chapter.isVideo ? (
              <VideoPlayer url={chapter.videoUrl} isLocked={isLocked} />
            ) : (
              <div></div>
            )}
          </div>
          <div>
            <div className="p-4 flex flex-col md:flex-row items-center justify-between">
              <h2 className="text-2xl font-semibold mb-2">{chapter.title}</h2>

              <CourseLogButton price={course.price} />
            </div>
            <Separator />
            <div>
              {isLocked ? (
                <div className="space-y-2 mt-5 p-4">{skeleton}</div>
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
      </>
    );
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

  let skeletonSize = 0;
  if (chapter.description) {
    if (chapter.description.length < 100) {
      skeletonSize = 4;
    } else {
      skeletonSize = chapter.description?.length / 100;
    }
  } else {
    skeletonSize = 0;
  }

  const roundedSkeleton = Math.ceil(skeletonSize);
  let key = 1;
  const skeleton = Array.from({ length: roundedSkeleton }, (_, index) => {
    const randomWidth = `${90 + Math.random() * 10}%`;
    key++;
    return (
      <>
        <Skeleton key={key} className="h-4 " style={{ width: randomWidth }} />
      </>
    );
  });
  let divHeight = "85vh";
  if (userProgress?.isCompleted || isLocked) {
    divHeight = "80vh";
  }
  return (
    <>
      {userProgress?.isCompleted && (
        <Banner variant="success" label="Vous avez déjà terminé ce chapitre" />
      )}
      {isLocked && (
        <Banner
          variant="warning"
          label="Vous devez acheter ce cours pour débloquer le chapitre"
        />
      )}
      <div
        style={{ height: divHeight }}
        className="flex flex-col max-w-5xl mx-auto pb-20  overflow-scroll scrollbar-hidden"
      >
        <div className="mt-[48px] p-4">
          {chapter.isVideo ? (
            <VideoPlayer url={chapter.videoUrl} isLocked={isLocked} />
          ) : (
            <div></div>
          )}
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
                isFree={course.isFree}
              />
            )}
          </div>
          <Separator />
          <div>
            {isLocked ? (
              <div className="space-y-2 mt-5 p-4">{skeleton}</div>
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
    </>
  );
};

export default ChapterIdPage;
