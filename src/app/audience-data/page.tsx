import ServicePageTemplate from '@/components/ServicePageTemplate'
import { getServiceBySlug } from '@/lib/services'
import { notFound } from 'next/navigation'

export default function Page() {
  const service = getServiceBySlug('audience-data')
  if (!service) notFound()
  return <ServicePageTemplate service={service} />
}
