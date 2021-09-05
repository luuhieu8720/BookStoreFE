import {api} from "@/boot/axios";
import CategoryItem from "@/models/category/categories";

export default new class {
    private readonly endpoint = 'categories';
    getCategory(id: string){
        return api.get(`${this.endpoint}${"/"}${id}`)
    }
    getCategories(){
        return api.get(this.endpoint);
    }
    getBookCategory(categoryId: string){
        return api.get(`${this.endpoint}/${categoryId}${"/books"}`)
    }
    deleteCategory(id: string){
        return api.delete(`${this.endpoint}/${id}`);
    }
    updateCategory(id: string, category: CategoryItem){
        return api.put(`${this.endpoint}/${id}`, category)
    }
}
