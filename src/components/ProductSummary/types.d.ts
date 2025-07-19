import { Invoice, Item } from "../../types";

export interface ProductSummaryItemProps {
  image: ImageSource;
  subtotal: string;
  tax: string;
  shipping: string;
  cashback: string;
  total: string;
  product: Item;

}

export interface ProductSummaryProps {
  invoice: Invoice;
  products: Item[];
}
