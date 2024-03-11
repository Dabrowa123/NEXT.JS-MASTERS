import { ProductGetByPageDocument, ProductsGetListDocument } from "@/gql/graphql";
import { executeGraphql } from "@/api/graphqlApi";

export const getProductsList = async () => {
	const graphqlResponse = await executeGraphql(ProductsGetListDocument);
	return graphqlResponse.products.data;
};

// export const getProductById = async (_id: ProductListItemFragmentFragment["id"]) => {
// 	const graphqlResponse = await executeGraphql(ProductGetByIdDocument, { id: _id });
// 	return graphqlResponse.product;
// };

// export const getProductById = async (id: ProductResponseItem["id"]) => {
// 	const res = await fetch(`https://naszsklep-api.vercel.app/api/products/${id}`);
// 	const productResponse = (await res.json()) as ProductResponseItem;
// 	return productResponseItemToProductItemType(productResponse);
// };

export const getProductsByPage = async (page: number) => {
	const productsPerPage = 4;
	const skipMultiplier = page === 1 ? 0 : page - 1;
	const skip = skipMultiplier > 0 ? productsPerPage * skipMultiplier : 0;

	const graphqlResponse = await executeGraphql(ProductGetByPageDocument, { skip: skip });
	return graphqlResponse.products.data;
};
