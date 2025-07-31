import { IOrder } from "../types";

export function getPaymentMethod(order: IOrder): Set<string> {
    const payments = order.invoices.map(invoice => {
        const type = invoice.paymentMethod?.type;
        const mask = invoice.paymentMethod?.mask;
        if (type && mask && !["paypal", "sezzle"].includes(type.toLowerCase())) {
            return `${type} ${mask.slice(-4)}`;
        } else if (type) {
            return type;
        } else {
            return "Unknown Payment Method";
        }
    });
    
    return new Set(payments);
}