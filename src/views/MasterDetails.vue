<template>
  <div>
    <header class="navbar">
      <a class="navbar-logo" href="#">Workers</a>
      <div class="navbar-menu">
        <ul class="menu-nav ">
          <li class="menu-list">
            <router-link class="menu-link" to="/">Главная</router-link>        
          </li> 
          <li class="menu-list">
            <a class="menu-link" href="#">Выход</a>        
          </li>  
        </ul>
      </div>
    </header>
    <main class="container">
      <div class="frame">
        <div v-if="loaded" class="row">
          <div class="photo col-sm-12 col-lg-4 ">
              <img :src="photo_url || masterDetail.photo" alt="user" class="img-circle">
          </div>
          <div class="profile col-sm-12 col-lg-8 ">
            <div class="profile-info">
              <h1>{{masterDetail.firstname}} {{masterDetail.lastname}}</h1>
              <p><strong>Обо мне: </strong>{{masterDetail.info}}</p>
              <p><strong>Телефон: </strong>{{masterDetail.phone}}</p>
              <p><strong>Почта: </strong>{{masterDetail.email}}</p>
              <p><strong>Возраст: </strong>{{masterDetail.age}} лет</p>
              <p><strong>Образование: </strong>{{masterDetail.education}}</p>
              <p><strong>Опыт работы: </strong>{{masterDetail.experience}} лет</p>
              <p><strong>Цены: </strong>{{masterDetail.price}}</p>
              <p><strong>Город: </strong>{{masterDetail.city}}</p>
              <p><strong>Профессии: </strong></p>
              <ul>
                <li v-for="(job,index) in masterDetail.jobs" :key="index">{{job}}</li>
              </ul>
            </div>
          </div>                                  
        </div>
      </div>
      <form class="d-flex justify-content-center p-5">
        <input type="datetime-local" class="mr-5">
        <button type="submit" class="btn btn-primary btn-lg">Записаться</button>
      </form>
    </main>
    <footer class="footer">
      <ul class="footer-nav">
        <li class="footer-list">
          <a href="#" class="footer-link">О нас</a>
        </li>
        <li class="footer-list">
          <a href="#" class="footer-link">Контакты</a>
        </li>
        <li class="footer-list">
          <a href="#" class="footer-link">Все права защищены &copy;</a>
        </li>
      </ul>
    </footer>
  </div>
</template>

<script>
export default {
  data: () => ({
    masterDetail: null,
    loaded: false,
    photo_url: "https://www.bootdey.com/app/webroot/img/default-avatar.png"
  }),
  mounted() {
    const id = this.$route.params.id;
    this.getDetails(id);
  },
  methods: {
    async getDetails(id) {
      this.masterDetail = await fetch("/api/master/" + id).then(d => d.json());
      console.log(this.masterDetail.photo)
      this.loaded = true;
    }
  }
}
</script>