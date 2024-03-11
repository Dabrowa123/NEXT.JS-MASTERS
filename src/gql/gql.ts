/* eslint-disable */
import * as types from './graphql';



/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "query ProductGetById($id: ID) {\n  product(id: $id) {\n    ...ProductListItemFragment\n  }\n}": types.ProductGetByIdDocument,
    "fragment ProductListItemFragment on Product {\n  id\n  name\n  description\n  categories {\n    name\n  }\n  images {\n    url\n  }\n  price\n}": types.ProductListItemFragmentFragmentDoc,
    "query ProductsGetByCategory($slug: String!) {\n  category(slug: $slug) {\n    products {\n      ...ProductListItemFragment\n    }\n  }\n}": types.ProductsGetByCategoryDocument,
    "query ProductsGetByCollection($slug: String!) {\n  collection(slug: $slug) {\n    products {\n      ...ProductListItemFragment\n    }\n  }\n}": types.ProductsGetByCollectionDocument,
    "query ProductGetByPage($skip: Int) {\n  products(take: 4, skip: $skip) {\n    data {\n      ...ProductListItemFragment\n    }\n  }\n}": types.ProductGetByPageDocument,
    "query ProductsGetBySearch($search: String!) {\n  products(search: $search) {\n    data {\n      ...ProductListItemFragment\n    }\n  }\n}": types.ProductsGetBySearchDocument,
    "query ProductsGetList {\n  products(take: 14) {\n    data {\n      ...ProductListItemFragment\n    }\n  }\n}": types.ProductsGetListDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductGetById($id: ID) {\n  product(id: $id) {\n    ...ProductListItemFragment\n  }\n}"): typeof import('./graphql').ProductGetByIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ProductListItemFragment on Product {\n  id\n  name\n  description\n  categories {\n    name\n  }\n  images {\n    url\n  }\n  price\n}"): typeof import('./graphql').ProductListItemFragmentFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetByCategory($slug: String!) {\n  category(slug: $slug) {\n    products {\n      ...ProductListItemFragment\n    }\n  }\n}"): typeof import('./graphql').ProductsGetByCategoryDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetByCollection($slug: String!) {\n  collection(slug: $slug) {\n    products {\n      ...ProductListItemFragment\n    }\n  }\n}"): typeof import('./graphql').ProductsGetByCollectionDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductGetByPage($skip: Int) {\n  products(take: 4, skip: $skip) {\n    data {\n      ...ProductListItemFragment\n    }\n  }\n}"): typeof import('./graphql').ProductGetByPageDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetBySearch($search: String!) {\n  products(search: $search) {\n    data {\n      ...ProductListItemFragment\n    }\n  }\n}"): typeof import('./graphql').ProductsGetBySearchDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetList {\n  products(take: 14) {\n    data {\n      ...ProductListItemFragment\n    }\n  }\n}"): typeof import('./graphql').ProductsGetListDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
