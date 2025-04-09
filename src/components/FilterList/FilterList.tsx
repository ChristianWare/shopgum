import { SortFilterItem } from "@/lib/constants";
import FilterItem from "../FilterItem/FilterItem";
import FilterItemDropDown from "../FilterItemDropDown/FilterItemDropDown";

export type PathFilterItem = { title: string; path: string };

export type ListItem = SortFilterItem | PathFilterItem;

function FilterItemList({ list }: { list: ListItem[] }) {
  return (
    <>
      {list.map((item: ListItem, i) => (
        <FilterItem key={i} item={item} />
      ))}
    </>
  );
}

export default function FilterList({
  list,
  title,
}: {
  list: ListItem[];
  title?: string;
}) {
  return (
    <div>
      <nav>
        {title ? <h3>{title}</h3> : null}
        <ul>
          <FilterItemList list={list} />
        </ul>
        <ul>
          <FilterItemDropDown list={list} />
        </ul>
      </nav>
    </div>
  );
}
