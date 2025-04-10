import ProductGridItems from "@/components/ProductGridItems/ProductGridItems";
import { defaultSort, sorting } from "@/lib/constants";
import { getCollectionProducts } from "@/lib/shopify";

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: { collection: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { sort } = searchParams as { [key: string]: string };
  const { sortKey, reverse } =
    sorting.find((item) => item.slug === sort) || defaultSort;
  const products = await getCollectionProducts({
    collection: params.collection,
    sortKey,
    reverse,
  });
  return (
    <section>
      {products.length === 0 ? (
        <p className='py-3 text-lg'>{`No products found in this collection`}</p>
      ) : (
        <ProductGridItems products={products} />
      )}
    </section>
  );
}
