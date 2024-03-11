import { redirect } from "next/navigation";
import { Pagination } from "@/ui/molecules/Pagination";
import { ProductList } from "@/ui/organisms/ProductList";
import { getProductsByPage, getProductsList } from "@/api/products";

export default async function ProductsPage({ params }: { params: { page: number } }) {
	const allProducts = await getProductsList();
	const allProductsNumber = allProducts.length;
	const productsPerPage = 4;
	const totalPages = Math.ceil(allProductsNumber / productsPerPage);
	const products = await getProductsByPage(params.page);

	if (!params.page || isNaN(Number(params.page)) || Number(params.page) <= 0) {
		return redirect("/products");
	}

	return (
		<div>
			<Pagination totalPages={totalPages} />
			<ProductList products={products} />
		</div>
	);
}