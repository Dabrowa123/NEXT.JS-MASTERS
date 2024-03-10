import { ProductCoverImage } from "@/ui/atoms/ProductCoverImage";
import { ProductListItemDescription } from "@/ui/atoms/ProductListItemDescription";
import { type ProductItemType } from "@/types";

type ProductListItemProps = {
	product: ProductItemType;
};

export const ProductListItem = ({ product }: ProductListItemProps) => {
	return (
		<li>
			<a href={`/product/${product.id}`}>
				<ProductCoverImage src={product.image} alt={product.title} />
				<ProductListItemDescription product={product} />
			</a>
		</li>
	);
};
