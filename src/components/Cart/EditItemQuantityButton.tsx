"use client";

import { useTransition } from "react";
import { updateItemQuantity } from "./actions";
import { CartItem } from "@/lib/shopify/types";
import styles from "./Cart.module.css";
import { useCart } from "./cart-context";

export default function EditItemQuantityButton({
  item,
  type,
}: {
  item: CartItem;
  type: "plus" | "minus";
}) {
  const [isPending, startTransition] = useTransition();
  const { cartId, setCart } = useCart();

  const handleUpdateQuantity = () => {
    if (!cartId) return;

    startTransition(async () => {
      const newQuantity =
        type === "plus" ? item.quantity + 1 : item.quantity - 1;

      // If quantity would be reduced to 0, don't proceed
      if (newQuantity <= 0) return;

      const updatedCart = await updateItemQuantity({
        cartId,
        lineId: item.id,
        quantity: newQuantity,
      });

      if (updatedCart) {
        setCart(updatedCart);
      }
    });
  };

  return (
    <button
      aria-label={
        type === "plus" ? "Increase item quantity" : "Decrease item quantity"
      }
      onClick={handleUpdateQuantity}
      disabled={isPending}
      className={styles.quantityButton}
    >
      {type === "plus" ? (
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
      ) : (
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
      )}
    </button>
  );
}
