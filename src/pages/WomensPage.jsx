import CollectionPage from './CollectionPage'
import { useAdmin } from '../context/AdminContext'

export default function WomensPage() {
  const { womensProducts } = useAdmin()
  return (
    <CollectionPage
      title="Women's Collection"
      subtitle="Salwar · Lehenga · Kurti & More"
      products={womensProducts}
      heroImage="/images/womens/lehenga-choli.jpg"
      heroFallback="/images/womens/lehenga-choli.jpg"
    />
  )
}
