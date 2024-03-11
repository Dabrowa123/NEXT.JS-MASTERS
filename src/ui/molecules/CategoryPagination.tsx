import React from "react";
import type { Route } from "next";
import { ActiveLink } from "@/ui/atoms/ActiveLink";

export const CategoryPagination = ({
	totalPages,
	category,
}: {
	totalPages: number;
	category: string;
}) => {
	const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
	return (
		<nav>
			<ul aria-label="category pagination" className="mt-2 flex justify-center space-x-4 pb-4">
				{pages.map((pageNumber) => {
					return (
						<li key={pageNumber}>
							<ActiveLink
								href={`/categories/${category}/${pageNumber}` as Route}
								activeClassName="text-blue-500 underline"
								match
							>
								{pageNumber}
							</ActiveLink>
						</li>
					);
				})}
			</ul>
		</nav>
	);
};
