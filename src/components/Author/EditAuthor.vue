<template>
	<div class="container" :style="{marginLeft:'30px'}">
		<form>
			<div class="row">
				<div class="col-md-8 col-md-offset-2">
					<h3  id="padding-page">Chỉnh sửa tác giả</h3>
						<div class="form-group">
								<label for="name">Mã tác giả<span class="require">*</span></label>
								<input type = "text" name="id" :placeholder="author.id" v-model="author.id" id="padding-bottom-border" class="form-control" readonly />
						</div>
							<div class="form-group">
							<label for="name">Tên tác giả<span class="require">*</span></label>
							<input type = "text" name="name" :placeholder="author.name" v-model="author.name" id="padding-bottom-border" class="form-control" />
						</div>
						<div class="form-group">
							<label for="birthday">Ngày sinh<span class="require">*</span></label>
							<input type="date" name="description"  v-model="author.birthday" id="padding-bottom-border" class="form-control" />
						</div>
						<div class="form-group">
							<input type = "button" class="btn btn-primary" target="__blank" value="Cập nhật"
							:style="{borderRadius: '10px'}" @click="updateAuthor()" />
							<input type = "button" class="btn default" target="__blank" value="Hủy" @click="goBack()" 
							:style="{marginLeft:'10px', border: '1px solid black', borderRadius:'10px'}" />
						</div> 
				</div>
			</div>
		</form>
	</div>

</template>
<script>
import authorServices from '@/services/authors.services'
import store from '@/store'
import useNotification from "@/logics/notification.logic"
import moment from 'moment'
export default {
    name: 'EditAuthor',
    data() {
        return{
            author: [],
            notification: useNotification()
        }
    },
    created()  
		{ 
			this.getAuthor();  
		},
    methods: { 
		getAuthor() {
            this.checkRole();
            authorServices.getAuthor(this.$route.params.id).then(response =>
                {
					this.author = response.data,
					this.author.birthday =  moment(String(this.author.birthday)).format('YYYY-MM-DD')
					console.log(this.author)
				}).catch(e => {  
					console.log(e);  
                })
		},
        
        checkRole(){
            if (store.state.user.role != "Admin") 
            {
                alert("Bạn không có quyền truy cập trang!");
                this.goBack();
            }
        },
        goBack(){
            this.$router.push("/getauthorbyid/" + this.$route.params.id);
        },
        updateAuthor(){
            authorServices.updateAuthor(this.$route.params.id, this.author)
            .then(() => {
				this.notification.showMessage("Cập nhật thành công!");
				this.goBack();
			})
			.catch(error => {
				console.log(error);
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