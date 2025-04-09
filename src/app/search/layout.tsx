import FilterList from "@/components/FilterList/FilterList";
import Collections from "@/components/Search/Collections";
import { sorting } from "@/lib/constants";

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div>
        <Collections />
      </div>
      <div>{children}</div>
      <div>
        

        <FilterList list={sorting} title='Sort By' />
      </div>
    </>
  );
}
