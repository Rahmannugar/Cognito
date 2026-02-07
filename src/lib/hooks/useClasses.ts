import { useQuery } from "@tanstack/react-query";
import { classService } from "@/lib/services/classService";

export const useClasses = () => {
  return useQuery({
    queryKey: ["classes"],
    queryFn: classService.getClasses,
  });
};

export const useRecentClasses = () => {
  return useQuery({
    queryKey: ["classes", "recent"],
    queryFn: classService.getRecentClasses,
  });
};

export const useClassById = (id: number | null) => {
  return useQuery({
    queryKey: ["classes", id],
    queryFn: () => classService.getClassById(id!),
    enabled: !!id,
  });
};
