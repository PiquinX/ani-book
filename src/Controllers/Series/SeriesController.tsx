// import Link from 'next/link'
import { getSeries } from '@/lib/actions/seriesActions'
// import { SeriesList } from '@/Components/Series/show/SeriesList'
import List from '@/Components/show/List'

const SeriesController = async () => {
  const series = await getSeries()

  if (series) {
    return (
      <List
        addLink='/series/add-serie'
        addText='+ Add Serie'
        list={series}
        listDataTestId='series-list'
        editLink='/series/edit-serie'
      />
    )
  } else return <div>Something happened...</div>
}

export default SeriesController
