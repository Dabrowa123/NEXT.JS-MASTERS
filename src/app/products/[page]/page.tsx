import { Pagination } from "@/ui/molecules/Pagination";
import { ProductList } from "@/ui/organisms/ProductList";
import { type ProductItemType } from "@/types";

export async function generateStaticParams() {
	let currentPage = 1;
	const staticParams = [];

	while (true) {
		const response = await fetch(
			`https://naszsklep-api.vercel.app/api/products?take=20&offset=${currentPage}`,
		);
		if (!response.ok) {
			break;
		}
		const newProductsPage = (await response.json()) as ProductItemType[];
		if (newProductsPage.length === 0) {
			break;
		}
		if (currentPage === 100) {
			break;
		}
		staticParams.push({ page: currentPage.toString() });

		currentPage++;
	}

	return staticParams;
}

export default async function ProductsPage({ params }: { params: { page: number } }) {
	const totalPages = (await generateStaticParams()).length;
	const response = await fetch(
		"https://naszsklep-api.vercel.app/api/products?take=1000&offset=" + params.page,
	);
	const products = (await response.json()) as ProductItemType[];

	return (
		<div>
			<Pagination totalPages={totalPages} currentPage={params.page} />
			<ProductList products={products} />
		</div>
	);
}