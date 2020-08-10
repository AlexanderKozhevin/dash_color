<template>
  <div class="hello_img">
    <div class="preview flex-row flex-second-center">

      <div class="naming flex-col">
        <div>{{data.filename}}</div>
        <a :href="'http://localhost:3000/video_source/' + data.name">/home/cfa/dash_color/video/source/{{data.name}}</a>
        <a v-if="data.status == 'done'" :href="'http://localhost:3000/video_result/' + data.name">/home/cfa/dash_color/video/result/{{data.name}}</a>
      </div>

      <div class="flex">
      </div>
      <div class="flex-row flex-main-center flex-second-center" v-if="data.status == 'wait'">
        <div>Wait</div>
        <img class="wait_icon" src="/img/waiting.svg" />
      </div>

      <div class="flex-row   flex-main-center flex-second-center" v-if="data.status == 'work'">
        <div>Processing</div>
        <img class="wait_icon" src="/img/work.svg" />
      </div>

      <div class="flex-row  flex-main-center flex-second-center" v-if="data.status == 'done'">
        <div>Ready</div>

        <img class="wait_icon" src="/img/done.svg" />

      </div>



    </div>

  </div>
</template>

<script>
/* eslint-disable */

import { mapState } from "vuex";

export default {
  name: "sample",
  props: {
    data: Object
  },
  computed: {
    ...mapState({
      // list: state => state.graphs.list
    })
  },
  data() {
    return {};
  },
  created() {
    console.log('created yo');
    console.log(this.data);
  },
  methods: {
    getStyle(data){
      let url = data.original

      if (data.status == 'done'){
        url = data.link
        // url = "https://storage.googleapis.com/colorize_jobs/5df453c02243796f484e54fd25a3986c/a2a34755b01bc418dcb708090c9fae88.jpg"
      }
      let obj = {
        background: `url("${url}")`,
      }
      return obj

    }
  },
  components: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.hello_img{
  width: 95%;
  min-height: 100px!important;
  // margin-right: 0px;
  // height: 250px;
  border: 1px solid rgba(#303952, 0.2);
  margin-left: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  // overflow: hidden;
}
.hello_img_thing{
  width: 100%;
  max-height: 50px;
}
.preview{
  background-size: cover!important;
  background-repeat: no-repeat!important;
  background-position: center center!important;
  // width: 100%;
  height: 100%;

}
.waiter{
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
}
.href_link{
  width: 100%;
  height: 100%;
}
.logs{
  font-size: 14px!important;
}
.wait_icon{
  margin-right: 10px;
  width: 50px;
}
.naming{
  font-size: 14px;
  margin-left: 12px;
  // max-width: 150px;
  // overflow: hidden;
  // text-overflow: ellipsis;
  // margin-top: 12px;
}
</style>
