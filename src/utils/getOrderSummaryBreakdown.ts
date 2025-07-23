import { Invoice } from "../types";


/* Input: Invoice */

/* @Object { "Subtotal" : invoice.subTotal,
            "Tax": invoice.salesTaxCharge,
            "{shippingMethodType}": invoice.shippingCharge,
            ""
} */


export function getOrderSummaryBreakdown(invoice: Invoice): Record<string, number> {
    return {
        "Subtotal": invoice.subTotal,
        "Tax": invoice.salesTaxCharge,
        [invoice.shippingMethodType || "Shipping"]: invoice.shippingCharge,
    };
}