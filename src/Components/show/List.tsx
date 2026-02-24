import { GeneralType } from '@/lib/definitions'
import Link from 'next/link'
import AddCard from './AddCard'
import { MediaCard } from '@/Components/show/MediaCard'

interface Props {
    addLink: string
    addText: string
    list: GeneralType[]
    listDataTestId: string
    editLink: string
}

const List: React.FC<Props> = ({ addLink, addText, list, listDataTestId, editLink }) => {
    return (
        <>
            <div className='flex justify-between items-center mb-5'>
                <Link
                    href={addLink}
                    className="bg-transparent hover:bg-noir-blue/20 border border-[#333333] rounded px-3 py-2 font-medium text-gray-500 hover:text-white hover:border-noir-blue hover:shadow-[0_0_25px_5px_rgba(0,0,255,0.6)] transition-all"
                    scroll={false}
                >
                    {addText}
                </Link>
            </div>
            <div
                className="grid grid-cols-responsive gap-8"
                data-testid={listDataTestId}
            >
                {
                    list.map(item => (
                        <MediaCard
                            key={item.id}
                            href={`${editLink}/${item.id}`}
                            title={item.title}
                            poster={item.poster}
                            rate={item.rate}
                            createdAt={item.createdAt}
                        />
                    ))
                }
                <AddCard link={addLink} />
            </div>
        </>
    )
}

export default List
