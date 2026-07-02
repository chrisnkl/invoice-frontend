import type {ApiResponse} from "@/types/ApiResponse.ts";
import type {UploadResponse} from "@/types/UploadResponse.tsx";

export async function uploadInvoice(fileName: string, content: string): Promise<ApiResponse<UploadResponse>> {
    console.log('uploading ' + fileName + ' with content length: ' + content.length);
    const invoiceFunctionUrl = import.meta.env.VITE_INVOICE_FUNCTION_URL;
    if (!invoiceFunctionUrl) throw Error("VITE_INVOICE_FUNCTION_URL is currently not set.");

    try {
        const response = await fetch(`${invoiceFunctionUrl}/invoices`, {
            method: "POST",
            headers: {
                "content-type": "text/plain",
                "file-name": fileName,
            },
            body: content,
        });

        console.log("Fetch completed", response);

        return await response.json();

    } catch (e) {
        console.error("Fetch failed:", e);
        throw e;
    }

}