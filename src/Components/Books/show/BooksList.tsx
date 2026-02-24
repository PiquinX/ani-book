import { BooksListType } from '@/lib/definitions'
import AddCard from '@/Components/show/AddCard'
import { MediaCard } from '@/Components/show/MediaCard'

interface Props {
    books: BooksListType
}



export const BooksList: React.FC<Props> = ({ books }) => {
    const style = books.length > 3 ? 'grid grid-cols-responsive' : 'flex flex-wrap justify-center shrink md:justify-start'

    return (
        <div
            className={`${style} gap-8`}
            data-testid='books-list'
        >
            {
                books.map(book => (
                    <MediaCard
                        key={book.id}
                        href={`/books/edit-book/${book.id}`}
                        title={book.title}
                        poster={book.poster}
                        rate={book.rate}
                        createdAt={book.createdAt}
                    />
                ))
            }
            <AddCard link='/books/add-book' />
        </div>
    )
}
