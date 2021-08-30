<template>     
    <div >
        <div class="container"  >
            <div class="main-body" :style="{paddingTop:'40px', paddingBottom:'60px'}">
                <div class="row gutters-sm">
                    <div class="col-md-4 mb-3">
                    <div  :style="{height: '22rem'}">
                        <div class="card-body">
                        <div class="d-flex flex-column align-items-center text-center">
                            <img v-bind:src="book.cover" alt="Admin" class="rounded-circle" width="250" />
                            <input v-if="isInRole()" class="btn btn-success" type='button' value='Xóa sách'
                                :style="{alignItem:'center', borderRadius:'10px', marginTop:'20px'}" @click="deleteBook()"
                            />
                        </div>
                        </div>
                    </div>
                    </div>
                    <div class="col-md-8">
                    <div class="card mb-3">
                            <div class="card-body">
                                <div class="row" :style="{marginTop:'18px',marginBottom:'18px'}">
                                    <div class="col-sm-3">
                                    <h6 class="mb-0">Mã sách</h6>
                                    </div>
                                    <div class="col-sm-9 text-secondary" >
                                    <p :style="{border:'0',borderWidth :'0px',width:'500px', display:'inline'}" class="text-secondary">{{book.id}}</p>
                                    </div>
                                </div>
                                <hr />
                                <div class="row" :style="{marginTop:'18px',marginBottom:'18px'}">
                                    <div class="col-sm-3">
                                    <h6 class="mb-0">Tên sách</h6>
                                    </div>
                                    <div class="col-sm-9 text-secondary" >
                                   <p :style="{border:'0',borderWidth :'0px',width:'500px', display:'inline'}" class="text-secondary">{{book.name}}</p>
                                    </div>
                                </div>
                                <hr />
                                <div class="row" :style="{marginTop:'18px',marginBottom:'18px'}">
                                    <div class="col-sm-3">
                                    <h6 class="mb-0">Mô tả</h6>
                                    </div>
                                    <div class="col-sm-9 text-secondary">
                                   <p :style="{border:'0',borderWidth :'0px',width:'500px', display:'inline'}" class="text-secondary">{{book.description}}</p>
                                    </div>
                                </div>
                                <hr />
                                <div class="row" :style="{marginTop:'18px',marginBottom:'18px'}">
                                    <div class="col-sm-3">
                                    <h6 class="mb-0">Giá</h6>
                                    </div>
                                    <div class="col-sm-9 text-secondary">
                                    <p :style="{border:'0',borderWidth :'0px',width:'500px', display:'inline'}" class="text-secondary">{{book.price}}</p>
                                    </div>
                                </div>
                                <hr />
                                <div class="row" :style="{marginTop:'18px',marginBottom:'18px'}">
                                    <div class="col-sm-3">
                                    <h6 class="mb-0">Năm phát hành</h6>
                                    </div>
                                    <div class="col-sm-9 text-secondary">
                                    <p :style="{border:'0',borderWidth :'0px',width:'500px', display:'inline'}" class="text-secondary">{{book.year}}</p>
                                    </div>
                                </div>
                                <hr />
                                <div class="row" :style="{marginTop:'18px',marginBottom:'18px'}">
                                    <div class="col-sm-3">
                                    <h6 class="mb-0">Tác giả</h6>
                                    </div>
                                    <div class="col-sm-9 text-secondary">
                                    <p :style="{border:'0',borderWidth :'0px',width:'500px', display:'inline'}" class="text-secondary">{{author.name}}</p>
                                    </div>
                                </div>
                                 <hr />
                                 <div class="row" :style="{marginTop:'18px',marginBottom:'18px'}">
                                    <div class="col-sm-3">
                                    <h6 class="mb-0">Thể loại</h6>
                                    </div>
                                    <div class="col-sm-9 text-secondary">
                                        <p :style="{border:'0',borderWidth :'0px',width:'500px', display:'inline'}" class="text-secondary"
                                        v-for="item in book.categories" :key="item.id">{{item.name}}<br /></p>
                                    </div>
                                </div>

                                <input v-if="isInRole()" class="btn btn-success" type='button' value='Chỉnh sửa'
                                    :style="{alignItem:'center', borderRadius:'10px'}" @click="routeToEdit(book.id)"
                                />
                            </div>

                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>  

<script>
import BookServices from "@/services/books.services";  
import store from '@/store';
export default {  
	name: 'GetBookById',  
		data() {
			return {
				book: [],
                author: [],
                categories: [],
                check : false
			};
		},
		created()  
		{  
			this.getBookById();  
		},  
	
	methods: { 
		getBookById() {
            var bookId = this.$route.params.id
			BookServices.getBookById(bookId).then(response => {  
					this.book = response.data;  
					BookServices.getAuthor(this.book.author_id).then(resAuthor => {  
                        this.author = resAuthor.data;
					});
				})  
				.catch(e => {  
					console.log(e);  
				});  
		},  
        deleteBook(){
            var bookId = this.$route.params.id
            BookServices.deleteBook(bookId)
            .then()
            .finally(
                this.$router.push('/getbooks')
            )
        },
        isInRole(){
            var role = 0;
            var userId = 0;
            if (store.state.user != null){
                userId = store.state.user.id;
                role = store.state.user.role;
            }

            if (role == "Admin" || role == "Manager" || userId == this.$route.params.id) return true;
            return false;
        },

        routeToEdit(bookId){
            this.$router.push('/editBook/' + bookId); 
        }
	}  
} 
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>  

</style>
