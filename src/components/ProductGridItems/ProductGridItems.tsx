import { Product } from "@/lib/shopify/types";
import styles from "./ProductGridItems.module.css";
import Link from "next/link";
import Image from "next/image";

export default function ProductGridItems({
  products,
}: {
  products: Product[];
}) {
  return (
    <div className={styles.container}>
      {products.map((product) => (
        <div key={product.handle} className={styles.product}>
          <Link href={`/product/${product.handle}`} prefetch={true}>
            {product.featuredImage && (
              <div className={styles.imageContainer}>
                <Image
                  src={product.featuredImage.url}
                  alt={product.featuredImage.altText || product.title}
                  width={300}
                  height={300}
                  priority={true}
                  className={styles.image}
                />
              </div>
            )}
            <h3 className={styles.title}>{product.title}</h3>
            <p className={styles.price}>
              {product.priceRange.minVariantPrice.amount}{" "}
              {product.priceRange.minVariantPrice.currencyCode}
            </p>
          </Link>
        </div>
      ))}
    </div>
  );
}
