// import { Suspense } from "react";
// import { notFound } from "next/navigation";
// import { ProductCoverImage } from "@/ui/atoms/ProductCoverImage";
// import { ProductListItemDescription } from "@/ui/atoms/ProductListItemDescription";
// import { SuggestedProductsList } from "@/ui/organisms/SuggestedProductsList";
// import { ProductGetByIdDocument, CartAddItemDocument } from "@/gql/graphql";
// import { executeGraphql } from "@/api/graphqlApi";
// import { AddReviewForm } from "@/ui/atoms/AddReviewForm";
// import { getOrCreateCart } from "./page";

// export default async function SingleProductPage({ params }: { params: { productId: string } }) {
// 	const { product } = await executeGraphql(ProductGetByIdDocument, {
// 		id: params.productId,
// 	});
// 	if (!product) {
// 		notFound();
// 	}

// 	async function addProductToCart(cartId: string, productId: string) {
// 		const { product } = await executeGraphql(ProductGetByIdDocument, {
// 			id: productId,
// 		});
// 		if (!product) {
// 			throw new Error(`Product with id ${productId} not found`);
// 		}

// 		await getOrCreateCart();

// 		await executeGraphql(CartAddItemDocument, {
// 			cartId,
// 			input: {
// 				item: {},
// 			},
// 		});
// 	}

// 	return (
// 		<>
// 			<article>
// 				<form className="flex gap-6">
// 					<div className="max-w-l">
// 						{product.images[0] && <ProductCoverImage src={product.images[0].url} alt="" />}
// 					</div>
// 					<div className="gap-6">
// 						<h1 className="text-3xl font-bold text-blue-900">{product.name}</h1>
// 						<ProductListItemDescription product={product} />
// 						<p className="text-lg font-medium text-blue-950">{product.description}</p>
// 					</div>

// 					<input type="text" name="productId" value={product.id} hidden />

// 					<button
// 						type="submit"
// 						className="w-full rounded-md border bg-slate-700 px-8 py-3 text-white"
// 					>
// 						Add to cart
// 					</button>
// 				</form>
// 			</article>
// 			<aside data-testid="related-products" className="mt-10">
// 				<Suspense fallback={"Loading..."}>
// 					<SuggestedProductsList />
// 				</Suspense>
// 			</aside>
// 			<AddReviewForm />
// 		</>
// 	);
// }
