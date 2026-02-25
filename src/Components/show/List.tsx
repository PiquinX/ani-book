import { Plus } from 'lucide-react'
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
                    className="bg-transparent hover:bg-noir-blue/20 border border-[#333333] rounded px-3 py-2 font-medium text-gray-500 hover:text-white hover:border-noir-blue hover:shadow-[0_0_25px_5px_var(--noir-blue)] transition-all hidden md:block"
                    scroll={false}
                >
                    {addText}
                </Link>
                <Link
                    href={addLink}
                    className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-black border border-noir-blue rounded-full flex items-center justify-center text-white shadow-[0_0_15px_2px_var(--noir-blue)] hover:shadow-[0_0_25px_5px_var(--noir-blue)] transition-all z-50 animate-appear-fast"
                    scroll={false}
                >
                    <Plus className="w-6 h-6" />
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
