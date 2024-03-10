"use client";

import { type Route } from "next";
import { useState } from "react";
import { ActiveLink } from "@/ui/atoms/ActiveLink";

export const Pagination = async ({ currentPage }: { currentPage: number }) => {
	const [hasNextPage, setHasNextPage] = useState(true);
	const nextPage = +currentPage + 1;
	const prevPage = +currentPage - 1;

	const nextPageUrl = `https://naszsklep-api.vercel.app/api/products?take=20&offset=${currentPage + 1}`;
	const response = await fetch(nextPageUrl);
	if (!response.ok) {
		setHasNextPage(false);
	}

	return (
		<nav aria-label="pagination">
			<ul className="flex items-center space-x-4">
				{+currentPage !== 1 && (
					<li>
						<ActiveLink href={`/products/${prevPage}` as Route} className="pagination-link">
							Prev
						</ActiveLink>
					</li>
				)}
				<li>
					<span>Page {currentPage}</span>
				</li>
				{hasNextPage && (
					<li>
						<ActiveLink
							href={`/products/${nextPage}` as Route}
							className="pagination-link"
							activeClassName="active"
						>
							Next
						</ActiveLink>
					</li>
				)}
			</ul>
		</nav>
	);
};
