import { zodResolver } from '@hookform/resolvers/zod'
import { Search, X } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const orderFiltersSchema = z.object({
  medicineName: z.string().optional(),
  company: z.string().optional(),
})

export type OrderFiltersSchema = z.infer<typeof orderFiltersSchema>

interface TableFilters {
  handleFilter(data: OrderFiltersSchema): void
  handleFiltersRemove(): void
}

export function TableFilters({
  handleFilter,
  handleFiltersRemove,
}: TableFilters) {
  const { register, handleSubmit, reset, watch } = useForm<OrderFiltersSchema>({
    resolver: zodResolver(orderFiltersSchema),
  })

  const medicineName = watch('medicineName')
  const company = watch('company')
  const hasSearch = !!medicineName || !!company

  function filtersRemove() {
    handleFiltersRemove()
    reset({
      medicineName: '',
      company: '',
    })
  }
  return (
    <form
      onSubmit={handleSubmit(handleFilter)}
      className="flex items-center gap-2"
    >
      <span className="text-sm font-semibold">Filtro:</span>
      <Input
        placeholder="Nome do medicamento"
        className="h-8 w-auto"
        disabled={!!company}
        {...register('medicineName')}
      />
      <Input
        placeholder="Nome da empresa"
        className="h-8 w-auto"
        disabled={!!medicineName}
        {...register('company')}
      />
      <Button variant="secondary" size="xs" type="submit">
        <Search className="mr-2 h-4 w-4" />
        Filtrar resultados
      </Button>
      <Button
        onClick={filtersRemove}
        variant="outline"
        size="xs"
        type="button"
        disabled={!hasSearch}
      >
        <X className="mr-2 h-4 w-4" />
        Remover filtro
      </Button>
    </form>
  )
}
