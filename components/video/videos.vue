<template>
  <div class="hello flex-row hello_photo">
    <div class="videos_box flex flex-col flex-main-start flex-second-start">
      <videoitem v-for="(el, index) in $store.state.videos" :data="el" :key="index" />

      <div class="aligner flex-row flex-main-center flex-second-center" v-if="$store.state.videos.length == 0">
        <img class="break_photo" src="/img/edu.png" />
      </div>
    </div>


    <div class="logs_box flex-col flex-main-start">
      <div class="logstitle">Processing logs</div>
      <img v-if="!$store.state.video_log" class="tech_logo" src="/img/tech.svg" />

      <div >{{$store.state.video_log}}</div>
    </div>

  </div>
</template>

<script>
/* eslint-disable */

import { mapState } from "vuex";
import videoitem from './item.vue';

export default {
  name: "sample",
  props: {},
  computed: {
    ...mapState({
      // list: state => state.graphs.list
    })
  },
  data() {
    return {
      timer: null
    };
  },
  created() {
    this.$data.timer = setInterval(()=>{
      this.$store.commit('get_video_logs')
    }, 3000)
  },
  beforeDestroy(){
    clearInterval(this.$data.timer)
  },
  methods: {},
  components: {
    videoitem
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.hello_photo{
  padding-left: 20px;
  padding-top: 10px;
  overflow: auto!important;

  // background-color: green;
  height: 90%;
}
.break_photo{
  width: 400px;
}
.aligner{
  width: 100%;
  height: 100%;
  opacity: 0.7;
}
.videos_box{
  overflow: auto;
  // background-color: yellow;
  height: 100%;
  width: 100%;
  // height: 100%;
}
.logs_box{
  padding-left: 20px;
  padding-right: 20px;
  border-left: 1px solid rgba(130, 130, 130, 0.2);
}
.logstitle{
  margin-top: 15px;
  margin-bottom: 15px;
}
.tech_logo{
  // width: 20px;
}
// .videos_box{
  // background-color: pink;
// }
</style>
