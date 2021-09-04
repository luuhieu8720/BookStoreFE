import {api} from "@/boot/axios";

export default new class {
    private readonly author = 'authors';
    getAuthor(authorId: string){
        return api.get(`${this.author}${"/"}${authorId}`)
    }
    getAuthors(){
        return api.get(this.author);
    }
    deleteAuthor(authorId: string){
        return api.delete(`${this.author}${"/"}${authorId}`);
    }
    updateAuthor(authorId: string, authorItem: unknown){
        return api.put(`${this.author}${"/"}${authorId}`, authorItem);
    }
}
