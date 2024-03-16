"use client";

import React from "react";
import Link from "next/link";
import type { Route } from "next";
import { usePathname } from "next/navigation";
import clsx, { type ClassValue } from "clsx";

export const ActiveLink = <T extends Route>({
	href,
	children,
	activeClassName,
	match,
}: {
	href: T;
	children: React.ReactNode;
	activeClassName?: ClassValue;
	match: boolean;
}) => {
	const pathname = usePathname();
	const isActive = match ? pathname === href : pathname.startsWith(href);

	return (
		<Link
			className={clsx(`text-black hover:text-blue-600`, isActive && activeClassName)}
			aria-current={isActive ? "page" : undefined}
			href={href}
			role="link"
		>
			{children}
		</Link>
	);
};
