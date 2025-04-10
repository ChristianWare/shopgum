"use client";

import styles from "./Search.module.css";
import { useRouter, useSearchParams } from "next/navigation";
// import SearchIcon from "../../../public/icons/search.svg";
import { createUrl } from "@/lib/utils";

export default function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();

   function onSubmit(e: React.FormEvent<HTMLFormElement>) {
     e.preventDefault();

     const val = e.target as HTMLFormElement;
     const search = val.search as HTMLInputElement;
     const newParams = new URLSearchParams(searchParams.toString());

     if (search.value) {
       newParams.set("q", search.value);
     } else {
       newParams.delete("q");
     }

     router.push(createUrl("/search", newParams));
   }

  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <input
        key={searchParams?.get("q")}
        type='text'
        name='search'
        placeholder='Search for products...'
        autoComplete='off'
        defaultValue={searchParams?.get("q") || ""}
      />
      <div className={styles.searchIconContainer}>
        {/* <SearchIcon className={styles.icon} /> */}
        🔎
      </div>
    </form>
  );
}
