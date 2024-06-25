// import Link from 'next/link'
import { getBooks } from '@/lib/actions/bookActions'
// import { BooksList } from '../../Components/Books/show/BooksList'
import List from '@/Components/show/List'

const BooksController = async () => {
  const books = await getBooks()

  if (books) {
    return (
    <>
      <List
        addLink='/books/add-book'
        addText='+ Add Book'
        list={books}
        listDataTestId='books-list'
        editLink='/books/edit-book'
      />
    </>
    )
  } else return <div>Something happened...</div>
}

export default BooksController
