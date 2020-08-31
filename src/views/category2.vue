<template>
  <div class="container-record">
    <div class="col-md-6 record-form">
        <table class="table table-bordered">
            <thead class="thead-dark">
              <tr>
                <th scope="col" class="record-title-text">Фото</th>
                <th scope="col" class="record-title-text">ФИО</th>
                <th scope="col" class="record-title-text">Специальность</th>
                <th scope="col" class="record-title-text">Просмотр</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row"><img class="card-img-top" src="../assets/spec.png" alt="Card image cap"></th>
                <td class="record-text">Иванов Иван Иванович</td>
                <td class="record-text">Специальность</td>
                <td class="record-text"><a href="#" class="badge badge-primary submit-record">Просмотр</a></td>
              </tr>
              <tr>
                <th scope="row"><img class="card-img-top" src="../assets/spec.png" alt="Card image cap"></th>
                <td class="record-text">Иванов Иван Иванович</td>
                <td class="record-text">Специальность</td>
                <td class="record-text"><a href="#" class="badge badge-primary submit-record">Просмотр</a></td>
              </tr>
              <tr>
                <th scope="row"><img class="card-img-top" src="../assets/spec.png" alt="Card image cap"></th>
                <td class="record-text">Иванов Иван Иванович</td>
                <td class="record-text">Специальность</td>
                <td class="record-text"><a href="#" class="badge badge-primary submit-record">Просмотр</a></td>
              </tr>
              <tr>
                <th scope="row"><img class="card-img-top" src="../assets/spec.png" alt="Card image cap"></th>
                <td class="record-text">Иванов Иван Иванович</td>
                <td class="record-text">Специальность</td>
                <td class="record-text"><a href="#" class="badge badge-primary submit-record">Просмотр</a></td>
              </tr>
              <tr>
                <th scope="row"><img class="card-img-top" src="../assets/spec.png" alt="Card image cap"></th>
                <td class="record-text">Иванов Иван Иванович</td>
                <td class="record-text">Специальность</td>
                <td class="record-text"><a href="#" class="badge badge-primary submit-record">Просмотр</a></td>
              </tr>
              <tr>
                <th scope="row"><img class="card-img-top" src="../assets/spec.png" alt="Card image cap"></th>
                <td class="record-text">Иванов Иван Иванович</td>
                <td class="record-text">Специальность</td>
                <td class="record-text"><a href="#" class="badge badge-primary submit-record">Просмотр</a></td>
              </tr>
              <tr>
                <th scope="row"><img class="card-img-top" src="../assets/spec.png" alt="Card image cap"></th>
                <td class="record-text">Иванов Иван Иванович</td>
                <td class="record-text">Специальность</td>
                <td class="record-text"><a href="#" class="badge badge-primary submit-record">Просмотр</a></td>
              </tr>
              <tr>
                <th scope="row"><img class="card-img-top" src="../assets/spec.png" alt="Card image cap"></th>
                <td class="record-text">Иванов Иван Иванович</td>
                <td class="record-text">Специальность</td>
                <td class="record-text"><a href="#" class="badge badge-primary submit-record">Просмотр</a></td>
              </tr>
            </tbody>
          </table>
    </div>
</div>
</template>

<script>
export default {

}
</script>

<style>
    .container-record {
   background-color: #b9b1b1;
   min-height: 100vh;
   display: flex;
   justify-content: center;
   align-items: center;
    }
    .record-form {
    border-radius: 10px;
    border: 1px solid rgb(197, 194, 194);
    padding-top: 2rem;
    background-color: #ffffff;
    }
    .submit-record {
    width: 100%;
    background-color: #646aac !important;
    border-color: #646aac !important;
    }

    .record-title-text {
    font-size: 22px;
    font-family: Arial;
    }
    .record-text {
    font-family: Arial;
    }

</style>