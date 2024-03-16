import { getSortedProductsList } from "@/api/products";
import { type Product } from "@/gql/graphql";
import { SortBy } from "@/ui/atoms/SortBy";
import { Pagination } from "@/ui/molecules/Pagination";

import { ProductList } from "@/ui/organisms/ProductList";

export default async function ProductsPage({
	params,
	searchParams,
}: {
	params: {
		pageNumber: string[];
	};
	searchParams: { sortBy: string };
}) {
	const offset =
		params.pageNumber && params.pageNumber[0] !== "1" ? Number(params.pageNumber[0]) * 4 : 0;

	const order = () => {
		if (!searchParams.sortBy || searchParams.sortBy === "no-sort") return undefined;
		if (searchParams.sortBy.includes("-asc")) return "ASC";
		else return "DESC";
	};

	const orderBy = () => {
		if (!searchParams.sortBy || searchParams.sortBy === "no-sort") return undefined;
		if (searchParams.sortBy.startsWith("price")) return "PRICE";
		if (searchParams.sortBy.startsWith("rat")) return "RATING";
	};

	const products = await getSortedProductsList(4, offset, order(), orderBy());

	const getQueryParams = () => {
		if (searchParams.sortBy) {
			return `sortBy=${searchParams.sortBy}`;
		}
		return "";
	};

	return (
		<div>
			<SortBy />
			<ProductList products={products?.products?.data as Product[]} />
			<Pagination
				totalPages={products?.products?.meta?.total / 4}
				linkTo="products"
				queryParams={getQueryParams()}
			/>
		</div>
	);
}
