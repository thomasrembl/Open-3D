import { OrganizationProfile } from "@clerk/nextjs";
import { MoveLeft } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <div className="h-[100vh] overflow-scroll py-5">
      <Link href={"/teacher/courses"}>
        <div className="flex flex-row gap-2 mb-3">
          <MoveLeft size={24} />
          <p>Retour</p>
        </div>
      </Link>
      <OrganizationProfile />
    </div>
  );
}
