<template>
  <div>
    <div>
      <button @click="cilckUp">文件上传</button>
      <button>上传至服务器</button>
    </div>
    <div class="dn">
      <input @change="change" type="file" ref="upoadi" />
    </div>
    <h1>{{files}}</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      files:'点击上传文件',
    };
  },
  methods: {
    cilckUp() {
      this.$refs.upoadi.click(()=>{
      })
    },
    change(e){
      console.log(e.target.files[0]);
      this.files = e.target.files[0].name
      let reg = /(jpg)/

    }
  },
};
</script>

<style>
.dn{
  display: none;
}
</style>
