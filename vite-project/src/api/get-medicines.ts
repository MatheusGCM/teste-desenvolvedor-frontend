import { Medicine } from '@/@types/medicine'
import { api } from '@/lib/axios'

export async function getAllMedicines() {
  const { data } = await api.get<Medicine[]>('/data')

  return data
}
