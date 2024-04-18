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
    <TR>
      <TableCell className="font-mono text-xs font-medium">{id}</TableCell>
      <TableCell className="font-medium">{name}</TableCell>

      <TableCell className="font-medium">{company}</TableCell>
      <TableCell className=" font-medium">
        <Linking
          href={documents.find((item) => item.type === 'PATIENT')?.url}
          className="flex flex-col items-center"
        >
          <FileText />
          <p>PDF</p>
        </Linking>
      </TableCell>
      <TableCell className="font-medium">
        <Linking
          href={documents.find((item) => item.type === 'PROFESSIONAL')?.url}
          className="flex flex-col items-center"
        >
          <FileText />
          <p>PDF</p>
        </Linking>
      </TableCell>
      <TableCell className="pe-8 text-right text-muted-foreground">
        {format(publishedAt, 'dd/MM/yyyy')}
      </TableCell>
    </TR>
  )
}
