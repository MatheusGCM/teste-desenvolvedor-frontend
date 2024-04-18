import { ArrowUpDown } from 'lucide-react'
import { useEffect } from 'react'

import { Pagination, TableFilters, TableRow } from '@/components/'
import { ThemeToggle } from '@/components/theme/theme-toggle'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow as TR,
} from '@/components/ui/table'
import { useTableData } from '@/hooks/use-table-data'

export function Home() {
  const {
    data,
    currentData,
    currentPage,
    itemsPerPage,
    fetchData,
    handlePaginate,
    handleFilter,
    handleFiltersRemove,
    toggleOrderDate,
  } = useTableData()

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold tracking-tight">
          Bulário Eletrônico
        </h1>
        <div className="flex flex-col items-center gap-1">
          <ThemeToggle />
        </div>
      </div>

      <div className="space-y-2.5">
        <TableFilters
          handleFilter={handleFilter}
          handleFiltersRemove={handleFiltersRemove}
        />

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TR>
                <TableHead className="w-[15rem]">Identificador</TableHead>
                <TableHead className="w-[20rem]">Medicamento</TableHead>
                <TableHead className="w-[25rem]">Empresa</TableHead>
                <TableHead className="w-[10rem]">Bula do Paciente</TableHead>
                <TableHead className="w-[10rem]">Bula do Profisional</TableHead>
                <TableHead className="text-right">
                  <Button variant="ghost" onClick={toggleOrderDate}>
                    <span>Data de Publicação</span>
                    <ArrowUpDown className="ml-2 inline h-4 w-4" />
                  </Button>
                </TableHead>
              </TR>
            </TableHeader>
            <TableBody>
              {currentData?.map((medicine) => {
                return <TableRow key={medicine.id} {...medicine} />
              })}
            </TableBody>
          </Table>
        </div>
        {currentData && data.length > 10 && (
          <Pagination
            onPageChange={handlePaginate}
            currentPage={currentPage}
            perPage={itemsPerPage}
            totalCount={data.length}
          />
        )}
      </div>
    </div>
  )
}
