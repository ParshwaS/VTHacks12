"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });
import { ThemeProvider } from "@/components/themeProvider";
import Navbar from "@/components/customs/navbar";
import { AuthProvider } from "@propelauth/react";
import Footer from "@/components/customs/footer";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<title>VTHacks12</title>
			</head>
			<body className={inter.className}>
				<AuthProvider authUrl={process.env.NEXT_PUBLIC_AUTH_URL!}>
					<ThemeProvider
						attribute="class"
						enableColorScheme
						enableSystem
					>
						<Navbar />
						{children}
						<Footer />
					</ThemeProvider>
				</AuthProvider>
			</body>
		</html>
	);
}
