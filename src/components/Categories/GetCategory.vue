<template>     
    <div class = "container">  
		<h2 :style="{textAlign:'center', marginTop:'30px'}">Chi tiết thể loại</h2>
		<form>
            <div class="card-body">
                <div class="row" :style="{marginBottom:'18px'}">
                    <div class="col-sm-3">
                    <h6 class="mb-0">Tên thể loại</h6>
                    </div>
                    <div class="col-sm-9 text-secondary" >
                    <p type="h6" :style="{border: 'none',borderColor: 'transparent', borderWidth: '0px',width: '500px'}" class="text-secondary" >{{category.name}}</p>
                    </div>
                </div>
                <hr />
                <div class="row" :style="{marginTop:'18px', marginBottom:'18px'}">
                    <div class="col-sm-3">
                    <h6 class="mb-0">Mô tả</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                     <p type="h6" :style="{border: 'none',borderColor: 'transparent', borderWidth: '0px',width: '500px'}" class="text-secondary" >{{category.description}}</p>
                    </div>
                </div>
                <hr />
                <div class="row" :style="{marginTop:'18px', marginBottom:'18px'}">
                    <div class="col-sm-3">
                    <h6 class="mb-0">Các sách thuộc thể loại này</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                     <p type="h6" :style="{border: 'none',borderColor: 'transparent', borderWidth: '0px',width: '500px'}"
                      class="text-secondary" v-for="item in books" :key="item.id" >{{item.name}}</p>
                    </div>
                </div>
                <hr />
                <div class="row" :style="{marginTop: '20px',marginBottom: '13px'}">
                    <div class="col-sm-12">
                    <input type = "submit" :hidden="!isInRole()" class="btn btn-primary" target="__blank" value="Cập nhật" @click="routeToEdit(category.id)"
                    :style="{borderRadius: '10px'}" />
                    <input type = "button" :hidden="!isInRole()" class="btn default" target="__blank" value="Xóa" @click="deleteCategory()" 
                    :style="{marginLeft:'10px', border: '1px solid black', borderRadius:'10px'}" />
                    <input type = "button" :hidden="isInRole()" class="btn btn-primary" target="__blank" value="Quay lại" @click="goBack()"
                    :style="{borderRadius: '10px'}" />
                    </div>
                </div>
            </div>
        </form>
    </div>  
</template>  

<script>
import CategoriesServices from '@/services/categories.services'
import store from '@/store'
export default {  
	name: 'GetCategory',  
		data() {
			return {
				category: [],
                books: []
			};
		},
		created()  
		{  
			this.getCategory();  
            this.getBookCategory(this.$route.params.id);
		},  
	
	methods: { 
		getCategory() {
            CategoriesServices.getCategory(this.$route.params.id).then(response =>
                {
					this.category = response.data
				})
                .catch(e => {  
					console.log(e);  
                })
		},
        getBookCategory(categoryId){
            CategoriesServices.getBookCategory(categoryId).then(response => {
                this.books = response.data
            })
            .catch(e => {
                console.log(e);
            })
        },
        routeToEdit(categoryId){
            this.$router.push('/editcategory/' + categoryId); 
        },
        deleteCategory(){
            if(confirm("Bạn muốn xóa thể loại này?")){
                CategoriesServices.deleteCategory(this.$route.params.id)
                .then( () => {
                    alert("Xóa thành công!");
                    this.$router.push("/categories");
                })
                .catch(error => {
                    console.log(error);
                })
            }
            else {
                this.goBack();
            }
        },
        isInRole(){
            var role = 0;
            if (store.state.user != null){
                role = store.state.user.role;
            }
            return (role == "Admin");
        },
        goBack(){
            this.$router.push("/categories");
        },
        
	} 
} 
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
