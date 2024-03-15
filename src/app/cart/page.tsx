/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { executeGraphql } from "@/api/graphqlApi";
import { CartFindOrCreateDocument, CartGetItemsByCartIdDocument } from "@/gql/graphql";
import { formatMoney } from "@/utils";

export default async function CartPage() {
	const currentCookieCartId = cookies().get("cartId")?.value;

	if (!currentCookieCartId) {
		redirect("/");
	}

	async function getOrCreateCart() {
		const {
			cartFindOrCreate: { id },
		} = await executeGraphql(CartFindOrCreateDocument, {
			id: currentCookieCartId,
			input: {
				items: [],
			},
		});
		if (!id) {
			throw new Error("Failed to find or create cart");
		}

		cookies().set("cartId", id);
		return id;
	}

	const cartId = await getOrCreateCart();

	if (!cartId) {
		redirect("/");
	}

	// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
	const { cart: cartData } = await executeGraphql(CartGetItemsByCartIdDocument, {
		id: cartId,
	});

	return (
		<div>
			<h1>Order #{cartId} summary</h1>
			<table>
				<thead>
					<tr>
						<th>Product</th>
						<th>Quantity</th>
						<th>Price</th>
					</tr>
				</thead>
				<tbody>
					{cartData?.items.map((item) => {
						if (!item.product) {
							return null;
						}
						return (
							<tr key={item.product.id}>
								<td>{item.product.name}</td>
								<td>{item.quantity}</td>
								<td>{formatMoney(item.product.price)}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}
