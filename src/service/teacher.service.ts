import { ApiUrls } from "@api/api-urls";
import { apiConfig } from "@api/config";
import type { Teacher } from "@types";

export const TeacherService = {
  async getTeachers(params: any) {
    const res = await apiConfig().getRequest(ApiUrls.TEACHER, params);
    return res;
  },

  async setImage(data: FormData, id: number) {
    const res = await apiConfig().postRequest(
      `${ApiUrls.TEACHER}/${id}/avatar`,
      data
    );
    return res;
  },

  async getTeacherGroups() {
    const res = await apiConfig().getRequest(`${ApiUrls.GROUP_TEACHERS}/my-groups`);
    return res;
  },

  async getTeacherGroupById(id: number) {
    const res = await apiConfig().getRequest(`${ApiUrls.GROUPS}/${id}/teacher`);
    return res;
  },

  async createTeacher(model: Teacher) {
    const res = await apiConfig().postRequest(ApiUrls.TEACHER, model);
    return res;
  },
  async updateTeacher(model: Teacher, id: number): Promise<any> {
    const res = await apiConfig().patchRequest(
      `${ApiUrls.TEACHER}/${id}`,
      model
    );
    return res;
  },
  async deleteTeacher(id: number) {
    const res = await apiConfig().deleteRequest(`${ApiUrls.TEACHER}/${id}`);
    return res;
  },

  async teacherProfile() {
    const res = await apiConfig().getRequest(`teacher/profile`);
    return res;
  },
};
