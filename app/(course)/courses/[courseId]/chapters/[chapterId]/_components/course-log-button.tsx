"use client";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";
import Link from "next/link";

interface CourseLogButtonProps {
  price: number | null;
}

const CourseLogButton = ({ price }: CourseLogButtonProps) => {
  return (
    <div>
      <Link href="/sign-in">
        <Button>
          <p> Débloquer pour {formatPrice(price!)}</p>
        </Button>
      </Link>
    </div>
  );
};

export default CourseLogButton;
