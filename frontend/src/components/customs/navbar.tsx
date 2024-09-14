"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useLogoutFunction, useRedirectFunctions, withAuthInfo, WithAuthInfoProps } from "@propelauth/react";

const NavigationMenuDemo = withAuthInfo((props: WithAuthInfoProps) => {
	const pathname = usePathname();
	const logoutFunction = useLogoutFunction();
	const { redirectToLoginPage, redirectToSignupPage, redirectToAccountPage } = useRedirectFunctions();

	const items = [
		{
			title: "Dashboard",
			link: "/dashboard",
		},
		{
			title: "Settings",
			link: "/settings",
		},
	];

	return (
		<nav className="mb-3 min-h-[50px] border-[1px] rounded-lg grid sm:grid-cols-12 items-center p-2">
			<Link href="/" className="sm:col-span-1 font-bold w-fit">
				VTHacks 12
			</Link>
			<div className="sm:col-span-9 flex flex-row gap-2">
				{items.map((item) => (
					<Link href={item.link} key={item.link}>
						<div
							className={cn({
								"border-[0px] hover:bg-accent hover:cursor-pointer w-fit p-3 col-span-1 text-center py-2 rounded-lg font-medium hover:font-semibold":
									true,
								"bg-accent": item.link == pathname,
							})}
						>
							{item.title}
						</div>
					</Link>
				))}
			</div>
			<div className="sm:col-span-2">
				{props.isLoggedIn ? (
					<div className="flex gap-4 space-x-1">
						<div className="flex items-center space-x-1 hover:cursor-pointer" onClick={() => redirectToAccountPage()}>
							<div className="w-8 h-8 flex items-center justify-center bg-gray-500 rounded-full text-white">
								<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v1h16v-1c0-2.66-5.33-4-8-4z"></path></svg>
							</div>
							<div>
								<p className="text-md font-semibold">{props.user.firstName}</p>
							</div>
						</div>
						<div
							onClick={() => logoutFunction(true)}
							className="border-[1px] hover:bg-accent hover:cursor-pointer w-fit p-3 col-span-1 text-center py-2 rounded-lg font-bold"
						>
							Logout
						</div>
					</div>
				) : (
					<>
						<button
							onClick={() => redirectToLoginPage()}
							className="border-[1px] hover:bg-accent hover:cursor-pointer w-fit p-3 col-span-1 text-center py-2 rounded-lg font-bold mx-3"
						>
							Login
						</button>
						<button
							onClick={() => redirectToSignupPage()}
							className="border-[1px] hover:bg-accent hover:cursor-pointer w-fit p-3 col-span-1 text-center py-2 rounded-lg font-bold"
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