<template>
<div class="main">
    <!-- Menu -->
    <header class="navbar">
        <router-link class="navbar-logo" to="/">Workers</router-link>
        <div class="navbar-menu">
            <ul class="menu-nav ">
                <li class="menu-list">
                    <router-link class="menu-link" to="/">Главная</router-link>         
                </li> 
                <li class="menu-list">
                    <a class="menu-link" href="#">Выход</a>  
                    <!-- 
                        пример ссылки
                        <router-link to="/category" exact>Катеории</router-link>       
                    -->
                </li>  
            </ul>
        </div>
    </header>
    <!-- Content -->
    <main class="container">
        <div class="frame">
            <div v-if="loaded" class="row">
                <div class="photo col-sm-12 col-lg-4 ">
                    <img :src="photo_url" alt="user" class="img-circle">
                </div>
                <div class="profile col-sm-12 col-lg-8 ">
                    <div class="profile-info">
                        <h1 >{{ fullname }}</h1>
                        <p><strong>Почта: </strong> {{userDetail.email}} </p>
                        <p><strong>Телефон: </strong> {{userDetail.phone}} </p>
                    </div>
                </div>                                  
            </div>
        </div>
        <div class="record">
            <h1>Вы записаны:</h1>
        </div>  
        <div class="frame-1">
            <div class="table-responsive-lg">
                <!-- <table class="table table-hover">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Специалист</th>
                            <th>ФИО</th>
                            <th>Вид услуги</th>
                            <th>Время</th>
                            <th>Дата</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Парикмахер</td>
                            <td>Петров П.П.</td>
                            <td>Стрижка</td>
                            <td>19:30</td>
                            <td>20.12.20</td>
                        </tr>         
                    </tbody>
                </table> -->
            </div>
        </div>           
    </main>
    <!-- footer -->
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
        userInfo: null,
        userDetail: null,
        loaded: false,
        photo_url: "https://bootdey.com/img/Content/avatar/avatar6.png"
    }),
    async mounted() {
        this.userDetail = await fetch("/api/profile").then(d => d.json());
        this.loaded = true;
    },
    computed:{
        fullname: {
            get: function () {
                return this.userDetail.firstname + ' ' + this.userDetail.lastname;
            },
            set: function (newValue) {
                var names = newValue.split(' ')
                this.userDetail.firstname = names[0]
                this.userDetail.lastname = names[names.length - 1]
            }
        }
    }
}
</script>