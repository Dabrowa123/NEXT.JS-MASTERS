"use client";
import { useOptimistic } from "react";
import { CartChangeItemQuantityDocument } from "@/gql/graphql";
import { executeGraphql } from "@/api/graphqlApi";
import { purgeCache } from "@/app/cart/purgeCache";

export function ChangeQuantity({
	productId,
	quantity,
	cartId,
}: {
	productId: string;
	quantity: number;
	cartId: string;
}) {
	const [optimisticQuantity, setOptimisticQuantity] = useOptimistic(
		quantity,
		(_state, newQuantity: number) => newQuantity,
	);
	return (
		<form className="flex">
			<button
				data-testid="decrement"
				className="h-6 w-6 border"
				type="submit"
				formAction={async () => {
					setOptimisticQuantity(optimisticQuantity - 1);
					if (optimisticQuantity !== 1)
						await executeGraphql(CartChangeItemQuantityDocument, {
							id: cartId,
							productId: productId,
							quantity: optimisticQuantity - 1,
						});

					purgeCache();
				}}
			>
				-
			</button>
			<span className="w-8 text-center" data-testid="quantity">
				{optimisticQuantity}
			</span>
			<button
				data-testid="increment"
				className="h-6 w-6 border"
				type="submit"
				formAction={async () => {
					setOptimisticQuantity(optimisticQuantity + 1);
					await executeGraphql(CartChangeItemQuantityDocument, {
						id: cartId,
						productId: productId,
						quantity: optimisticQuantity + 1,
					});
					purgeCache();
				}}
			>
				+
			</button>
		</form>
	);
}
