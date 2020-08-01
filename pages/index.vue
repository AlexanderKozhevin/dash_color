<template>
  <div class="desktop-root flex-row flex-main-center">
    <div class="root-container">
      <div class="root-content">
        <main-menu active="index"></main-menu>
        <div class="my-contentent flex-col flex-main-start">
          <upload />
          <photos />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mainMenu from '@/components/menu.vue';
import upload from '@/components/photos/upload.vue';
import photos from '@/components/photos/photos.vue';

export default {
  components: {
    'main-menu': mainMenu,
    'upload': upload,
    photos
  },
  created(){
    // this.$store.commit('shift_page')
    setTimeout(()=>{
      this.$store.commit('get_list')
      setInterval(()=>{
        this.$store.commit('get_list')
      }, 5000)
    }, 50)


  }
}
</script>

<style lang="scss">

</style>
