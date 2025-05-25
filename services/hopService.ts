import {
  deleteHop,
  deleteSelectedHop,
  getAllHops,
  getAllSelectedHops,
  insertHop,
  insertSelectedHopAmount,
} from "@/database/queries";
import { refreshData } from "./logicService";

export const HopService = {
  async fetchAll() {
    return refreshData(getAllHops);
  },

  async addHop(name: string, alphaAcid: number, origin: string) {
    await insertHop(name, alphaAcid, origin);
  },

  async removeHop(id: number) {
    await deleteHop(id);
  },

  async fetchAllSelected() {
    return refreshData(getAllSelectedHops);
  },

  async insertHopAmount(foreignId: number, amountInGrams: number) {
    await insertSelectedHopAmount(foreignId, amountInGrams);
  },
  async removeSelectedHop(id: number) {
    await deleteSelectedHop(id);
  },
};

//THIS LAYER EXISTS TO FACILITATE TESTING, VIA MOCKS
//OR TO ADD ADDITIONAL LOGIC/ERRORHANDLING/FUNCTIONALITY
