"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useLogoutFunction, useRedirectFunctions, withAuthInfo, WithAuthInfoProps } from "@propelauth/react";
import { title } from "process";
import { link } from "fs";
import Image from "next/image";
import ThemeSwitch from "@/components/themeSwitch";

const NavigationMenuDemo = withAuthInfo((props: WithAuthInfoProps) => {
	const pathname = usePathname();
	const logoutFunction = useLogoutFunction();
	const { redirectToLoginPage, redirectToSignupPage, redirectToAccountPage } = useRedirectFunctions();

	const items = [
		{
			title: "Dashboard",
			link: "/portfolio",
		},
		{
			title: "Analysis",
			link: "/Analysis"
		}
	];
	const acct = props.accessToken;
console.log(acct)



	return (
		<nav className="min-h-[50px] m-2 rounded-lg flex items-center justify-between p-2">
			<div className="flex items-center gap-4">
			<Link href="/" className="flex items-center font-bold w-fit">
				<Image
					alt="Logo"
					src="/logo.png"
					width={60}
					height={60}
					quality={80}
					className="object-cover"
				/>
				<h1 className="ml-2 text-3xl font-serif text-green-950 font-bold">Monocle</h1> {/* Text next to logo */}
			</Link>
			{props.isLoggedIn ? (
				<div className="flex flex-row gap-2">
					{items.map((item) => (
						<Link href={item.link} key={item.link}>
							<div
								className={cn({
									"border-[0px] hover:bg-green-50 hover:cursor-pointer w-fit p-3 col-span-1 text-center py-2 rounded-lg font-medium hover:font-semibold":
										true,
									"bg-green-50": item.link == pathname,
								})}
							>
								{item.title}
							</div>
						</Link>
					))}
				</div>
			) : (
				<div className="flex flex-row gap-2">
					<Link href="/Analysis" key="/Analysis">
						<div
							className={cn({
								"border-[1px] hover:bg-green-50 hover:cursor-pointer w-fit p-3 text-center py-2 rounded-lg font-medium hover:font-semibold":
									true,
								"bg-green-50": "/Analysis" == pathname,
							})}
						>
							Overview
						</div>
					</Link>
				</div>
			)}
			</div>
			<div className="flex gap-2 items-center">
				<ThemeSwitch />
				{props.isLoggedIn ? (
					<div className="flex gap-2 space-x-1">
						<div className="flex items-center space-x-1 hover:cursor-pointer" onClick={() => redirectToAccountPage()}>
							<div className="w-9 h-9 flex items-center justify-center bg-green-900 rounded-full text-white">
								<svg className="w-6 h-6 bg-green-900" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v1h16v-1c0-2.66-5.33-4-8-4z"></path></svg>
							</div>
							<div>
								<p className="text-md font-semibold">{props.user.firstName}</p>
							</div>
						</div>
						<div
							onClick={() => logoutFunction(true)}
							className="border-[1px] hover:bg-green-50 hover:cursor-pointer w-fit p-3 col-span-1 text-center py-2 rounded-lg font-bold"
						>
							Logout
						</div>
					</div>
				) : (
					<>
						
						<button
							onClick={() => redirectToLoginPage()}
							className="border-[1px] hover:bg-green-50 hover:cursor-pointer w-fit p-3 col-span-1 text-center py-2 rounded-lg font-bold mx-3"
						>
							Login
						</button>
						<button
							onClick={() => redirectToSignupPage()}
							className="border-[1px] hover:bg-green-50 hover:cursor-pointer w-fit p-3 col-span-1 text-center py-2 rounded-lg font-bold"
						>
							Sign Up
						</button>
					</>
				)}
			</div>
		</nav>
	);
});

export default NavigationMenuDemo;