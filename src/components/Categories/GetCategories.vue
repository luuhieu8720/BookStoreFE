<template>     
    <div class = "container">  
		<h2 :style="{textAlign:'center', marginTop:'30px', marginBottom:'30px'}">Danh sách tác giả</h2>
		<table class="table">  
			<thead>  
				<th :style="{paddingLeft:'8px'}">Id</th>  
				<th :style="{paddingLeft:'8px'}">Thể loại</th>  
				<th :style="{paddingLeft:'8px'}">Mô tả</th>  
				<th></th>  
			</thead>  
			<tbody>  
				<tr v-for="item in categories" :key="item.id">  
					<td>{{ item.id }}</td>  
					<td>{{ item.name }}</td>  
					<td>{{ item.description }}</td>  
					<td><input class="btn btn-success" type='button' value='Chi tiết' @click="detail(item.id)"/></td>
				</tr>  
			</tbody>  
		</table>  
    </div>  
</template>  

<script>
import categoryServices from '@/services/categories.services';
export default {  
	name: 'GetCategories',  
		data() {
			return {
				categories: [],
			};
		},
		created()  
		{  
			this.getCategories();  
		},  
	
	methods: { 
		getCategories() {
            categoryServices.getCategories().then(response =>
                this.categories = response.data,
            ).catch(e => {  
					console.log(e);  })
		},
		detail(categoryId){
			this.$router.push('/getcategorybyid/' + categoryId); 
		}

	}  
} 
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
