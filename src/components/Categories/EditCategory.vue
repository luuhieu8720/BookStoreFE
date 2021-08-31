<template>
        <div class="container" :style="{marginLeft:'30px'}">
			<form>
				<div class="row">
					<div class="col-md-8 col-md-offset-2">
						<h3  id="padding-page">Chỉnh sửa thể loại</h3>
                            <div class="form-group">
                                    <label for="name">Mã thể loại<span class="require">*</span></label>
                                   <input type = "text" name="id" :placeholder="category.id" v-model="category.id" class="form-control" readonly />
                            </div>
                             <div class="form-group">
								<label for="name">Tên thể loại<span class="require">*</span></label>
								<input type = "text" name="name" :placeholder="category.name" v-model="category.name" class="form-control" />
							</div>
							<div class="form-group">
								<label for="description">Mô tả<span class="require">*</span></label>
								<textarea rows="6" name="description" :placeholder="category.description" v-model="category.description" class="form-control" />
							</div>
							<div class="form-group">
								<input type="button" class="btn btn-primary" value="Cập nhật"
								:style="{borderRadius: '10px'}" @click="updateCategory()" />
								<input type="button" class="btn default" value="Hủy" @click="goBack()" 
								:style="{marginLeft:'10px', border: '1px solid black', borderRadius:'10px'}" />
							</div> 
                    </div>
                </div>
			</form>
		</div>

</template>
<script>
import categoryServices from '@/services/categories.services'
import store from '@/store'
import useNotification from "@/logics/notification.logic"
import router from '@/router'
import { Role } from '@/models/user/role'
export default {
    name: 'EditCategory',
    data() {
        return{
            category: [],
            notification: useNotification(),
        }
    },
    created()  
		{ 
			this.getCategory();  
		},
    methods: { 
		getCategory() {
			this.checkRole();
			categoryServices.getCategory(this.$route.params.id).then(response =>
				{
					this.category = response.data,
					console.log(this.category)
				}).catch(e => {  
					console.log(e);  
				})
		},
        
		checkRole(){
            if (store.state.user != null){
                if (store.state.user.role != Role.Admin) 
				{
					alert("Bạn không có quyền truy cập trang!");
					this.goBack();
				}
            }
			else {
				alert("Bạn cần đăng nhập để thực hiện!");
				router.push({name: "BooksPage"})
			}
		},

		goBack(){
			router.push({ name: 'GetCategory', params: {id: this.category.id} });
		},

		updateCategory(){
			categoryServices.updateCategory(this.$route.params.id, this.category)
			.then(() => {
				this.notification.showMessage("Cập nhật thành công!");
				this.goBack();
			});
		}
	}  
}
</script>

<style scoped>
    #padding-page {
        margin-top: 40px;
    }
</style>