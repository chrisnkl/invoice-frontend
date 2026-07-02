import { useState } from 'react';
import {Button, TextInput, Container, Alert, Paper, Title} from '@mantine/core';
import {downloadInvoice} from "@/service/InvoiceDownloadService.tsx";

export default function InvoiceDownloadPage() {
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

    const handleDownload = async () => {
        if (!fileName.trim()) {
            setError("Please enter a filename.");
            return;
        }

        try {
            setLoading(true);
            setError("");

            const blob = await downloadInvoice(fileName);

            const url = URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = url;
            link.download = fileName;
            link.click();

            URL.revokeObjectURL(url);

        } catch (e) {
            setError(e instanceof Error ? e.message : "Unexpected error.");
        } finally {
            setLoading(false);
        }
    };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleDownload();
    }
  };

  return (
      <Container size="sm" py="xl">

          <Paper shadow="sm" p="xl" radius="md">
            <Title order={2}>
                Download Invoice
            </Title>
            <h1 className={"text-sm"}>
                Download a .TXT invoice from the Azure Blob Storage.
            </h1>

        <TextInput
          label="Filename"
          placeholder="e.g., invoice.txt"
          value={fileName}
          onChange={(e) => setFileName(e.currentTarget.value)}
          onKeyPress={handleKeyPress}
          disabled={loading}
        />

        <Button 
          onClick={handleDownload} 
          loading={loading}
          fullWidth
          disabled={loading}
        >
          Download TXT
        </Button>
            {error && <Alert color="red">{error}</Alert>}
        </Paper>
    </Container>
  );
}

