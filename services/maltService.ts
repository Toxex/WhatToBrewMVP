import {
  deleteMalt,
  deleteSelectedMalt,
  getAllMalt,
  getAllSelectedMalt,
  insertMalt,
  insertSelectedMaltAmount,
} from "@/database/queries";
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

  async fetchAllSelected() {
    return refreshData(getAllSelectedMalt);
  },
  async insertMaltAmount(foreignId: number, amount: number) {
    await insertSelectedMaltAmount(foreignId, amount);
  },
  async removeSelectedMalt(id: number) {
    await deleteSelectedMalt(id);
  },
};

//THIS LAYER EXISTS TO FACILITATE TESTING, VIA MOCKS
//OR TO ADD ADDITIONAL LOGIC/ERRORHANDLING/FUNCTIONALITY
