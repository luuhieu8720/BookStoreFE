import {api} from "@/boot/axios";

export default new class {
    private readonly author = 'authors';
    getAuthor(id: number){
        console.log(id);
        return api.get(this.author + "/" + id.toString())
    }
    getAuthors(){
        return api.get(this.author);
    }
    deleteAuthor(authorId: number){
        return api.delete(this.author + "/" + authorId.toString());
    }
}
