import { useState } from 'react'

import { Medicine } from '@/@types/medicine'
import { getAllMedicines } from '@/api/get-medicines'
import { OrderFiltersSchema } from '@/components'

export function useTableData() {
  const [data, setData] = useState([] as Medicine[])
  const [currentPage, setCurrentPage] = useState(1)

  const storedStateAsJSON = localStorage.getItem('@app:data')

  const itemsPerPage = 10
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentData = data?.slice(indexOfFirstItem, indexOfLastItem)

  async function fetchData() {
    if (storedStateAsJSON) {
      setData(JSON.parse(storedStateAsJSON))
    } else {
      const response = await getAllMedicines()

      const orderedResponse = handleOrderingData(response)
      const stateJSON = JSON.stringify(orderedResponse)
      localStorage.setItem('@app:data', stateJSON)

      setData(orderedResponse)
    }
  }

  function handlePaginate(pageIndex: number) {
    setCurrentPage(pageIndex)
  }

  function handleFilter(data: OrderFiltersSchema) {
    if (!storedStateAsJSON) return

    const storedState: Medicine[] = JSON.parse(storedStateAsJSON)
    const { medicineName, company } = data
    let filteredResponse: Medicine[] = []

    if (medicineName) {
      filteredResponse = storedState?.filter((medicine) =>
        medicine.name
          .toLocaleLowerCase()
          .includes(medicineName.toLocaleLowerCase()),
      )
    } else if (company) {
      filteredResponse = storedState?.filter((medicine) =>
        medicine.company
          .toLocaleLowerCase()
          .includes(company.toLocaleLowerCase()),
      )
    }
    setData(filteredResponse)
    setCurrentPage(1)
  }

  function handleFiltersRemove() {
    fetchData()
  }

  function handleOrderingData(array: Medicine[]) {
    const newArray = array.sort((a, b) =>
      a.published_at.localeCompare(b.published_at),
    )
    return newArray.reverse()
  }

  function toggleOrderDate() {
    const newData = data?.slice().reverse()
    if (newData) setData(newData)
  }

  return {
    data,
    currentData,
    currentPage,
    itemsPerPage,
    fetchData,
    handlePaginate,
    handleFilter,
    handleFiltersRemove,
    toggleOrderDate,
  }
}
