import { createRouteHandler } from "uploadthing/next";
 
import { ourFileRouter } from "./cors";
 

export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
 
});