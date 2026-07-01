import { Outlet } from "react-router-dom"
import Header from "@/components/header/Header.tsx";
import Footer from "@/components/footer/Footer.tsx";
import ErrorPage from "@/pages/error/ErrorPage.tsx";

interface LayoutProps {
    isError?: boolean;
    errorMessage?: string;
}

export default function Layout(props: LayoutProps) {

    return (
        <div className={"font-medium flex flex-col justify-between min-h-screen"}>
            <Header/>
            {props.isError ? <ErrorPage/> : <Outlet/>}
            <Footer/>
        </div>
    )


}