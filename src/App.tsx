import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './App.css';
import Layout from "./layout/Layout.tsx";
import '@mantine/core/styles.css';
import {MantineProvider} from "@mantine/core";
import InvoiceUploadPage from "@/pages/upload/InvoiceUploadPage.tsx";
import InvoiceDownloadPage from "@/pages/download/InvoiceDownloadPage.tsx";

export default function App() {

  const router = createBrowserRouter([

      {
        path: "/",
        element: <Layout/>,
        errorElement: <Layout isError={true}/>,
        children: [
            {
                index: true,
                element: <InvoiceUploadPage/>
            },
            {
                path: "/upload",
                element: <InvoiceUploadPage/>
            },
            {
                path: "/download",
                element: <InvoiceDownloadPage/>
            }
        ]
      }
  ]);

  return (
      <MantineProvider>
        <RouterProvider router={router}/>
      </MantineProvider>
  );
}