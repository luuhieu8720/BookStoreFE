import {api} from "@/boot/axios";
import CategoryItem from "@/models/category/categories";

export default new class {
    private readonly category = 'categories';
    getCategory(id: string){
        return api.get(`${this.category}${"/"}${id}`)
    }
    getCategories(){
        return api.get(this.category);
    }
    getBookCategory(categoryId: string){
        return api.get(`${this.category}${"/"}${categoryId}${"/books"}`)
    }
    deleteCategory(id: string){
        return api.delete(`${this.category}${"/"}${id}`);
    }
    updateCategory(id: string, category: unknown){
        return api.put(`${this.category}${"/"}${id}`, category)
    }
}
