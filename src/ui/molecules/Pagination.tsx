"use client";

import { type Route } from "next";
import { ActiveLink } from "@/ui/atoms/ActiveLink";

export function Pagination({
	totalPages,
	linkTo,
	queryParams,
}: {
	totalPages: number;
	linkTo: string;
	queryParams?: string;
}) {
	const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

	return (
		<nav aria-label="pagination">
			{pageNumbers.map((pageNumber) => (
				<ActiveLink
					key={pageNumber}
					aria-label={`pagination - ${pageNumber}`}
					href={`/${linkTo}/${pageNumber}${queryParams ? `?${queryParams}` : ""}` as Route}
					activeClassName="active"
					match={false}
				>
					{pageNumber}
				</ActiveLink>
			))}
		</nav>
	);
}
