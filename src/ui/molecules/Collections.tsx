import React from "react";
import type { Route } from "next";
import { ActiveLink } from "@/ui/atoms/ActiveLink";

const collectionLinks = [
	{ href: "/collections/summer-vibes", label: "summer vibes", match: false },
	{ href: "/collections/new-arrivals", label: "new arrivals", match: false },
	{ href: "/collections/elegant-extras", label: "elegant extras", match: false },
];

export async function Collections() {
	return (
		<div className="flex flex-col justify-between gap-y-4 pb-4 lg:flex-row lg:items-center lg:pb-0">
			<ul className="flex h-16 max-w-full flex-1 justify-center space-x-8 whitespace-nowrap p-5 lg:px-8">
				{collectionLinks.map((link) => (
					<li key={link.label}>
						<ActiveLink
							href={link.href as Route}
							activeClassName="text-blue-700 underline"
							match={link.match}
						>
							<p>{link.label}</p>
						</ActiveLink>
					</li>
				))}
			</ul>
		</div>
	);
}
