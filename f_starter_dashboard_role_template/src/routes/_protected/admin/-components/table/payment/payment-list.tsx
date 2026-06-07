'use client'

import type { Payment } from '@/types/payment'
import { columns } from './columns'
import { DataTable } from '@/components/ui/data-table'
import { statuses, priorities } from '@/types/payment'
import { useState, useEffect } from 'react'



import { useCoursesStore } from '@/stores/courses-store'

export default function PaymentList() {
  const { transactions } = useCoursesStore()
  const [data, setData] = useState<Payment[]>([])

  useEffect(() => {
    // Map transactions from courses-store to the Payment type expected by the table columns
    const mapped: Payment[] = transactions.map((tx) => {
      const nameParts = tx.studentName.split(' ')
      return {
        id: tx.id,
        name: nameParts[0] || 'Étudiant',
        surname: nameParts.slice(1).join(' ') || 'Démo',
        amount: tx.amount,
        status: tx.status === 'Reçu' ? 'success' : 'failed',
        priority: 'medium',
        email: tx.studentEmail,
      }
    })
    setData(mapped)
  }, [transactions])

  return (
    <div className="container mx-auto py-10">
      <DataTable
        columns={columns}
        data={data}
        searchFilter={{
          columnId: 'email',
          placeholder: 'Filter by email...',
        }}
        facetedFilters={[
          {
            columnId: 'status',
            title: 'Status',
            options: statuses,
          },
          {
            columnId: 'priority',
            title: 'Priority',
            options: priorities,
          },
        ]}
        actionButton={{
          label: 'Add Payment',
          onClick: () => console.log('Add payment clicked'),
        }}
      />
    </div>
  )
}
