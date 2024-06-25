'use server'

import { redirect } from 'next/navigation'
import { getSerieByID } from '@/lib/actions/seriesActions'
import EditSerie from '@/Components/Series/edit/EditSerie'

interface Props {
    id: string
}

const EditSeriesController: React.FC<Props> = async ({ id }) => {
  const serie = await getSerieByID({ id })

  if (serie) return <EditSerie serie={serie} />
  else {
    redirect('/series')
  }
}

export default EditSeriesController
