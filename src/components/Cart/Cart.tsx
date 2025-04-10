"use client";

import { useCart } from "./cart-context";
import styles from "./Cart.module.css";
import { useModal } from "@/context/ModalContext";
import Modal from "../Modal/Modal";
import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Cart() {
  const { cart, updateCartItem } = useCart();
  const { isModalOpen, setModalOpen } = useModal();
  const [isClient, setIsClient] = useState(false);

  // Make sure we only render the cart on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  const openCart = useCallback(() => {
    setModalOpen(true);
  }, [setModalOpen]);

  const closeCart = useCallback(() => {
    setModalOpen(false);
  }, [setModalOpen]);

  // Calculate total cart items with a fallback to 0 if cart or totalQuantity is undefined
  const itemCount = cart?.totalQuantity ?? 0;

  if (!isClient) {
    return (
      <button
        onClick={openCart}
        className={styles.cartButton}
        aria-label='Open cart'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <circle cx='8' cy='21' r='1' />
          <circle cx='19' cy='21' r='1' />
          <path d='M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12' />
        </svg>
        {itemCount > 0 && <span className={styles.cartCount}>{itemCount}</span>}
      </button>
    );
  }

  return (
    <>
      {/* Cart Button */}
      <button
        onClick={openCart}
        className={styles.cartButton}
        aria-label='Open cart'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <circle cx='8' cy='21' r='1' />
          <circle cx='19' cy='21' r='1' />
          <path d='M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12' />
        </svg>
        {itemCount > 0 && <span className={styles.cartCount}>{itemCount}</span>}
      </button>

      {/* Use your existing Modal component */}
      <Modal isOpen={isModalOpen} onClose={closeCart}>
        <div className={styles.cartContainer}>
          <div className={styles.cartHeader}>
            <h2>Your Cart</h2>
          </div>

          {!cart ? (
            <p>Loading cart...</p>
          ) : cart.lines.length > 0 ? (
            <>
              <div className={styles.itemsContainer}>
                {cart.lines.map((item) => {
                  const merchandiseUrl = `/product/${item.merchandise.product.handle}`;

                  return (
                    <div
                      key={item.id || item.merchandise.id}
                      className={styles.item}
                    >
                      <div className={styles.itemImage}>
                        {item.merchandise.product.featuredImage && (
                          <Link href={merchandiseUrl}>
                            <Image
                              src={item.merchandise.product.featuredImage.url}
                              alt={
                                item.merchandise.product.featuredImage
                                  .altText || item.merchandise.product.title
                              }
                              width={100}
                              height={100}
                            />
                          </Link>
                        )}
                      </div>

                      <div className={styles.itemContent}>
                        <Link
                          href={merchandiseUrl}
                          className={styles.itemTitle}
                        >
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
                              onClick={() =>
                                updateCartItem(item.merchandise.id, "minus")
                              }
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
                            <span className={styles.quantity}>
                              {item.quantity}
                            </span>
                            <button
                              className={styles.quantityButton}
                              onClick={() =>
                                updateCartItem(item.merchandise.id, "plus")
                              }
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
                            onClick={() =>
                              updateCartItem(item.merchandise.id, "delete")
                            }
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
              <div className={styles.cartFooter}>
                <div className={styles.subtotal}>
                  <span>Subtotal</span>
                  <span>
                    {cart.cost.subtotalAmount.amount}{" "}
                    {cart.cost.subtotalAmount.currencyCode}
                  </span>
                </div>
                <div className={styles.taxes}>
                  <span>Taxes and shipping calculated at checkout</span>
                </div>
                {cart.checkoutUrl && (
                  <a
                    href={cart.checkoutUrl}
                    className={styles.checkoutButton}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Checkout
                  </a>
                )}
              </div>
            </>
          ) : (
            <div className={styles.emptyCart}>
              <p>Your cart is empty</p>
              <button
                onClick={closeCart}
                className={styles.continueShoppingButton}
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
}
