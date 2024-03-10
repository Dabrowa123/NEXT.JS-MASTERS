import React from "react";
import { type Route } from "next";
import { ActiveLink } from "@/ui/atoms/ActiveLink";

export const NavBar = () => {
	return (
		<nav
			role="navigation"
			className="flex items-center justify-between bg-gray-800 px-8 py-4 text-white"
		>
			<ul className="flex space-x-4">
				<li>
					<ActiveLink href="/" activeClassName="text-blue-400 underline" match={true}>
						Home
					</ActiveLink>
				</li>
				<li>
					<ActiveLink
						href={"/products" as Route}
						activeClassName="text-blue-400 underline"
						match={true}
					>
						All Products
					</ActiveLink>
				</li>
			</ul>
		</nav>
	);
};
