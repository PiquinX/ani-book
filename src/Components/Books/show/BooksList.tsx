import { BooksListType } from '@/lib/definitions'
import { rateColor } from '@/lib/utlis'
import Link from 'next/link'
import AddCard from '@/Components/show/AddCard'

interface Props {
    books: BooksListType
}

export const BooksList: React.FC<Props> = ({ books }) => {
  return (
        <div
            className="grid grid-cols-responsive gap-8"
            data-testid='books-list'
        >
            {
                books.map(book => (
                    <Link
                        href={`/books/edit-book/${book.id}`}
                        scroll={false}
                        key={book.id}
                        className="justify-self-center rounded hover:scale-105 duration-150 animate-appear-fast border w-72 p-5 flex flex-col gap-5"
                    >
                        <h4 className='truncate h-8 font-bold'>{book.title}</h4>
                        <img
                            className="w-full h-full rounded"
                            src={book.poster}
                            alt={book.title} />
                        <div className='font-bold'>
                            <span className={rateColor(book.rate)}>{book.rate}</span>/100
                        </div>
                        <div>
                            Created at: {book.createdAt.split('T')[0]}
                        </div>
                    </Link>
                ))
            }
            <AddCard link='/books/add-book' />
        </div>
  )
}
