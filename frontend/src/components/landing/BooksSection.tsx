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
                //bg-gradient-to-br from-purple-200 to-violet-400
                <div className="w-full overflow-hidden flex flex-row relative h-full rounded-2xl p-10 text-lg md:text-4xl text-charcoal-darker-color bg-white  ">
                    <div className="w-1/2 pl-20 h-full flex flex-col text-left">
                        <h1 className="font-bold text-justify">{book.title}</h1>
                        <p>Editeur : {book.bookPublisher.title}</p>
                        <p>Date de parution : {book.bookPublicationDate.toString()}</p>
                        <p className="text-justify leading-snug">{book.description}</p>
                        <a className="text-lg my-4 w-fit shadow-[0_0_0_1px_#000000_inset] px-6 py-2 bg-white text-charcoal-color rounded-xl font-normal transform hover:-translate-y-2 transition duration-200 hover:bg-slate-100 hover:text-charcoal-color"
                            target="_blank"
                            href={book.link}
                        >Acheter
                        </a>
                    </div>
                    <div className="w-1/2 h-full flex flex-col">
                        <img
                            src={book.bookImage?.image ? `data:image/jpeg;base64,${book.bookImage?.image}` : ''}
                            alt={book.title}
                            style={{ objectFit: 'contain', width: '100%', height: '100%', borderRadius: '1%' }}
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