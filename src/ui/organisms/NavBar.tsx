import React from "react";
import { ShoppingCart } from "lucide-react";
import type { Route } from "next";
import { SearchBox } from "@/ui/atoms/SearchBox";
import { ActiveLink } from "@/ui/atoms/ActiveLink";

const navLinks = [
	{ href: "/", label: "Home", match: true },
	{ href: "/products", label: "All Products", match: false },
	{ href: "/collections", label: "Collections", match: false },
	{ href: "/categories", label: "Categories", match: false },
];

export async function NavBar() {
	return (
		<nav className="scrolling-touch scroll-shadows -mx-2 flex overflow-x-scroll lg:mx-0 lg:h-16 lg:overflow-x-auto">
			<div className="flex flex-col justify-between gap-y-4 pb-4 lg:flex-row lg:items-center lg:pb-0">
				<ul className="flex h-16 max-w-full flex-1 justify-center space-x-8 whitespace-nowrap p-5 lg:px-8">
					{navLinks.map((link) => (
						<li key={link.label}>
							<ActiveLink
								href={link.href as Route}
								activeClassName="text-blue-700 underline"
								match={link.match}
							>
								{link.label}
							</ActiveLink>
						</li>
					))}
				</ul>

				<div className="flex flex-1 flex-col gap-x-2 pb-4 lg:flex-row lg:items-center lg:pb-0">
					<ShoppingCart />
					<SearchBox />
				</div>
			</div>
		</nav>
	);
}
