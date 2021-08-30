<template>
        <div class="container" :style="{marginLeft:'30px'}">
			<form >
				<div class="row">
					<div class="col-md-8 col-md-offset-2">
						<h3  id="padding-page">Chỉnh sửa tác giả</h3>
                             <div class="form-group">
								<label for="name">Tên tác giả<span class="require">*</span></label>
								<input type="text" name="name"  id="padding-bottom-border" :value="author.name"  class="form-control" >
							</div>
							<div class="form-group">
								<label for="description">Ngày sinh<span class="require">*</span></label>
								<input type="date" name="birthday" :value="author.birthday"  id="padding-bottom-border" class="form-control" />
							</div>
							
							<div class="form-group">
								<label for="price">Website<span class="require">*</span></label>
								<input type = "text" name="website" :value="author.website" id="padding-bottom-border" class="form-control" />
							</div>
							<div class="form-group">
								<input type = "submit" class="btn btn-primary" target="__blank" value="Cập nhật" @click="routeToEdit(author.id)"
								:style="{borderRadius: '10px'}" />
								<input type = "submit" class="btn default" target="__blank" value="Hủy" @click="goBack()" 
								:style="{marginLeft:'10px', border: '1px solid black', borderRadius:'10px'}" />
							</div> 
                    </div>
                </div>
			</form>
		</div>

</template>
<script>
import AuthorServices from '@/services/authors.services'
import store from '@/store'
import momment from 'moment'
export default {
    name: 'EditAuthor',
    data() {
        return{
            author: [],
            editedAuthor: {
                name: "",
                birthday: "",
                website: ""
            }
        }
    },
    created()  
		{  
			this.getAuthor();  
		}, 
    methods: { 
		getAuthor() {
            AuthorServices.getAuthor(this.$route.params.id).then(response =>
                {
					this.author = response.data,
					this.author.birthday = momment().format('YYYY-MM-DD'),
					console.log(this.author)
				}).catch(e => {  
					console.log(e);  })
		},
        isInRole(){
            var role = 0;
            if (store.state.user != null){
                role = store.state.user.role;
            }

            if (role == "Admin") return true;
            return false;
        },
        goBack(){
            this.$router.push("/getauthorbyid/" + this.$route.params.id);
        }

	}  
}
</script>

<style scoped>
    #padding-page {
        margin-top: 40px;
    }
</style>