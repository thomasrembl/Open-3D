"use client";

import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { set } from "zod";

interface CourseEnrollButtonProps {
  courseId: string;
  price: number | null;
}

const CourseEnrollButton = ({ courseId, price }: CourseEnrollButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
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
