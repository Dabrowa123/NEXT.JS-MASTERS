import React from "react";
import { type Route } from "next";
// import { type ProductItemType } from "@/types";
import { ActiveLink } from "@/ui/atoms/ActiveLink";

interface PaginationProps {
	// productsPages: ProductItemType[][];
	totalPages: number;
	currentPage: number;
}

export const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage }) => {
	// const totalPages = productsPages.length;
	const nextPage = currentPage + 1;
	const prevPage = currentPage - 1;
	let startPage = Math.max(1, currentPage - 1);
	const endPage = Math.min(totalPages, startPage + 2);
	if (endPage - startPage < 2) {
		startPage = Math.max(1, endPage - 2);
	}

	return (
		<nav aria-label="pagination">
			<ul className="flex items-center space-x-4">
				{currentPage > 1 && (
					<li>
						<ActiveLink href={`/products/${prevPage}` as Route} className="pagination-link">
							Prev
						</ActiveLink>
					</li>
				)}
				{Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index).map(
					(page) => (
						<li key={page}>
							<ActiveLink
								href={`/products/${page}` as Route}
								className={`pagination-link${page === currentPage ? " active" : ""}`}
							>
								{page}
							</ActiveLink>
						</li>
					),
				)}
				{currentPage < totalPages && (
					<li>
						<ActiveLink href={`/products/${nextPage}` as Route} className="pagination-link">
							Next
						</ActiveLink>
					</li>
				)}
			</ul>
		</nav>
	);
};
