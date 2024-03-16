/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { executeGraphql } from "@/api/graphqlApi";
import { CartFindOrCreateDocument } from "@/gql/graphql";
import { ChangeQuantity } from "@/app/cart/ChangeQuantity";

export default async function CartPage() {
	const currentCookieCartId = cookies().get("cartId")?.value;
	if (!currentCookieCartId) {
		redirect("/");
	}

	async function getCart() {
		"use server";

		const {
			cartFindOrCreate: { id, items },
		} = await executeGraphql(CartFindOrCreateDocument, {
			id: currentCookieCartId,
		});

		return { id, items };
	}

	const { id, items } = await getCart();

	return (
		<div>
			<h1>Cart summary</h1>
			<table>
				<thead>
					<tr>
						<th>Product</th>
						<th>Quantity</th>
						<th>Price</th>
					</tr>
				</thead>
				<tbody>
					{items.map((item) => {
						if (!item) {
							return null;
						}
						return (
							<tr key={item.product.id}>
								<td>{item.product.name}</td>
								<td>
									<ChangeQuantity
										productId={item.product.id}
										quantity={item.quantity}
										cartId={id}
									/>
								</td>
								<td>{item.product.price}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}
