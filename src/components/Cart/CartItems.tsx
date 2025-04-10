"use client";

import { Cart } from "@/lib/shopify/types";
import styles from "./Cart.module.css";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "./cart-context";

export default function CartItems({ cart }: { cart: Cart }) {
  const { updateCartItem } = useCart();

  return (
    <div className={styles.itemsContainer}>
      {cart.lines.map((item) => {
        const merchandiseUrl = `/product/${item.merchandise.product.handle}`;

        return (
          <div key={item.id || item.merchandise.id} className={styles.item}>
            <div className={styles.itemImage}>
              {item.merchandise.product.featuredImage && (
                <Link href={merchandiseUrl}>
                  <Image
                    src={item.merchandise.product.featuredImage.url}
                    alt={
                      item.merchandise.product.featuredImage.altText ||
                      item.merchandise.product.title
                    }
                    width={100}
                    height={100}
                  />
                </Link>
              )}
            </div>

            <div className={styles.itemContent}>
              <Link href={merchandiseUrl} className={styles.itemTitle}>
                {item.merchandise.product.title}
              </Link>

              <div className={styles.itemVariant}>
                {item.merchandise.title !== "Default Title"
                  ? item.merchandise.title
                  : ""}
              </div>

              <div className={styles.itemPrice}>
                {item.cost.totalAmount.amount}{" "}
                {item.cost.totalAmount.currencyCode}
              </div>

              <div className={styles.itemActions}>
                <div className={styles.quantitySelector}>
                  <button
                    className={styles.quantityButton}
                    onClick={() => updateCartItem(item.merchandise.id, "minus")}
                    aria-label='Decrease quantity'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='16'
                      height='16'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    >
                      <path d='M5 12h14' />
                    </svg>
                  </button>
                  <span className={styles.quantity}>{item.quantity}</span>
                  <button
                    className={styles.quantityButton}
                    onClick={() => updateCartItem(item.merchandise.id, "plus")}
                    aria-label='Increase quantity'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='16'
                      height='16'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    >
                      <path d='M12 5v14' />
                      <path d='M5 12h14' />
                    </svg>
                  </button>
                </div>
                <button
                  className={styles.removeButton}
                  onClick={() => updateCartItem(item.merchandise.id, "delete")}
                  aria-label='Remove item'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='16'
                    height='16'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <path d='M3 6h18' />
                    <path d='M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6' />
                    <path d='M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2' />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
