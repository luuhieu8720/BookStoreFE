<template>
        <div class="container" :style="{marginLeft:'30px'}">
			<form >
				<div class="row">
					<div class="col-md-8 col-md-offset-2">
						<h3  id="padding-page">Chỉnh sửa thể loại</h3>
                            <div class="form-group">
                                    <label for="name">Mã thể loại<span class="require">*</span></label>
                                    <input type="text" name="id"  id="padding-bottom-border" :value="category.id"  class="form-control" readonly >
                            </div>
                             <div class="form-group">
								<label for="name">Tên thể loại<span class="require">*</span></label>
								<input type="text" name="name"  id="padding-bottom-border" :value="category.name"  class="form-control" >
							</div>
							<div class="form-group">
								<label for="description">Mô tả<span class="require">*</span></label>
								<input name="description" :value="category.description"  id="padding-bottom-border" class="form-control" />
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
import categoryServices from '@/services/categories.services'
import store from '@/store'
export default {
    name: 'EditCategory',
    data() {
        return{
            category: [],
            editedCategory: {
                name: "",
                description:""
            }
        }
    },
    created()  
		{  
			this.getCategory();  
		}, 
    methods: { 
		getCategory() {
            categoryServices.getCategory(this.$route.params.id).then(response =>
                {
					this.category = response.data,
					console.log(this.category)
				}).catch(e => {  
					console.log(e);  })
		},
        isInRole(){
            var role = 0;
            if (store.state.user != null){
                role = store.state.user.role;
            }

            return (role == "Admin" || role == "Manager");
        },
        goBack(){
            this.$router.push("/getcategorybyid/" + this.$route.params.id);
        }

	}  
}
</script>

<style scoped>
    #padding-page {
        margin-top: 40px;
    }
</style>