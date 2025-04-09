import styles from './Collections.module.css'
import { getCollections } from '@/lib/shopify'

async function CollectionList() {
    const collections = await getCollections();

    return <FilteredList />
}

export default function Collections() {
  return (
    <div>
        <CollectionList />
    </div>
  )
}