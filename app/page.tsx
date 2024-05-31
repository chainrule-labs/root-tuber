"use client";

import { useRouter } from "next/navigation";

export default function Landing() {
	const router = useRouter();

	return (
		<div className="flex w-full pt-10 flex-1 flex-col">
			<h1 className="text-2xl max-w-sm w-full">
				Automatically save every time you transact on Rootstock.
			</h1>
			<button
				className="bg-primary-100 mt-10 hover:bg-primary-200 h-14 w-36 rounded-full text-lg"
				onClick={() => router.push("/home")}
			>
				Get Started
			</button>
		</div>
	);
}
