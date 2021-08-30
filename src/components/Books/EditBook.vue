<template>
        <div class="container" :style="{marginLeft:'30px'}">
			<form >
				<div class="row">
					<div class="col-md-8 col-md-offset-2">
						<h1  id="padding-page">Chỉnh sửa sách</h1>
                        <div class="form-group">
								<label for="name">Tên sách <span class="require">*</span></label>
								<input type="text" name="name"  id="padding-bottom-border" :value="book.name"  class="form-control" >
							</div>
							<div class="form-group">
								<label for="description">Mô tả sách <span class="require">*</span></label>
								<textarea rows="5" type="text" name="description" v-model="book.description"  id="padding-bottom-border" class="form-control" />
							</div>
							
							<div class="form-group">
								<label for="price">Giá bán<span class="require">*</span></label>
								<input rows="5" name="price" :value="book.price" id="padding-bottom-border" class="form-control" />
							</div>
                            <div class="form-group">
								<label for="year">Năm phát hành<span class="require">*</span></label>
								<input rows="5" name="year" :value="book.year" id="padding-bottom-border" class="form-control" />
							</div>
							<div class="form-group">
								<label for="authorId">Mã tác giả</label>
								<input rows="5" name="price" :value="book.author_id" id="padding-bottom-border" class="form-control" />
							</div>
                            <label>Xem mã tác giả <router-link to="/authors">tại đây</router-link> </label>
							<div class="form-group">
								<p><span class="require">*</span> - Không được để trống</p>
							</div>
                                <label>Ảnh bìa</label>
								<div class="form-group" id="padding-bottom">
									<input type="file" name="fileUpload" value="">
								</div>

                            <div id='example-3'>
                            <input type="checkbox" :style="{marginLeft:'5px'}" id="novel" value="novel" v-model="checkedNames">
                            <label for="novel" :style="{marginLeft:'5px'}">Tiểu thuyết</label>
                            <input type="checkbox" :style="{marginLeft:'20px'}" id="prose" value="prose" v-model="checkedNames">
                            <label for="prose" :style="{marginLeft:'5px'}">Tryện ngắn</label>
                            <input type="checkbox" :style="{marginLeft:'20px'}" id="poem" value="poem" v-model="checkedNames">
                            <label for="poem" :style="{marginLeft:'5px'}">Thơ</label>
                            <input type="checkbox" :style="{marginLeft:'20px'}" id="self-help" value="self-help" v-model="checkedNames">
                            <label for="self-help" :style="{marginLeft:'5px'}">Self-hep</label>
                            <br>
                            <span>Bạn đã chọn: {{ checkedNames }}</span>
                            </div>  
							
							<div class="form-group">
								<button type="submit" class="btn btn-success" name="submit">
									Create
								</button>
								<button class="btn btn-default" id="border">
									Cancel
								</button>
							</div>
                    </div>
                </div>
			</form>
		</div>

</template>
<script>
import BookServices from '@/services/books.services'
import store from '@/store';
export default {
    name: 'EditBook',
    data() {
        return{
            checkedNames: [],
            book: [],
            editedBook: {
                name: "",
                description: "",
                price: "",
                year: "",
                author_id: "",
                cover: "",
                categories: [
                    1
                ]
            }
        }
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

	}  
}
</script>

<style scoped>
    #padding-page {
        margin-top: 20px;
    }
</style>