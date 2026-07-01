import {Anchor} from "@mantine/core";

interface ErrorPageProps {
    errorMessage?: string;
}

export default function ErrorPage({errorMessage}: ErrorPageProps) {
    return (
        <div className={"flex items-center justify-center gap-4 text-lg"}>
            <div className={"flex flex-col items-center justify-center"}>
                <h3 className={"text-red-600 font-bold"}>{errorMessage ?? "Error 404, Page not Found."}</h3>
                <Anchor href={"../"}>Go back</Anchor>
            </div>
        </div>
    )
}