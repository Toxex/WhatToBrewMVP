import { deleteYeast, getAllYeasts, insertYeast } from "@/database/queries";
import { refreshData } from "./logicService";

export const YeastService = {
  async fetchAll() {
    return refreshData(getAllYeasts);
  },

  async addYeast(name: string, origin: string, attenuation: number) {
    await insertYeast(name, origin, attenuation);
  },

  async removeYeast(id: number) {
    await deleteYeast(id);
  },
};
