import {api} from "@/boot/axios";

export default new class {
    private readonly user = 'users';
    getUser(id: number){
        console.log(id);
        return api.get(this.user + "/" + id.toString())
    }
    getUsers(){
        return api.get(this.user);
    }
}
