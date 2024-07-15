import { EllipsisVertical } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export function Footer() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="hover:bg-blue-ribbon-700">
          <EllipsisVertical className="text-white" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-white">
        <DropdownMenuGroup>
          <DropdownMenuItem className="hover:bg-white-100">
            <Link href="/">
              <span className="font-manrope">Mentions Légale</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:bg-white-100">
            <Link href="/">
              <span className="font-manrope">
                Politique de confidentialitée
              </span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:bg-white-100">
            <Link href="/">
              <span className="font-manrope">Politique de cookie</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
