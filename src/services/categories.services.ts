import {api} from "@/boot/axios";
import authHeader from "@/models/user/auths.header";

export default new class {
    private readonly category = 'categories';
    getCategory(id: number){
        return api.get(this.category + "/" + id.toString())
    }
    getCategories(){
        return api.get(this.category);
    }
    getBookCategory(categoryId: number){
        return api.get(this.category + "/" + categoryId.toString() + "/books")
    }
    deleteCategory(id: number){
        return api.delete(this.category + "/" + id.toString(), { headers: authHeader() });
    }
    updateCategory(id: number, category: unknown){
        return api.put(this.category + "/" + id.toString(), category, { headers: authHeader() })
    }
}
