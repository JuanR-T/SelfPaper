import { useApiContext } from "../../context/ApiContext";
import { AnimatedTab } from "../../types/types";
import { AnimatedTabs } from "../ui/AnimatedTabs";

const BooksSection = () => {
    const { bookQuery } = useApiContext();

    const books = bookQuery.data?.data.books;

    const bookTabs: AnimatedTab[] = books && !bookQuery.isLoading
        ? books.map((book) => ({
            title: book.title,
            value: book.title,
            content: (
                <div className="w-full overflow-hidden flex flex-row relative h-full rounded-2xl p-10 text-lg md:text-4xl font-bold text-white bg-gradient-to-br from-purple-200 to-violet-400">
                    <div className="w-1/2 h-full flex flex-col text-left">
                        <h1>{book.title}</h1>
                        <p>{book.bookPublisher.title}</p>
                        <p>{book.description}</p>
                        <a className="" target="_blank" href={book.link}>Acheter le livre</a>
                    </div>
                    <div className="w-1/2 h-full flex flex-col">
                        <img
                            src={book.bookImage ? `data:image/jpeg;base64,${book.bookImage}` : ''}
                            alt={book.title}
                            style={{ width: '100px', height: '100px' }}
                        />
                    </div>
                </div>
            )
        }))
        : [];

    return bookQuery.isLoading ? (
        <p>Chargement...</p>
    ) : (
        <div className="books-section-container">
            <AnimatedTabs tabs={bookTabs} />
        </div>
    );
};

export default BooksSection;