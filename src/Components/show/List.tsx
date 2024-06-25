import { GeneralType } from '@/lib/definitions'
import Link from 'next/link'
import AddCard from './AddCard'
import { rateColor } from '@/lib/utlis'

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
            <div className='flex items-end mb-5'>
                <Link
                    href={addLink}
                    className="bg-blue-500 rounded px-3 py-2 font-medium text-white"
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
                        <Link
                            href={`${editLink}/${item.id}`}
                            scroll={false}
                            key={item.id}
                            className="justify-self-center rounded hover:scale-105 duration-150 animate-appear-fast border w-72 p-5 flex flex-col gap-5"
                        >
                            <h4 className='truncate h-8 font-bold'>{item.title}</h4>
                            <img
                                className="w-full h-full rounded"
                                src={item.poster}
                                alt={item.title} />
                            <p className='font-bold'>
                                <span className={rateColor(item.rate)}>
                                    {Math.round(item.rate * 10) / 10}
                                </span>/100
                            </p>
                            <div>
                                Created at: {item.createdAt.split('T')[0]}
                            </div>
                        </Link>
                    ))
                }
                <AddCard link={addLink} />
            </div>
        </>
    )
}

export default List