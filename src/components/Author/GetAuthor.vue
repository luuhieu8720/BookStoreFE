<template>     
    <div class = "container">  
		<h2 :style="{textAlign:'center', marginTop:'30px', marginBottom:'30px'}">Chi tiết tác giả</h2>
		<form>
            <div class="card-body">
                <div class="row" :style="{marginTop:'18px',marginBottom:'18px'}">
                    <div class="col-sm-3">
                    <h6 class="mb-0">Họ và tên</h6>
                    </div>
                    <div class="col-sm-9 text-secondary" >
                    <p type="h6" :style="{border: 'none',borderColor: 'transparent', borderWidth: '0px',width: '500px'}" class="text-secondary" >{{author.name}}</p>
                    </div>
                </div>
                <hr />
                <div class="row" :style="{marginTop:'18px', marginBottom:'18px'}">
                    <div class="col-sm-3">
                    <h6 class="mb-0">Website</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                     <p type="h6" :style="{border: 'none',borderColor: 'transparent', borderWidth: '0px',width: '500px'}" class="text-secondary" >{{author.website}}</p>
                    </div>
                </div>
                <hr />
                <div class="row" :style="{marginTop: '18px', marginBottom:'18px'}">
                    <div class="col-sm-3">
                    <h6 class="mb-0">Ngày sinh</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                     <p type="h6" :style="{border: 'none',borderColor: 'transparent', borderWidth: '0px',width: '500px'}" class="text-secondary" >{{author.birthday}}</p>
                    </div>
                </div>
                <hr />
                <div class="row" :style="{marginTop: '20px',marginBottom: '13px'}">
                    <div class="col-sm-12">
                    <input type = "submit" class="btn btn-primary" target="__blank" value="Cập nhật" @click="routeToEdit(author.id)"
                    :style="{borderRadius: '10px'}" />
                    <input type = "submit" class="btn default" target="__blank" value="Xóa" @click="deleteAuthor()" 
                    :style="{marginLeft:'10px', border: '1px solid black', borderRadius:'10px'}" />
                    </div>
                </div>
            </div>
        </form>
    </div>  
</template>  

<script>
import authorsServices from '@/services/authors.services';
import momment from 'moment'
export default {  
	name: 'GetAuthor',  
		data() {
			return {
				author: [],
			};
		},
		created()  
		{  
			this.getAuthor();  
		},  
	
	methods: { 
		getAuthor() {
            authorsServices.getAuthor(this.$route.params.id).then(response =>
                {
					this.author = response.data,
					this.author.birthday = momment().format('YYYY/MM/DD'),
					console.log(this.author)
				}).catch(e => {  
					console.log(e);  })
		},
        routeToEdit(authorId){
            this.$router.push('/editauthor/' + authorId); 
        },
        deleteAuthor(){
            if(confirm("Bạn muốn xóa tác giả này?")){
                authorsServices.deleteAuthor(this.$route.params.id)
                .then( () => {
                    alert("Xóa thành công!");
                    this.$router.push("/authors");
                })
                .catch(error => {
                    console.log(error);
                })
            }
            else {
                window.location.reload();
            }
        }

	} 
} 
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
