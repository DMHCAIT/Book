import CollectionPage from './CollectionPage'
import { useAdmin } from '../context/AdminContext'

export default function MensPage() {
  const { mensProducts } = useAdmin()
  return (
    <CollectionPage
      title="Men's Collection"
      subtitle="Suits · Sherwanis · Kurta Sets & More"
      products={mensProducts}
      heroImage="https://callmytailor.com/custom/2%20pcs%20suit-min.jpg"
      heroFallback="https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200&q=80"
    />
  )
}
