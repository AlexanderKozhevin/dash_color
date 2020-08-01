<template>
  <div class="main-menu">
    <img class="main-logo" src="/img/logo.svg" />
    <div class="flex options">
      <div class="flex"></div>

      <nuxt-link to="/">

        <div class="logout" :class="{ 'active': active == 'index',  'opacify': active != 'index'}">
          <img class="" src="/img/photo.svg" />
        </div>

      </nuxt-link>
<!--
      <nuxt-link to="/video">
        <div class="logout" :class="{ 'active': active == 'video',  'opacify': active != 'video'}">
          <img class="" src="/img/video.svg" />
        </div>
      </nuxt-link>
      <nuxt-link to="/video">
        <div class="logout" :class="{ 'active': active == 'video',  'opacify': active != 'settings'}">
          <img class="" src="/img/settings.svg" />
        </div>
      </nuxt-link> -->
      <div class="flex"></div>
      <div class="flex"></div>

    </div>



  </div>
</template>

<script>
export default {
  name: 'root-menu',
  props: {
    active: {
      type: String,
      default: 'index'
    }
  },
  methods: {
    logout(){
      localStorage.removeItem('token');
      window.location.href = window.location.origin;

    }
  },
  components: {
  },
}
</script>

<style scoped="true">
.active{
  background-color: rgba(130,130,130,0.1);
}
.opacify{
  opacity: 0.8;
}
.options{
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.flex{
  flex: 1;

}
.logout:hover{
  background-color: rgba(130,130,130,0.1);
  opacity: 1;
}
  .logout{
    width: 100%;
    cursor: pointer;
    transition: all 0.15s linear;
    height: 64px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .logout img{
    width: 50%;
  }
  .main-logo{
    width: 80%;
  }
  .main-menu{
    padding-top: 20px;
    min-width: 64px;
    max-width: 64px;
    background-color: rgba(130,130,130,0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
