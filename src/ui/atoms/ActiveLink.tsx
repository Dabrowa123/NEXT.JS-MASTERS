"use client";

import React from "react";
import Link from "next/link";
import type { Route } from "next";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export const ActiveLink = <T extends Route>({
	href,
	children,
	className,
	activeClassName,
	exact = false,
}: {
	href: T;
	children: React.ReactNode;
	className: string;
	activeClassName: string;
	exact?: boolean;
}) => {
	const pathname = usePathname();
	const isActive = exact ? pathname.startsWith(href) : pathname === href;

	return (
		<Link
			className={clsx(className, isActive && activeClassName)}
			aria-current={isActive ? "page" : undefined}
			href={href}
		>
			{children}
		</Link>
	);
};
