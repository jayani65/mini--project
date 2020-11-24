<template>
    <div class="container">
        <div class="row mt-5">
          <div class="col-12">
            <div class="card">
              <div class="card-header">
                <h3 class="card-title">Users Table</h3>

                <div class="card-tools">
                 <button class="btn btn-success " data-toggle="modal" data-target="#addnew">
                     Add New<i class="fas fa-user-plus fa-fw" ></i>
                 </button>
                </div>
              </div>
              <!-- /.card-header -->
              <div class="card-body table-responsive p-0">
                <table class="table table-hover text-nowrap">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Type</th>
                      <th>Modify</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>183</td>
                      <td>John Doe</td>
                      <td>john@ham.com</td>
                      <td><span class="tag tag-success">Approved</span></td>
                      <td>
                          <a href="#">
                            <i class="fa fa-edit green"></i>
                          </a>
                          /
                          <a href="#">
                            <i class="fa fa-trash red"></i>
                          </a>
                      </td>
                    </tr>
                    
                    
                    
                  </tbody>
                </table>
              </div>
              <!-- /.card-body -->
            </div>
            <!-- /.card -->
          </div>
        </div>
        <div class="modal fade" id="addnew" tabindex="-1" aria-labelledby="addnewLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="addnewLabel">Add New User</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <form @submit.prevent="CreateNewUser">
      <div class="modal-body">
            <div class="form-group">
        
        <input v-model="form.name" type="text" name="username" placeholder="Name"
            class="form-control" :class="{ 'is-invalid': form.errors.has('name') }">
        <has-error :form="form" field="name"></has-error>
        </div>
         <div class="form-group">
        
        <input v-model="form.email" type="email" name="email" placeholder="Email address"
            class="form-control" :class="{ 'is-invalid': form.errors.has('email') }">
        <has-error :form="form" field="email"></has-error>
        </div>
         <div class="form-group">
        
        <input v-model="form.password" type="password" name="username" placeholder="Name"
            class="form-control" :class="{ 'is-invalid': form.errors.has('password') }">
        <has-error :form="form" field="password"></has-error>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary">Create new</button>
      </div>
      </form>
    </div>
  </div>
</div>
    </div>
</template>

<script>
export default {
    data(){
      return {
          form : new Form({
              name:'',
              email : '',
              password:''
          })
      }
    },
    methods:{
      CreateNewUser(){
          this.form.post('api/user');
      }
    },
   mounted() {
      console.log('Component mounted.')
    }
  
}
</script>