import { ProductList } from "@/ui/organisms/ProductList";
import { type ProductItemType } from "@/types";

export default async function ProductsPage() {
	const response = await fetch("https://naszsklep-api.vercel.app/api/products?take=20");
	const products = (await response.json()) as ProductItemType[];

	return <ProductList products={products} />;
}
