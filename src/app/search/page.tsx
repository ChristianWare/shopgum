import ProductGridItems from "@/components/ProductGridItems/ProductGridItems";
import { defaultSort, sorting } from "@/lib/constants";
import { getProducts } from "@/lib/shopify";

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  // Safely handle searchParams
  const sort =
    typeof searchParams?.sort === "string" ? searchParams.sort : undefined;
  const searchValue = typeof searchParams?.q === "string" ? searchParams.q : "";

  // Find the matching sort item or fall back to defaultSort
  const sortItem = sorting.find((item) => item.slug === sort) || defaultSort;
  const { sortKey, reverse } = sortItem;

  try {
    // Pass the query parameter (even if it's an empty string)
    const products = await getProducts({
      sortKey,
      reverse,
      query: searchValue,
    });

    const resultsText = products.length > 1 ? "results" : "Result";

    console.log(products)

    return (
      <div>
        <h1>SearchPage</h1>
        {searchValue ? (
          <p>
            {products.length === 0
              ? "There are no products that match"
              : `Showing ${products.length} ${resultsText} for 
              `}
            <span>&quot;{searchValue}&quot;</span>
          </p>
        ) : null}
        {products.length > 0 ? (
          <div>
            <ProductGridItems products={products} />
          </div>
        ) : null}
      </div>
    );
  } catch (error) {
    console.error("Error fetching products:", error);
    return (
      <div>
        <h1>SearchPage</h1>
        <p>Error loading products. Please try again later.</p>
      </div>
    );
  }
}
