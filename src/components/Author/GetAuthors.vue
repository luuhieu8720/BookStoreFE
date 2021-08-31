<template>     
    <div class = "container">  
		<h2 :style="{textAlign:'center', marginTop:'30px', marginBottom:'30px'}">Danh sách tác giả</h2>
		<table class="table">  
			<thead>  
				<th :style="{paddingLeft:'8px'}">Id</th>  
				<th :style="{paddingLeft:'8px'}">Tên tác giả</th>  
				<th :style="{paddingLeft:'8px'}">Website</th>  
				<th :style="{paddingLeft:'8px'}">Ngày sinh</th>  
				<th></th>  
			</thead>  
			<tbody>  
				<tr v-for="item in authors" :key="item.id">  
					<td>{{ item.id }}</td>  
					<td>{{ item.name }}</td>  
					<td>{{ item.website }}</td>  
					<td>{{ item.birthday }}</td>   
					<td><input class="btn btn-success" type='button' value='Chi tiết' @click="detail(item.id)"/></td>
				</tr>  
			</tbody>  
		</table>  
    </div>  
</template>  

<script>
import authorsServices from '@/services/authors.services';
import moment from 'moment'
export default {  
	name: 'GetAuthors',  
		data() {
			return {
				authors: [],
			};
		},
		created()  
		{  
			this.getAuthors();  
		},  
	
	methods: { 
		getAuthors() {
            authorsServices.getAuthors().then(response =>
                {
					this.authors = response.data,
					this.authors.forEach(author => author.birthday =  moment(String(author.birthday)).format('DD/MM/YYYY'))
				}).catch(e => {  
					console.log(e);  })
		},
		detail(authorId){
			//localStorage['bookId'] = bookId;
			this.$router.push('/getauthorbyid/' + authorId); 
		}
	} 
} 
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
