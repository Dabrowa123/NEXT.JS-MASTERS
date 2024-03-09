import { Pagination } from "@/ui/molecules/Pagination";
import { ProductList } from "@/ui/organisms/ProductList";
import { type ProductItemType } from "@/types";

export default async function ProductsPage({ params }: { params: { page: number } }) {
	const response = await fetch(
		"https://naszsklep-api.vercel.app/api/products?take=20&offset=" + params.page,
	);
	const products = (await response.json()) as ProductItemType[];

	return (
		<div>
			<Pagination currentPage={params.page} />
			<ProductList products={products} />
		</div>
	);
}
