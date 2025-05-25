import {
  deleteYeast,
  getAllYeasts,
  insertYeast,
  deleteSelectedYeast,
  getAllSelectedYeasts,
  insertSelectedYeastAmount,
} from "@/database/queries";
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

  async fetchAllSelected() {
    return refreshData(getAllSelectedYeasts);
  },

  async insertYeastAmount(foreignId: number, amountInGrams: number) {
    await insertSelectedYeastAmount(foreignId, amountInGrams);
  },
  async removeSelectedYeast(id: number) {
    await deleteSelectedYeast(id);
  },
};

//THIS LAYER EXISTS TO FACILITATE TESTING, VIA MOCKS
//OR TO ADD ADDITIONAL LOGIC/ERRORHANDLING/FUNCTIONALITY
