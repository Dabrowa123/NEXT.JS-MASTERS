import { type Metadata } from "next";
import { ProductCoverImage } from "@/ui/atoms/ProductCoverImage";
import { ProductListItemDescription } from "@/ui/atoms/ProductListItemDescription";
import { type ProductItemType } from "@/types";

export async function generateMetadata({
	params,
}: {
	params: { productId: string };
}): Promise<Metadata> {
	const res = await fetch("https://naszsklep-api.vercel.app/api/products/" + params.productId);
	const product = (await res.json()) as ProductItemType;

	return {
		title: `${product.title} - Sklep internetowy`,
		description: product.description,
		openGraph: {
			title: `${product.title} - Sklep internetowy`,
			description: product.description,
			images: product.image,
		},
	};
}

export default async function ProductPage({ params }: { params: { productId: string } }) {
	const response = await fetch("https://naszsklep-api.vercel.app/api/products/" + params.productId);
	const product = (await response.json()) as ProductItemType;

	return (
		<article>
			{/* 89bd9d8d-69a6-474e-8f46-7cc8796ed151 */}
			<div className="flex gap-6">
				<div className="max-w-l">
					{product.image && <ProductCoverImage src={product.image} alt={product.title} />}
				</div>
				<div className="gap-6">
					<h1 className="text-3xl font-bold text-gray-950">{product.title}</h1>
					<ProductListItemDescription product={product} />
					<p className="text-lg font-medium text-gray-700">{product.description}</p>
				</div>
			</div>
		</article>
	);
}
