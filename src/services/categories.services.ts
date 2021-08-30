import {api} from "@/boot/axios";

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
        return api.delete(this.category + "/" + id.toString());
    }
}
