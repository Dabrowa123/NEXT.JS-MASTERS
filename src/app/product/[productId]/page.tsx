import { Suspense } from "react";
import { notFound } from "next/navigation";
import { type Metadata } from "next";
import { ProductCoverImage } from "@/ui/atoms/ProductCoverImage";
import { ProductListItemDescription } from "@/ui/atoms/ProductListItemDescription";
import { SuggestedProductsList } from "@/ui/organisms/SuggestedProductsList";
import { ProductGetByIdDocument } from "@/gql/graphql";
import { executeGraphql } from "@/api/graphqlApi";
import { getProductsList } from "@/api/products";
import { AddReviewForm } from "@/ui/atoms/AddReviewForm";

export const generateStaticParams = async () => {
	const products = await getProductsList();
	return products.map((product) => ({
		productId: product.id,
	}));
};

export const generateMetadata = async ({
	params,
}: {
	params: { productId: string };
}): Promise<Metadata> => {
	const { product } = await executeGraphql(ProductGetByIdDocument, {
		id: params.productId,
	});
	if (!product) {
		notFound();
	}
	return {
		title: `${product.name}`,
		description: product.description,
		openGraph: {
			title: `${product.name}`,
			description: product.description,
			images: product.images[0] && [product.images[0].url],
		},
	};
};

export default async function SingleProductPage({ params }: { params: { productId: string } }) {
	const { product } = await executeGraphql(ProductGetByIdDocument, {
		id: params.productId,
	});
	if (!product) {
		notFound();
	}

	return (
		<>
			<article>
				<div className="flex gap-6">
					<div className="max-w-l">
						{product.images[0] && <ProductCoverImage src={product.images[0].url} alt="" />}
					</div>
					<div className="gap-6">
						<h1 className="text-3xl font-bold text-blue-900">{product.name}</h1>
						<ProductListItemDescription product={product} />
						<p className="text-lg font-medium text-blue-950">{product.description}</p>
					</div>
				</div>
			</article>
			<aside data-testid="related-products" className="mt-10">
				<Suspense fallback={"Loading..."}>
					<SuggestedProductsList />
				</Suspense>
			</aside>
			<AddReviewForm />
		</>
	);
}
