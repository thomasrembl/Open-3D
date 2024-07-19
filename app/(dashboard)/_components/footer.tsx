import { EllipsisVertical, ExternalLink } from "lucide-react";

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
            <Link
              href="/"
              target="_blank"
              className="flex items-center  justify-between w-full"
            >
              <span className="font-manrope">Contact</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:bg-white-100">
            <Link
              href={
                "https://adhesive-hosta-2a0.notion.site/Mentions-L-gales-547f185cf9ce4869801fcf717b4d4aee?pvs=4"
              }
              target="_blank"
              className="flex items-center  justify-between w-full"
            >
              <span className="font-manrope">Mentions légales</span>
              <ExternalLink className="ml-2 w-[20px]" />
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:bg-white-100">
            <Link
              href={
                "https://adhesive-hosta-2a0.notion.site/Politique-de-confidentialit-22e3038ccb904f6eb3e2bbe2d6ac8058?pvs=4"
              }
              target="_blank"
              className="flex items-center  justify-between w-full"
            >
              <span className="font-manrope">Politique de confidentialité</span>
              <ExternalLink className="ml-2 w-[20px]" />
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:bg-white-100 ">
            <Link
              href="https://adhesive-hosta-2a0.notion.site/Conditions-G-n-rales-de-Vente-b705d0470bd941ffb9ec710c1ca8c9bc?pvs=4"
              target="_blank"
              className="flex items-center justify-between w-full"
            >
              <span className="font-manrope">
                Conditions Générales de Vente
              </span>
              <ExternalLink className="ml-2 w-[20px]" />
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:bg-white-100">
            <Link
              href="https://adhesive-hosta-2a0.notion.site/Condition-G-n-ral-d-utilisation-aee2890acb66496bac70bfc22b1ac73e?pvs=4"
              target="_blank"
              className="flex items-center"
            >
              <span className="font-manrope">
                Condition général d&apos;utillisation
              </span>
              <ExternalLink className="ml-2 w-[20px]" />
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:bg-white-100">
            <Link
              href="https://adhesive-hosta-2a0.notion.site/Politique-de-Cookie-a68bdc32183b4ed19163285a95e7a288?pvs=4"
              target="_blank"
              className="flex items-center justify-between w-full"
            >
              <span className="font-manrope">Politique de cookies</span>
              <ExternalLink className="ml-2 w-[20px]" />
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
