/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { type Metadata } from "next";
import { cookies } from "next/headers";
import { ProductCoverImage } from "@/ui/atoms/ProductCoverImage";
import { ProductListItemDescription } from "@/ui/atoms/ProductListItemDescription";
import { SuggestedProductsList } from "@/ui/organisms/SuggestedProductsList";
import {
	ProductGetByIdDocument,
	CartAddItemDocument,
	CartFindOrCreateDocument,
	CartChangeItemQuantityDocument,
	type Product,
} from "@/gql/graphql";
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

async function getOrCreateCart() {
	const currentCookieCartId = cookies().get("cartId")?.value;
	const {
		cartFindOrCreate: { id, items },
	} = await executeGraphql(CartFindOrCreateDocument, {
		id: currentCookieCartId,
	});
	console.log(id);

	if (!id) {
		throw new Error("Failed to find or create cart");
	}

	cookies().set("cartId", id);
	return { id, items };
}

export default async function SingleProductPage({ params }: { params: { productId: string } }) {
	const { product } = await executeGraphql(ProductGetByIdDocument, {
		id: params.productId,
	});
	if (!product) {
		notFound();
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async function addProductToCart(formData: FormData) {
		"use server";
		const productId = formData.get("productId");
		const { product } = await executeGraphql(ProductGetByIdDocument, {
			id: productId as string,
		});

		if (!product) {
			throw new Error(`Product with id  not found`);
		}
		const { id: cartId, items } = await getOrCreateCart();

		const currentProductIndex = items?.findIndex((item: any) => item?.product?.id == product.id);

		if (currentProductIndex !== -1) {
			const incrementedProductQuantityInTheCart = Number(
				items?.[currentProductIndex]?.quantity + 1,
			);
			await executeGraphql(CartChangeItemQuantityDocument, {
				id: cartId,
				productId: product.id,
				quantity: incrementedProductQuantityInTheCart,
			});
			console.log("Produkt jest już w koszyku!");
		} else {
			console.log("produkt jeszcze nie w koszyku", cartId, product.id);
			await executeGraphql(CartAddItemDocument, {
				cartId: cartId ?? "",
				input: { item: { productId: product.id, quantity: 1 } },
			});
			console.log("Produkt nie jest jeszcze w koszyku.");
		}
	}

	return (
		<>
			<article>
				<form className="flex gap-6" action={addProductToCart}>
					<div className="max-w-l">
						{product.images[0] && <ProductCoverImage src={product.images[0].url} alt="" />}
					</div>
					<div className="gap-6">
						<h1 className="text-3xl font-bold text-blue-900">{product.name}</h1>
						<ProductListItemDescription product={product as Product} />
						<p className="text-lg font-medium text-blue-950">{product.description}</p>
					</div>

					<input type="text" name="productId" value={product.id} hidden />

					<button
						type="submit"
						className="w-full rounded-md border bg-slate-700 px-8 py-3 text-white"
						data-testid="add-to-cart-button"
					>
						Add to cart
					</button>
				</form>
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
