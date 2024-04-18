import { format } from 'date-fns'
import { FileText } from 'lucide-react'

import { Linking } from './linking'

import { Medicine } from '@/@types/medicine'
import { TableCell, TableRow as TR } from '@/components/ui/table'

export function TableRow({
  id,
  name,
  published_at: publishedAt,
  company,
  documents,
}: Medicine) {
  return (
    <TR className="text-center sm:text-left">
      <TableCell className="hidden font-mono text-xs font-medium md:table-cell">
        {id}
      </TableCell>
      <TableCell className="font-medium">{name}</TableCell>

      <TableCell className="hidden font-medium sm:table-cell">
        {company}
      </TableCell>
      <TableCell className="hidden font-medium lg:table-cell">
        <Linking
          href={documents.find((item) => item.type === 'PATIENT')?.url}
          className="flex flex-col items-center"
        >
          <FileText />
          <p>PDF</p>
        </Linking>
      </TableCell>
      <TableCell className="hidden font-medium lg:table-cell">
        <Linking
          href={documents.find((item) => item.type === 'PROFESSIONAL')?.url}
          className="flex flex-col items-center"
        >
          <FileText />
          <p>PDF</p>
        </Linking>
      </TableCell>
      <TableCell className="hidden text-center text-muted-foreground sm:table-cell">
        {format(publishedAt, 'dd/MM/yyyy')}
      </TableCell>
    </TR>
  )
}
