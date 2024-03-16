import { type Product } from "@/gql/graphql";
import { formatMoney } from "@/utils";

type ProductListItemDescriptionProps = {
	product: Product;
};

export const ProductListItemDescription = ({
	product: { name, categories, price, rating },
}: ProductListItemDescriptionProps) => {
	return (
		<>
			<div className="mt-2 flex justify-between">
				<div>
					<h2 className="text-lg font-medium text-blue-950">{name}</h2>
				</div>
				<p className="text-lg font-bold  text-blue-950">
					<span className="sr-only">Price: </span>
					<span data-testid="product-price">{formatMoney(price / 100)}</span>
				</p>
				<p className="text-lg font-bold  text-blue-950">
					<span className="sr-only">Rating: </span>
					<span data-testid="product-rating">{rating}</span>
				</p>
			</div>
			<div>
				{categories[0] && (
					<p className="text-lg font-medium text-blue-950">
						<span className="sr-only">Category: </span>
						{categories[0].name}
					</p>
				)}
			</div>
		</>
	);
};
