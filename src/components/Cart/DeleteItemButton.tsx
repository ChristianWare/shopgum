"use client";

import { useTransition } from "react";
import { removeItem } from "./actions";
import { CartItem } from "@/lib/shopify/types";
import styles from "./Cart.module.css";
import { useCart } from "./cart-context";

export default function DeleteItemButton({ item }: { item: CartItem }) {
  const [isPending, startTransition] = useTransition();
  const { cartId, setCart } = useCart();

  const handleRemoveItem = () => {
    if (!cartId) return;

    startTransition(async () => {
      const updatedCart = await removeItem({
        cartId,
        lineId: item.id,
      });

      if (updatedCart) {
        setCart(updatedCart);
      }
    });
  };

  return (
    <button
      aria-label='Remove item from cart'
      onClick={handleRemoveItem}
      disabled={isPending}
      className={styles.removeButton}
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
  );
}
