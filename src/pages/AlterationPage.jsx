import CollectionPage from './CollectionPage'
import { useAdmin } from '../context/AdminContext'

export default function AlterationPage() {
  const { alterationServices } = useAdmin()
  return (
    <CollectionPage
      title="Alteration Services"
      subtitle="Hemming · Fitting · Repairs & More"
      products={alterationServices}
      heroImage="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80"
      heroFallback="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80"
    />
  )
}
