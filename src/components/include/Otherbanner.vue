<template>
<section class="breadcrumb-section">
    <div class="container">
        <div class="row">
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item"><router-link to="/">Home</router-link></li>
                <li class="breadcrumb-item" v-if="isObject()" ><span v-for="(item) in breadcrumb" :key="item.id"><router-link :to="{name:item.route}">{{ item.name }}</router-link>/</span></li>
                <li class="breadcrumb-item active" v-else><a href="../#">{{name}}</a></li>
              </ol>
            </nav>
        </div>
    </div>
</section>
</template>
<script>
export default {
    name:'Other_banner', 
    props: {
    name: [Object, String, Array]
  }, 
  data(){
     return {
       newProducts: this.name,
       breadcrumb:null 
     }
   },
  created() {
    console.log(this.newProducts);
    if(this.isObject()){
      this.breadcrumb = this.newProducts;
    }else{
      this.breadcrumb = this.newProducts;
    }
  },
  methods:{
    isObject:function() {
    if (this.newProducts === null) { return false;}
    return ( (typeof val === 'function') || (typeof this.newProducts === 'object') );
}
  }            
    }
</script>