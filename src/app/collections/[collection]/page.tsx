import { notFound } from "next/navigation";
import { executeGraphql } from "@/api/graphqlApi";
import { ProductsGetByCollectionDocument } from "@/gql/graphql";
import { ProductList } from "@/ui/organisms/ProductList";
import { Collections } from "@/ui/molecules/Collections";

export const generateMetadata = () => {
	return {
		title: `Collections`,
	};
};

export default async function ProductCollectionsPage({
	params,
}: {
	params: { collection: string };
}) {
	const data = await executeGraphql(ProductsGetByCollectionDocument, {
		slug: params.collection,
	});

	const products = data.collection?.products;

	if (!products) {
		notFound();
	}

	return (
		<>
			<div>
				<Collections />
				<h1 role="heading">Collections</h1>
				<ProductList products={products} />
			</div>
		</>
	);
}
