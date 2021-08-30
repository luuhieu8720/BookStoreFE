<template>     
    <div class = "container">  
		<h2 :style="{textAlign:'center', marginTop:'30px', marginBottom:'30px'}">Danh sách người dùng</h2>
		<table class="table">  
			<thead>  
				<th :style="{paddingLeft:'8px'}">Id</th>  
				<th :style="{paddingLeft:'8px'}">Tên người dùng</th>  
				<th :style="{paddingLeft:'8px'}">Tên đăng nhập</th>  
				<th :style="{paddingLeft:'8px'}">Ngày sinh</th>  
				<th></th>  
			</thead>  
			<tbody>  
				<tr v-for="item in users" :key="item.id">  
					<td>{{ item.id }}</td>  
					<td>{{ item.name }}</td>  
					<td>{{ item.username }}</td>  
					<td>{{ item.birthday }}</td>   
					<td><input class="btn btn-success" type='button' value='Chi tiết' @click="detail(item.id)"/></td>
				</tr>  
			</tbody>  
		</table>  
    </div>  
</template>  

<script>
import userServices from '@/services/users.services';
import momment from 'moment'
export default {  
	name: 'GetUsers',  
		data() {
			return {
				users: [],
			};
		},
		created()  
		{  
			this.getUsers();  
		},  
	
	methods: { 
		getUsers() {
            userServices.getUsers().then(response =>
                {
					this.users = response.data,
					this.users.forEach(user => user.birthday = momment().format('YYYY/MM/DD')),
					console.log(this.users)
				}).catch(e => {  
					console.log(e);  })
		},
		detail(userId){
			this.$router.push("/getuserbyid" + "/" + userId);
		}

	} 
} 
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
