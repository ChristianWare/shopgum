import { Suspense } from "react";
import FilterList from "../FilterList/FilterList";
import styles from "./Collections.module.css";
import { getCollections } from "@/lib/shopify";

async function CollectionList() {
  const collections = await getCollections();

  return <FilterList list={collections} title='Collections' />;
}

export default function Collections() {
  return (
    <div className={styles.container}>
      <Suspense fallback='Loading...'></Suspense>
      <CollectionList />
    </div>
  );
}
