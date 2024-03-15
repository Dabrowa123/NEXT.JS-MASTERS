import { notFound } from "next/navigation";
import NextImage from "next/image";
import { ImageResponse } from "next/og";
import { executeGraphql } from "@/api/graphqlApi";
import { ProductGetByIdDocument } from "@/gql/graphql";

export const runtime = "edge";

export const alt = "About Acme";
export const size = {
	width: 1200,
	height: 630,
};
export const contentType = "image/png";

export default async function Image({ params }: { params: { productId: string } }) {
	const { product } = await executeGraphql(ProductGetByIdDocument, {
		id: params.productId,
	});
	if (!product) {
		notFound();
	}

	return new ImageResponse(
		(
			<div style={{ flexDirection: "row", alignItems: "center" }}>
				<NextImage
					src={product.images[0].url}
					alt={product.name}
					width={100}
					height={100}
					style={{ marginRight: 10 }}
				/>
				<div>
					<p style={{ fontSize: 18, fontWeight: "bold" }}>{product.name}</p>
					<p style={{ fontSize: 16 }}>{product.description}</p>
					<p style={{ fontSize: 16 }}>Category: {product.categories[0].name}</p>
				</div>
			</div>
		),
		{
			...size,
		},
	);
}
