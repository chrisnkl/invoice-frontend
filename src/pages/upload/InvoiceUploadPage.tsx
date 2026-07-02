import {Alert, Button, Container, Input, Loader, Paper, Title} from "@mantine/core";
import {useState} from "react";
import {uploadInvoice} from "@/service/InvoiceUploadService.tsx";
import type {UploadResponse} from "@/types/UploadResponse.tsx";
import type {ApiResponse} from "@/types/ApiResponse.ts";

export default function InvoiceUploadPage() {

    const [fileName, setFileName] = useState<string | undefined>(undefined);
    const [content, setContent] = useState<string | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);
    const [blobUrl, setBlobUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleUploadClick = async () => {
        if (!fileName || !content) return;

        try {
            setLoading(true);
            setError(null);
            setBlobUrl(null);

            const response: ApiResponse<UploadResponse> = await uploadInvoice(fileName, content);
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
                    Upload a .TXT invoice to Azure Blob Storage.
                </h1>

                <Input
                mt="xl"
                placeholder="Enter invoice name"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                disabled={loading}
                />

                <Input
                mt="xl"
                placeholder="Enter invoice content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                disabled={loading}
                />

            <Button
                mt="xl"
                fullWidth

                onClick={handleUploadClick}
            >
                {loading && <Loader />}Upload TXT Invoice
            </Button>
            </Paper>
        </Container>
    );
}