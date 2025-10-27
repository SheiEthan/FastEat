import clients from "../../data/clients.json";
import type { Client } from "~/modules/client/types";


export default defineEventHandler(async (event) => {
  return clients as Client[];
});