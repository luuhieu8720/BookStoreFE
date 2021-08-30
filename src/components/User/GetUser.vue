<template>     
    <div class = "container">  
		<h2 :style="{textAlign:'center', marginTop:'30px'}">Chi tiết người dùng</h2>
		<form>
            <div class="card-body">
                <div class="row">
                    <div class="col-sm-3">
                    <h6 class="mb-0">Tên tài khoản</h6>
                    </div>
                    <div class="col-sm-9 text-secondary" >
                    <p type="h6" :style="{border: 'none',borderColor: 'transparent', borderWidth: '0px',width: '500px'}" class="text-secondary" >{{user.username}}</p>
                    </div>
                </div>
                <hr />
                <div class="row">
                    <div class="col-sm-3">
                    <h6 class="mb-0">Tên người dùng</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                     <p type="h6" :style="{border: 'none',borderColor: 'transparent', borderWidth: '0px',width: '500px'}" class="text-secondary" >{{user.name}}</p>
                    </div>
                </div>
                <hr />
                <div class="row">
                    <div class="col-sm-3">
                    <h6 class="mb-0">Ngày sinh</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                        <p type="h6" :style="{border: 'none',borderColor: 'transparent', borderWidth: '0px',width: '500px'}" class="text-secondary" >{{user.birthday}}</p>
                    </div>
                </div>
                <hr />
                <div class="row">
                    <div class="col-sm-3">
                    <h6 class="mb-0">Lần online cuối</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                        <p type="h6" :style="{border: 'none',borderColor: 'transparent', borderWidth: '0px',width: '500px'}" class="text-secondary" >{{user.last_online}}</p>
                    </div>
                </div>
                <div class="row" :style="{marginTop: '20px',marginBottom: '13px'}">
                    <div class="col-sm-12">
                    <input type = "submit" class="btn btn-primary" v-if="isInRole()" target="__blank" value="Cập nhật" @click="routeToEdit(author.id)"
                    :style="{borderRadius: '10px'}" />
                    <input type = "submit" class="btn default" v-if="isInRole()" target="__blank" value="Xóa" @click="deleteAuthor()" 
                    :style="{marginLeft:'10px', border: '1px solid black', borderRadius:'10px'}" />
                    </div>
                </div>
            </div>
        </form>
    </div>  
</template>  

<script>
import UserServices from '@/services/users.services';
import moment from "moment";
import store from '@/store';
export default {  
	name: 'GetUser',  
		data() {
			return {
				user: []
			};
		},
		created()  
		{  
			this.getUser();  
		},  
	
	methods: { 
		getUser() {
            UserServices.getUser(this.$route.params.id).then(response =>
                {
					this.user = response.data
					this.user.birthday  = moment(String(this.user.birthday)).format('DD/MM/YYYY')
                    this.user.last_online  = moment(String(this.user.last_online)).format('DD/MM/YYYY hh:mm:ss')
				})
                .catch(e => {  
					console.log(e);  
                })
		},
        routeToEdit(categoryId){
            this.$router.push('/edituser' + "/" + categoryId); 
        },
        isInRole(){
            var role = 0;
            var userId = 0;
            if (store.state.user != null){
                userId = store.state.user.id;
                role = store.state.user.role;
            }

            if (role == "Admin" || userId == this.$route.params.id) return true;
            return false;
        },
        
	} 
} 
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
