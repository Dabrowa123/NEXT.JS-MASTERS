import { notFound } from "next/navigation";
import { executeGraphql } from "@/api/graphqlApi";
import { ProductList } from "@/ui/organisms/ProductList";
import { ProductsGetBySearchDocument } from "@/gql/graphql";

export default async function SearchPage({ searchParams }: { searchParams: { query: string } }) {
	const graphqlResponse = await executeGraphql(ProductsGetBySearchDocument, {
		search: searchParams.query,
	});
	if (!graphqlResponse) {
		notFound();
	}
	const products = graphqlResponse.products.data;

	return (
		<>
			{products &&<ProductList products={products} />}
		</>
	);
}
