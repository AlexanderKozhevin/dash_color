<template>
  <div class="hello upload flex-row flex-second-center">

    <div class="add flex-row flex-second-center flex-main-center">
      <input
        name="myFile"
        type="file"
        id="file_input"
        @change="pre_upload"
        multiple
        accept="image/jpeg,image/jpg"
        />
        <img class="add_icon" src="/img/add_video.svg" v-if="$store.state.uploads.length == 0" />
        <img class="load_icon" src="/img/load2.svg" v-if="$store.state.uploads.length > 0" />

      <!-- <img class="" v-if="$store.state.uploads.length > 0" src="/loader3.svg" /> -->
    <!-- <img class=""  src="/upload.svg" /> -->

      <div v-if="$store.state.uploads.length == 0">Add video</div>
    </div>

    <!-- <div class="upload-container" v-if="!ifpro($store.state.user)">
    <input
      name="myFile"
      type="file"
      id="file_input"
      @change="pre_upload"
      multiple
      accept="image/jpeg,image/jpg"
      />
    <img class="" v-if="$store.state.uploads.length > 0" src="/loader3.svg" />
    <img class="" v-if="$store.state.uploads.length == 0" src="/upload.svg" />


    <div v-if="$device.isDesktop && $store.state.uploads.length == 0">{{$t('addphoto')}} </div>
    <div v-if="$device.isDesktop && $store.state.uploads.length > 0"> {{$t('loadingthing')}} </div>

  </div> -->

    <div class="flex"></div>
    <pagination />
    <!-- <div class="add reload flex-row flex-second-center">
      <img class="add_icon" src="/img/reload.svg" />
      <div>Convert DPX</div>
    </div> -->

  </div>
</template>

<script>
/* eslint-disable */

import { mapState } from "vuex";
import pagination from './pagination';

export default {
  name: "sample",
  props: {},
  computed: {
    ...mapState({
      // list: state => state.graphs.list
    })
  },
  data() {
    return {};
  },
  created() {},
  methods: {
    pre_upload(event){
      for (let i = 0; i < event.target.files.length; i++) {

          this.$store.commit('uploadFile', event.target.files[i])

      }
    }
  },
  components: {
    pagination
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.upload{
  border-bottom: 1px solid hsla(0,0%,51%,.2);
  min-height: 64px;
}
.add{
  color: #eb4d4b;
  margin-left: 30px;
  border: 1px solid #eb4d4b;
  padding: 5px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.15s linear;
  &:hover{
    box-shadow: 0 1px 3px rgba(0,0,0,.35);
  }
  //   background-color: #eb4d4b;
  //   color: white;
  // }
}
.load_icon{
  height: 30px;
}
.add_icon{
  height: 30px;
  margin-right: 15px;
}
.reload{
  margin-right: 30px;
}
#file_input{
    position: absolute;
    /* width: 168px; */
    height: 46px;
    margin-left: -20px;
    background-color: green;
    /* margin-top: -46px; */
    opacity: 0;
    cursor: pointer;
}
</style>
