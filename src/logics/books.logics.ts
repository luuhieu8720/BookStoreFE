import BookItem from '@/models/book/books'
import BooksService from '@/services/books.services'
import { SET_BOOK } from '@/store';
import {computed} from "vue";
import {useStore} from "vuex";

export function useBooks(){
    const store = useStore()
    const book = computed(() => store.state.book as BookItem| null)
    const getBook = (id: number) => {
        return BooksService.getBookById(id)
            .then(response => {
                console.log(response.data);
                store.commit(SET_BOOK, response.data)
            })
    }

    return {
        book,
        getBook
    }
}