// import styles from "./ProductDescription.module.css";

import { Product } from "@/lib/shopify/types";
import Price from "../Price/Price";
import VariantSelector from "../VariantSelector/VariantSelector";
import Prose from "../Prose/Prose";
// import AddToCart from "../AddToCart/AddToCart";

export default function ProductDescription({ product }: { product: Product }) {
  return (
    <>
      <div className='mb-6 flex flex-col border-b pb-6 dark:border-neutral-700'>
        <h1 className='mb-2 text-5xl font-medium'>{product.title}</h1>
        <div className='mr-auto w-auto rounded-full bg-blue-600 p-2 text-sm text-white'>
          <Price
            amount={product.priceRange.maxVariantPrice.amount}
            currencyCode={product.priceRange.maxVariantPrice.currencyCode}
          />
        </div>
      </div>
      <VariantSelector options={product.options} variants={product.variants} />
      {product.descriptionHtml ? (
        <Prose
          className='mb-6 text-sm leading-light dark:text-white/[60%]'
          html={product.descriptionHtml}
        />
      ) : null}
      {/* <AddToCart product={product} /> */}
    </>
  );
}