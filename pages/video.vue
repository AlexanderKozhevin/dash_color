<template>
  <div class="desktop-root flex-row flex-main-center">

      <div class="root-content">
        <main-menu active="video"></main-menu>
        <div class="my-contentent flex-col flex-main-start">
          <upload />
          <videos />
        </div>
      </div>

  </div>
</template>

<script>
import mainMenu from '@/components/menu.vue';
import upload from '@/components/video/upload.vue';
import videos from '@/components/video/videos.vue';

export default {
  components: {
    'main-menu': mainMenu,
    'upload': upload,
    videos
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
