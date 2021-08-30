import {api} from "@/boot/axios";
import BookItem from "@/models/book/books";
import { AxiosResponse } from 'axios'
import store from "@/store";

export default new class {
    private readonly book = 'books';
    private readonly author = 'authors';
    getBooks () {
        return api.get(this.book)
    }
    test (): Promise<AxiosResponse<BookItem>> {
        return api.post<BookItem>(this.book)
    }
    getAuthor(id: number){
        console.log(id);
        return api.get(this.author + "/" + id.toString())
    }
    getBookById(bookId: number){
		return api.get(this.book + "/" + bookId.toString());
	}
    deleteBook(bookId: number){
        return api.delete(this.book + "/" + bookId.toString());
    }
    editBook(bookId: number, book: []){
        return api.put(this.book + "/" +  bookId.toString(),store.state.token);
    }

}
