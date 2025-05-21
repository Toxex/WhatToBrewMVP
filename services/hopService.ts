import { getAllHops, insertHop, deleteHop } from "@/database/queries";
import { refreshData } from "./logicService";

export const HopService = {
  async fetchAll() {
    return refreshData(getAllHops);
  },

  async addHop(
    name: string,
    alphaAcid: number,
    origin: string,
    amountInGrams: number
  ) {
    await insertHop(name, alphaAcid, origin, amountInGrams);
  },

  async removeHop(id: number) {
    await deleteHop(id);
  },
};
