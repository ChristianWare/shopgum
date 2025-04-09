import { Product } from "@/lib/shopify/types";
import styles from "./ProductGridItems.module.css";
import Link from "next/link";

export default function ProductGridItems({
  products,
}: {
  products: Product[];
}) {
  return (
    <div className={styles.container}>
      {products.map((product) => (
        <div key={product.handle}>
          <Link href={`/product/${product.handle}`} prefetch={true}>
            {product.handle}
          </Link>
        </div>
      ))}
    </div>
  );
}
