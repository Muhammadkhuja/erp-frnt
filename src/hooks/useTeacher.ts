import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TeacherService } from "../service/teacher.service";

export const useTeachers = (params?: any, id?: number) => {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    enabled: !!params,
    queryKey: ["teacher", params],
    queryFn: () => TeacherService.getTeachers(params),
  });

  const {
    data: teacherGroupsData,
    isLoading: isLoadingGroups,
    isError: isGroupsError,
  } = useQuery({
    enabled: id === undefined,
    queryKey: ["teacher-groups"],
    queryFn: () => TeacherService.getTeacherGroups(),
  });

  const teacherGroups = teacherGroupsData?.data || [];

  const {
    data: groupStudentsData,
    isLoading: isLoadingStudents,
    isError: isStudentsError,
  } = useQuery({
    enabled: !!id,
    queryKey: ["teacher-group-students", id],
    queryFn: () => TeacherService.getTeacherGroupById(id!),
  });

  const useTeacherCreate = () => {
    return useMutation({
      mutationFn: (data: any) => TeacherService.createTeacher(data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["teacher"] });
      },
    });
  };

  const useTeacherUpdate = () => {
    return useMutation({
      mutationFn: ({ id, model }: { id: number; model: any }) =>
        TeacherService.updateTeacher(model, id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["teacher"] });
      },
    });
  };

  const useDeleteTeacher = () => {
    return useMutation({
      mutationFn: (id: number) => TeacherService.deleteTeacher(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["teacher"] });
      },
    });
  };
return {
  data,
  teacherGroups,
  students: groupStudentsData,
  isLoadingGroups,
  isGroupsError,
  isLoadingStudents,
  isStudentsError,
  useCreateTeacher: useTeacherCreate(),
  useUpdateTeacher: useTeacherUpdate(),
  useDeleteTeacher: useDeleteTeacher(),
};

};