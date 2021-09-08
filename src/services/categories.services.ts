import { api } from "@/boot/axios";
import CategoryItem from "@/models/category/categories";

export default new class {
    private readonly endpoint = 'categories';

    get(id: string) {
        return api.get(`${this.endpoint}/${id}`)
    }

    getCategories() {
        return api.get(this.endpoint);
    }

    getBooks(categoryId: string) {
        return api.get(`${this.endpoint}/${categoryId}/books`)
    }

    delete(id: string) {
        return api.delete(`${this.endpoint}/${id}`);
    }

    update(id: string, category: CategoryItem) {
        return api.put(`${this.endpoint}/${id}`, category)
    }
}
