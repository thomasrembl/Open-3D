
import { auth } from '@clerk/nextjs/server';
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
 
const f = createUploadthing();
 
const handleAuth = () => {
    const { userId } = auth();

    const isAthorized = isTeacher(userId);
    

    if (!userId || !isAthorized) 
        throw new Error("Unauthorized");
        return {userId};
    
}
 

export const ourFileRouter = {
    courseImage: f({ image: { maxFileSize:"4MB", maxFileCount: 1 }})
        .middleware(() => handleAuth())
        .onUploadComplete(() => {}),
    coursAttachment: f(["text", "image", "video", "audio", "pdf"])
        .middleware(() => handleAuth())
        .onUploadComplete(() => {}),
    chapterVideo: f({ video: { maxFileSize: "512GB", maxFileCount: 1 }})
        .middleware(() => handleAuth())
        .onUploadComplete(() => {}),

} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;