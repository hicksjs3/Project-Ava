import Layout from '@/components/ui/Layout'
import LeadsDashboard from '@/components/leads/LeadsDashboard'

export default function Home() {
  return (
    <Layout>
      <div className="p-4 md:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <LeadsDashboard />
        </div>
      </div>
    </Layout>
  )
}

