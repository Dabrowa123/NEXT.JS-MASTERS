import React from "react";
import clsx from "clsx";
import { ActiveLink } from "@/ui/atoms/ActiveLink";

export const NavBar = () => {
	return (
		<nav className="flex items-center justify-between bg-gray-800 px-8 py-4 text-white">
			<ul className="flex space-x-4">
				<li>
					<ActiveLink
						href="/"
						className={clsx(`text-blue-400 hover:text-blue-600`)}
						activeClassName="text-white"
					>
						Homepage
					</ActiveLink>
				</li>
				<li>
					<ActiveLink
						href="/products"
						className={clsx(`text-white hover:text-blue-600`)}
						activeClassName="text-blue-400"
					>
						Products
					</ActiveLink>
				</li>
			</ul>
		</nav>
	);
};
