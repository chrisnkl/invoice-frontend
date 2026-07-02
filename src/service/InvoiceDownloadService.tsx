export async function downloadInvoice(fileName: string): Promise<Blob> {
    const invoiceFunctionUrl = import.meta.env.VITE_INVOICE_FUNCTION_URL;

    if (!invoiceFunctionUrl) {
        throw new Error("VITE_INVOICE_FUNCTION_URL is not set.");
    }

    const response = await fetch(
        `${invoiceFunctionUrl}/invoices/${fileName}`
    );

    if (!response.ok) {
        throw new Error("Unable to download invoice.");
    }

    return await response.blob();
}