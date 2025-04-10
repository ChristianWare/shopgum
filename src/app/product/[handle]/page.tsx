// import Gallery from "@/components/Gallery/Gallery";
import { ProductProvider } from "@/components/Product/product-context";
import ProductDescription from "@/components/ProductDescription/ProductDescription";
import { getProduct, getProductRecommendations } from "@/lib/shopify";
// import { Image } from "@/lib/shopify/types";
import Link from "next/link";
import { Suspense } from "react";

export default async function ProductPage({
  params,
}: {
  params: { handle: string };
}) {
  const product = await getProduct(params.handle);

  if (!product) return "";
  return (
    <ProductProvider>
      <div>
        <div>
          <Suspense fallback='Loading'>
            {/* <Gallery
              images={product.images.slice(0, 5).map((image: Image) => ({
                src: image.url,
                altText: image.altText,
              }))}
            /> */}
            Image Here
          </Suspense>
        </div>
        <div>
          <Suspense fallback={null}>
            <ProductDescription product={product} />
          </Suspense>
        </div>
        <RelatedPRoducts id={product.id} />
      </div>
    </ProductProvider>
  );
}


async function RelatedPRoducts({ id }: { id: string }) {
  const relatedProducts = await getProductRecommendations(id);

  if (!relatedProducts) return null;

  return (
    <div className='py-8'>
      <h2 className='mb-4 text-2xl font-bold'>Related Products</h2>
      <ul className='flex w-full gap-4 overflow-x-auto pt-1'>
        {relatedProducts.map((product) => (
          <li
            key={product.handle}
            className='aspect-square w-full flex-none min-[475px]:w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5'
          >
            <Link
              className='relative h-full w-full'
              href={`/product/${product.handle}`}
              prefetch={true}
            >
              {/* <GridTileImage
                alt={product.title}
                label={{
                  title: product.title,
                  amount: product.priceRange.maxVariantPrice.amount,
                  currencyCode: product.priceRange.maxVariantPrice.currencyCode,
                }}
                src={product.featuredImage?.url}
                fill
                sizes='(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw'
              /> */}
              {product.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}