import { Product } from "@/interfaces";
import { initialData } from "@/seed/seed";

export const FetchApi = async (): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Initial data products: ", initialData.products);
      resolve(initialData.products);
    }, 1000);
  });
};
