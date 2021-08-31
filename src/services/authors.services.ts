import {api} from "@/boot/axios";
import authHeader from "@/models/user/auths.header";

export default new class {
    private readonly author = 'authors';
    getAuthor(id: number){
        return api.get(this.author + "/" + id.toString())
    }
    getAuthors(){
        return api.get(this.author);
    }
    deleteAuthor(authorId: number){
        return api.delete(this.author + "/" + authorId.toString(), { headers: authHeader()});
    }
    updateAuthor(authorId: number, authorItem: unknown){
        return api.put(this.author + "/" + authorId.toString(), authorItem, { headers: authHeader()});
    }
}
