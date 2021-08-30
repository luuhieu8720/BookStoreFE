<template>     
    <div class = "container">  
		<h2 :style="{textAlign:'center', marginTop:'30px', marginBottom:'30px'}">Kho sách</h2>
		<table class="table">  
			<thead>  
				<th :style="{paddingLeft:'8px'}">Id</th>  
				<th :style="{paddingLeft:'8px'}">Tên sách</th>  
				<th :style="{paddingLeft:'8px'}">Tác giả</th>  
				<th :style="{paddingLeft:'8px'}">Giá</th>  
				<th :style="{paddingLeft:'8px'}">Year</th>  
				<th></th>  
			</thead>  
			<tbody>  
				<tr v-for="item in books" :key="item.id">  
					<td>{{ item.id }}</td>  
					<td>{{ item.name }}</td>  
					<td v-if="item.author">{{ item.author.name }}</td>
					<td v-else>fetching...</td>
					<td>{{ item.price }}</td>  
					<td>{{ item.year }}</td>   
					<td><input class="btn btn-success" type='button' value='Chi tiết' @click="detail(item.id)"/></td>
				</tr>  
			</tbody>  
		</table>  
    </div>  
</template>  

<script>
import BookServices from "@/services/books.services";  
export default {  
	name: 'GetBooks',  
		data() {
			return {
				books: [],
				categories: [],
				author: [],
			};
		},
		created()  
		{  
			this.getBooks();  
		},  
	
	methods: { 
		getBooks() {  
			BookServices.getBooks().then(response => {  
					this.books = response.data;  
					console.log(response.data);
					this.getAuthors();  
				})  
				.catch(e => {  
					console.log(e);  
				});  
		},
		getAuthors() {
		let promises = this.books.map(book => this.getAuthor(book));
			return Promise.all(promises);
		},
		getAuthor(book) { 
			BookServices.getAuthor(book.author_id).then(response => {  
					book.author = response.data;
					console.log(response.data.name);  
				});
			return this.author;
		},  
		detail(bookId){
			//localStorage['bookId'] = bookId;
			this.$router.push('/getbookbyid/' + bookId); 
		}
	}  
} 
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
