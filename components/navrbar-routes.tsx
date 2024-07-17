"use client";

import { UserButton, useAuth } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { SearchInput } from "./search-input";
import { isTeacher } from "@/lib/teacher";
import { use } from "react";

export const NavbarRoutes = () => {
  const { userId } = useAuth();
  const pathname = usePathname();

  const isTeacherPage = pathname?.startsWith("/teacher");
  const isPlayerPage = pathname?.startsWith("/courses");
  const isSearchPage = pathname?.startsWith("/search");
  return (
    <>
      {isSearchPage && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )}
      <div className="flex gap-x-2 ml-auto ">
        {isTeacherPage || isPlayerPage ? (
          <Link href="/">
            <Button size="sm" variant="ghost">
              <LogOut className="h-4 w-4 mr-2" />
              <p>Quitter</p>
            </Button>
          </Link>
        ) : isTeacher(userId) ? (
          <Link href="/teacher/courses">
            <Button size="sm" variant="ghost">
              <p>Espace Professeur</p>
            </Button>
          </Link>
        ) : null}
        <UserButton afterSignOutUrl={"/"} />
        {!userId && (
          <div className="flex flex-row gap-2">
            <Link href="/sign-in">
              <Button size="sm" variant="outline">
                <p>Me connecter</p>
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button size="sm" variant="default">
                <p>Créer un compte</p>
              </Button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};
