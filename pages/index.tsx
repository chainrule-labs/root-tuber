import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
	return (
		<div className="flex flex-col h-full w-full bg-red-200">
			<Head>
				<title>Root Tube</title>
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
			</Head>

			<main className="flex flex-col w-full bg-green-200">
				<ConnectButton />

				<h1 className="text-red-900">
					Welcome to <a href="">RainbowKit</a> + <a href="">wagmi</a>{" "}
					+ <a href="https://nextjs.org">Next.js!</a>
				</h1>

				<p className="text-green-900">Get started stuff</p>
			</main>

			<footer className="flex w-full">
				<a
					href="https://chainrule.io"
					rel="noopener noreferrer"
					target="_blank"
				>
					Made with ❤️ by Chain Rule
				</a>
			</footer>
		</div>
	);
};

export default Home;
