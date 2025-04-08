export default async function SearchPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { sort, q: searchValue } = searchParams as { [key: string]: string };
  const { sortKey, reverse } = sorting.find(
    (item) => item.slug === sort || defaultSort
  );
  const products = await getProducts({ sortKey, reverse, query: searchValue });

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
}
