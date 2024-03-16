/* eslint-disable @typescript-eslint/consistent-type-imports */
import {
	InputMaybe,
	ProductGetByPageDocument,
	ProductGetSortedListDocument,
	ProductSortBy,
	ProductsGetListDocument,
	SortDirection,
} from "@/gql/graphql";
import { executeGraphql } from "@/api/graphqlApi";

export const getProductsList = async () => {
	const graphqlResponse = await executeGraphql(ProductsGetListDocument);
	return graphqlResponse.products.data;
};

export const getSortedProductsList = async (
	take: number = 10,
	skip: number = 0,
	order: InputMaybe<SortDirection> | undefined = undefined,
	orderBy: InputMaybe<ProductSortBy> | undefined = undefined,
) => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
	const gqlResponse = await executeGraphql(ProductGetSortedListDocument, {
		take,
		skip,
		order,
		orderBy,
	});

	return gqlResponse;
};

export const getProductsByPage = async (page: number) => {
	const productsPerPage = 4;
	const skipMultiplier = page === 1 ? 0 : page - 1;
	const skip = skipMultiplier > 0 ? productsPerPage * skipMultiplier : 0;

	const graphqlResponse = await executeGraphql(ProductGetByPageDocument, { skip: skip });
	return graphqlResponse.products.data;
};
