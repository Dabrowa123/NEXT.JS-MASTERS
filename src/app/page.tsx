import { ProductList } from "@/ui/organisms/ProductList";
import { getProductsList } from "@/api/products";
import { type Product } from "@/gql/graphql";

export default async function Home() {
	const allProducts = await getProductsList();

	return (
		<div>
			<a href="/collections/">Collections</a>
			<ProductList products={allProducts as Product[]} />
		</div>
	);
}
