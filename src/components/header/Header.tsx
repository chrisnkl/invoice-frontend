import {Link} from "react-router-dom";

export default function Header() {
    return (
        <header className={"py-2 flex items-center flex-wrap justify-evenly h-16 bg-gray-100 shadow-md border-b border-gray-200"}>

            <Link to={"/"} className={"font-medium text-2xl tracking-tight text-sky-500 hover:text-sky-600"}>Invoices</Link>
            <nav className={"flex items-center justify-center space-x-4 uppercase text-sm font-medium text-sky-500"}>

                <Link to={"/upload"} className={"hover:text-sky-600"}>Upload</Link>
                <Link to={"/download"} className={"hover:text-sky-600"}>Download</Link>

            </nav>
        </header>
    );
}