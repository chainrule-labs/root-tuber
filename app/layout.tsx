import "../styles/globals.css";
import { ReactNode } from "react";
import Providers from "../providers";
import Header from "../components/Header";

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en">
			<head>
				<title>Root Tuber</title>
				<meta
					content="Automatically save every time you transact Rootstock."
					name="description"
				/>
				<link href="/favicon.ico" rel="icon" />
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="/apple-touch-icon.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href="/favicon-32x32.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="16x16"
					href="/favicon-16x16.png"
				/>
				<link rel="manifest" href="/site.webmanifest" />
				<link
					rel="mask-icon"
					href="/safari-pinned-tab.svg"
					color="#f09637"
				/>
				<meta name="msapplication-TileColor" content="#ffffff" />
				<meta name="theme-color" content="#ffffff" />
			</head>
			<body className="flex h-screen w-full flex-col items-center">
				<Providers>
					<main className="flex w-screen max-w-5xl h-screen flex-col items-center px-4">
						<Header />
						{children}
					</main>
				</Providers>
			</body>
		</html>
	);
}
