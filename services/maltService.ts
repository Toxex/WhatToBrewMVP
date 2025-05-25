import { deleteMalt, getAllMalt, insertMalt } from "@/database/queries";
import { refreshData } from "./logicService";

export const MaltService = {
  async fetchAll() {
    return refreshData(getAllMalt);
  },

  async addMalt(name: string, ebc: number, origin: string) {
    await insertMalt(name, ebc, origin);
  },

  async removeMalt(id: number) {
    await deleteMalt(id);
  },
};
