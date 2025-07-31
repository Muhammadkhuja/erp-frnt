import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TeacherService } from "@service";
import type { Teacher } from "@types";
import { message } from "antd";

// ✅ GET: list of teachers
export const useTeachers = (params: any) => {
  return useQuery({
    queryKey: ["teacher", params],
    queryFn: async () => {
      const res = await TeacherService.getTeachers(params);
      return res;
    },
  });
};

// ✅ CREATE
export const useCreateTeacher = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Teacher) => TeacherService.createTeacher(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teacher"] });
    },
    onError: () => {
      message.error("Failed to create teacher");
    },
  });
};

// ✅ UPDATE
export const useUpdateTeacher = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ model, id }: { model: Teacher; id: number }) =>
      TeacherService.updateTeacher(model, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teacher"] });
    },
    onError: () => {
      message.error("Failed to update teacher");
    },
  });
};

// ✅ DELETE
export const useDeleteTeacher = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => TeacherService.deleteTeacher(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teacher"] });
    },
    onError: () => {
      message.error("Failed to delete teacher");
    },
  });
};

// ✅ SINGLE teacher with groups & students
export const useTeacher = (id?: number) => {
  const { data } = useQuery({
    enabled: !id,
    queryKey: ["teacher-groups"],
    queryFn: async () => TeacherService.getTeacherGroups(),
  });

    // const { data: profile } = useQuery({
    //   queryKey: ["teacher"],
    //   queryFn: async () => TeacherService.teacherProfile(),
    // });

  const { data: students } = useQuery({
    enabled: !!id,
    queryKey: ["teacher-group-students"],
    queryFn: async () => TeacherService.getTeacherGroupById(id!),
  });

  return {
    data,
    students,
    // profile,
  };
};
