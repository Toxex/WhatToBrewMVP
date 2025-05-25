import {
  deleteHop,
  getAllHops,
  insertHop,
  insertIngredientAmount,
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

  async insertHopAmount(foreignId: number, amountInGrams: number) {
    await insertIngredientAmount(foreignId, amountInGrams);
  },
};
