import type {ApiResponse} from "@/types/ApiResponse.ts";
import type {UploadResponse} from "@/types/UploadResponse.tsx";

export async function uploadInvoice(file: File): Promise<ApiResponse<UploadResponse>> {
    console.log('uploading invoice with content length: ' + file.size);
    const invoiceFunctionUrl = import.meta.env.VITE_INVOICE_FUNCTION_URL;
    if (!invoiceFunctionUrl) throw Error("VITE_INVOICE_FUNCTION_URL is currently not set.");
    const fileName = encodeURIComponent(file.name);

    try {
        const response = await fetch(`${invoiceFunctionUrl}/invoices`, {
            method: "POST",
            headers: {
                "Content-Type": "application/pdf",
                "File-Name": fileName,
            },
            body: file,
        });

        console.log("Fetch completed", response);

        return await response.json();

    } catch (e) {
        console.error("Fetch failed:", e);
        throw e;
    }

}