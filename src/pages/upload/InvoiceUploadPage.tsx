import {Alert, Button, Container, FileInput, Loader, Paper, Title} from "@mantine/core";
import {useState} from "react";
import {uploadInvoice} from "@/service/InvoiceUploadService.tsx";
import type {UploadResponse} from "@/types/UploadResponse.tsx";
import type {ApiResponse} from "@/types/ApiResponse.ts";

export default function InvoiceUploadPage() {

    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [blobUrl, setBlobUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleUploadClick = async () => {
        if (!file) return;

        try {
            setLoading(true);
            setError(null);
            setBlobUrl(null);

            const response: ApiResponse<UploadResponse> = await uploadInvoice(file);
            console.log("response: " + response);
            const blobUrl = response.data.blobUrl;
            setBlobUrl(blobUrl);
        } catch (e) {
            if (e instanceof Error) {
                setError(e.message);
            } else {
                setError("Unexpected error.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container size="sm" py="xl">
            <Paper shadow="sm" p="xl" radius="md">

                {error && <Alert color="red">{error}</Alert>}
                {blobUrl && <Alert color={"green"}>Invoice uploaded successfully: {blobUrl}</Alert>}

                <Title order={2}>
                    Upload Invoice
                </Title>

                <h1 className={"text-sm"}>
                    Upload a PDF invoice to Azure Blob Storage.
                </h1>

                <FileInput
                mt="xl"
                label="Invoice"
                accept="application/pdf"
                value={file}
            onChange={setFile}
            disabled={loading}
            />

            <Button
                mt="xl"
                fullWidth

                onClick={handleUploadClick}
            >
                {loading && <Loader />}Upload
            </Button>
            </Paper>
        </Container>
    );
}