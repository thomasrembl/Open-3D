"use client";

import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface CourseEnrollButtonProps {
  courseId: string;
  price: number | null;
  isFree: boolean;
}

const CourseEnrollButton = ({
  courseId,
  price,
  isFree,
}: CourseEnrollButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const onClick = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(`/api/courses/${courseId}/checkout`);
      window.location.assign(response.data.url);
    } catch {
      toast.error("Une erreur est survenue");
    } finally {
      setIsLoading(false);
    }
  };
  const onFreeClick = async () => {
    try {
      setIsLoading(true);
      await axios.post(`/api/courses/${courseId}/free-checkout`, courseId);
      toast.success("Cours débloqué");
      setIsLoading(false);
      router.refresh();
    } catch {
      toast.error("Une erreur est survenue");
      setIsLoading(false);
    }
  };
  if (isFree) {
    return (
      <Button
        onClick={onFreeClick}
        disabled={isLoading}
        size="sm"
        className="w-full md:w-auto"
      >
        Débloquer gratuitement
      </Button>
    );
  }

  if (price) {
    return (
      <Button
        onClick={onClick}
        disabled={isLoading}
        size="sm"
        className="w-full md:w-auto"
      >
        Débloquer pour {formatPrice(price)}
      </Button>
    );
  }
};

export default CourseEnrollButton;
