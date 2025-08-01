import { ApiUrls } from "@api/api-urls";
import { apiConfig } from "@api/config";

export const GeneralService = {
  async updateLessonStatus(id: number, model: any) {
    const res = await apiConfig().patchRequest(
      `${ApiUrls.LESSONS}/${id}/status`,
      model
    );
    return res;
  },
};
