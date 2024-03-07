import { ProductList } from "@/ui/organisms/ProductList";
import { type ProductItemType } from "@/ui/types";

const products: ProductItemType[] = [
	{
		id: "1",
		name: "belt",
		category: "Clothes",
		price: 1299,
		coverImage: {
			src: "/belt.jpg",
			alt: "belt",
		},
	},
	{
		id: "2",
		name: "trousers",
		category: "Clothes",
		price: 9650,
		coverImage: {
			src: "/trousers.jpg",
			alt: "trousers",
		},
	},
	{
		id: "3",
		name: "hat",
		category: "Clothes",
		price: 1349,
		coverImage: {
			src: "/hat.jpg",
			alt: "hat",
		},
	},
	{
		id: "4",
		name: "shirt",
		category: "Clothes",
		price: 1000,
		coverImage: {
			src: "/shirt.jpg",
			alt: "shirt",
		},
	},
];

export default function Home() {
	return (
		<section className="mx-auto max-w-2xl px-8 py-12 sm:px-6 sm:py-16 md:max-w-4xl lg:max-w-7xl">
			<ProductList products={products} />
		</section>
	);
}
