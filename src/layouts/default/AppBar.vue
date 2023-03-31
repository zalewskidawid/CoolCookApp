<template>
  <header :class="{'scrolled-nav': scrolledNavigation}">
    <nav>
      <div class="brand">
        <router-link active-class="active-link" class="link" to="/"><v-icon class="img" icon="mdi-home"></v-icon></router-link>
      </div>
      <ul v-show="!mobile" class="navigation">
        <li><router-link active-class="active-link" class="link"  to="/">HomePage</router-link></li>
        <li><router-link active-class="active-link"  class="link"  to="/Recipes">Recipes</router-link></li>
        <li v-if="checkUserLoginStatus === false"><router-link active-class="active-link" class="link"  to="/Login">Login</router-link></li>
        <li v-else><div class="logout-btn" @click="userLogout">Logout</div></li>
        <li><router-link active-class="active-link" class="link"  to="/Contact">Contact</router-link></li>
      </ul>
      <div class="icon">
        <v-icon class="icon-not-active" @click="toggleMobileNav" v-show="mobile" :class="{'icon-active': mobileNav}" icon="mdi-format-list-bulleted"></v-icon>
      </div>
      <transition name="mobile-nav">
      <ul v-show="mobileNav" class="dropdown-nav">
        <li><router-link active-class="active-link" class="link" to="/">HomePage</router-link></li>
        <li><router-link active-class="active-link" class="link"  to="/Recipes">Recipes</router-link></li>
        <li><router-link active-class="active-link" class="link"  to="/Login">Login</router-link></li>
        <li><router-link active-class="active-link" class="link"  to="/Contact">Contact</router-link></li>
      </ul>
      </transition>
    </nav>
  </header>
</template>

<script >
  export default{
    name: "navigation",
    data() {
      return {
        scrolledNavigation: null,
        mobile: null,
        mobileNav: null,
        windowWidth: null,
        userLoginStatus: false,
      };
    },
    created(){
      window.addEventListener('resize', this.checkScreen);
      this.checkScreen();
    },
    mounted() {
      window.addEventListener("scroll", this.updateScroll)
    },
    methods: {
      toggleMobileNav() {
        this.mobileNav = !this.mobileNav;
      },
      userLogout() {
        this.$store.dispatch('logout');
      },
      checkScreen() {
      this.windowWidth = window.innerWidth;
      if(this.windowWidth <= 750){
        this.mobile = true;
      } else {
        this.mobile = false;
        this.mobileNav = false;
        }
      },

      updateScroll() {
        const scrollPosition = window.scrollY;
        scrollPosition > 0 ? this.scrolledNavigation = true : this.scrolledNavigation = false;
      }
    },
    computed: {
      checkUserLoginStatus() {
        return this.$store.getters.getUserLoginStatus;
      }
    }
  }
</script>

<style lang="scss" scoped >

// a.active-link{
//   color: black  !important;
// }

header {
  background-color: rgba(0,0,0,0.8);
  z-index: 99;
  width: 100%;
  position: fixed;
  transition: .5s ease all;
  color: white;
  height: 80px;

  nav{
    position: relative;
    display: flex;
    flex-direction: row;
    padding: 12px 0;
    transition: .5s ease all;
    width: 90%;
    margin: 0 auto;
    @media (min-width: 1140px) {
      max-width: 1140px;
    }

    ul,
    .link{
      font-weight: 500;
      color: white;
      list-style: none;
      text-decoration: none;
    }

    li{
      text-transform: uppercase;
      padding: 16px;
      margin-left: 16px;
    }
    div {
      padding-bottom: 8px;
      font-size: 14px;
      border-bottom: 1px solid transparent;
      display: unset;
      cursor: pointer;
      &:hover {
        color: pink;
        border-color: rgb(255, 0, 106);
      }
    }
    .link {
      font-size: 14px;
      transition: .5s ease all;
      padding-bottom: 6px;
      border-bottom: 1px solid transparent;

      &:hover{
        color: pink;
        border-color: rgb(255, 0, 106);
      }
    }

    a.active-link{
      color: pink;
      border-color: rgb(255, 0, 106);
    }
    .brand {
      display: flex;
      align-items: center;

      .img{
        font-size: 45px;
        transition: 0.5s ease all;
      }
    }

    .navigation {
      display: flex;
      align-items: center;
      flex: 1;
      justify-content: flex-end;
    }

    .icon{
      display: flex;
      position: absolute;
      align-items: center;
      top: 0;
      right: 24px;
      height: 100%;
      cursor: pointer;
      font-size: 24px;
      transition: 0.8s ease all;
    }

    .icon-not-active{
      transition: 0.8s ease all;
    }

    .icon-active {
      transform: rotate(90deg);
      transition: 0.8s ease all;
    }

    .dropdown-nav{
      display: flex;
      flex-direction: column;
      position: fixed;
      width: 100%;
      max-width: 250px;
      height: 100%;
      background-color: pink;
      top: 0;
      left: 0;

      li {
        margin-left: 0;
        .link {
          color: black;
        }
      }
    }

    .mobile-nav-enter-active,
    .mobile-nav-leave-active {
      transition: 1s ease all;
    }

    .mobile-nav-enter-from,
    .mobile-nav-leave-to {
      transform: translateX(-250px);
    }

    .mobile-nav-enter-to {
      transform: translateX(0);
    }


  }
}

.scrolled-nav {
  background-color: darkgray;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06);
  position: fixed;

  nav {
    padding: 8px 0;

    .brand {
      img {
        width: 40px;
        box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06);
      }
    }
  }
}

</style>
