<template>     
    <div >  
		<h2 :style="{textAlign:'center', marginTop:'30px', marginBottom:'30px'}">Danh sách thể loại</h2>
			<DataTable :value="categories">
				<Column field="id" header="ID" style="width: 70px"/>

				<Column field="name" header="Thể loại" style="width: 200px"/>

				<Column field="description" header="Mô tả" style="width: 550px"/>

				<Column field="id" header="Chi tiết">
					<template #body="slotProps" >
						<Button type="button" @click="detail(slotProps.data.id)" label="Xem" class="btn btn-detail"></Button>
					</template>
				</Column>
			</DataTable>
    </div>  
</template>  

<script>
import categoryServices from '@/services/categories.services';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import router from 'vue-router'
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

	components: {
		DataTable,
		Column
	},
	
	methods: { 
		getCategories() {
            categoryServices.getCategories().then(response =>
                {
					this.categories = response.data
				}
            ).catch(e => {  
					console.log(e);  })
		},
		detail(categoryId){
			this.$router.push('/getcategory/' + categoryId); 
		},

	}  
} 
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.btn-detail {
	color: #fff;
	background-color: #198754;
	border-color: #198754;
	}
	.btn-detail:hover {
		color: #fff;
		background-color: #157347;
		border-color: #146c43;
	}
</style>
