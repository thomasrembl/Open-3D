"use strict";

import { isTeacher } from "@/lib/teacher";
import { auth, useAuth } from "@clerk/nextjs";
import Link from "next/link";

import { Button } from "./ui/button";

const TeacherButton = () => {
  //   const { sessionClaims } = useAuth();

  //   const role = sessionClaims?.role;

  //   if ((await isTeacher(userId)) !== "admin") {
  //     return (
  //       <Link href="/teacher/courses">
  //         <Button size="sm" variant="ghost">
  //           Teacher Mode
  //         </Button>
  //       </Link>
  //     );
  //   }

  return <div></div>;
};

export default TeacherButton;
