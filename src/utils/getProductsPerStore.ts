import { Invoice, Item } from "../types";

export type ProductSection = {
  storeName: string;
  shippingDate: string;
  products: Item[];
};

// function to process invoices and return products per store

// if only one store, then store name is not needed return "Product Summary"

// if multiple stores, return "{storeName}"

export function getProductsPerStore(invoices: Invoice[]): ProductSection[] {
  const storeCountMap: Record<string, number> = {};
  const productSections: ProductSection[] = [];

  invoices.forEach((invoice) => {
    const storeName = invoice.storeName;
    const shippingDate = invoice.estShipRange;
    const products = invoice.items;

    // Track how many times a store appears
    storeCountMap[storeName] = (storeCountMap[storeName] || 0) + 1;

    productSections.push({
      storeName,
      shippingDate,
      products,
    });
  });

  const isSingleStore = invoices.length === 1;
  const storeInstanceTracker: Record<string, number> = {};

  // Update the store names with shipment number if needed
  const updatedSections = productSections.map((section) => {
    const currentCount = storeInstanceTracker[section.storeName] || 0;
    storeInstanceTracker[section.storeName] = currentCount + 1;

    return {
      ...section,
      storeName: isSingleStore
        ? "Product Summary"
        : (storeCountMap[section.storeName] ?? 0) > 1
        ? `${section.storeName} Shipment ${
            storeInstanceTracker[section.storeName]
          }`
        : section.storeName + " Shipment",
    };
  });

  return updatedSections;
}
