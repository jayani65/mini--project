<template>
  <div class="container">
    <div class="row mt-5" v-if="$gate.isAdmin()">
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Users Table</h3>

            <div class="card-tools">
              <button
                class="btn btn-success"
                @click="newModal">
                Add New<i class="fas fa-user-plus fa-fw"></i>
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
                  <th>Registered at</th>
                  <th>Modify</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="user in users" v-bind:key="user.id">
                  <td>{{ user.id }}</td>
                  <td>{{ user.name }}</td>
                  <td>{{ user.email }}</td>
                  <td>{{user.type}}</td>
                  <td>{{ user.created_at | myDate }}</td>
                  <td>
                    <a href="#" @click="editModal(user)" >
                      <i class="fa fa-edit green"></i>
                    </a>
                    /
                    <a href="#" @click="deleteUser(user.id)">
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

    <div  v-if="!$gate.isAdmin()" >
      <not-found></not-found>
    </div>
    <div
      class="modal fade"
      id="addnew"
      tabindex="-1"
      aria-labelledby="addnewLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 v-show="!editmode" class="modal-title" id="addnewLabel">Add New User</h5>
            <h5 v-show="editmode" class="modal-title" id="addnewLabel">Update user's info</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form @submit.prevent="editmode ? UpdateUser():CreateNewUser()">
            <div class="modal-body">
              <div class="form-group">
                <input
                  v-model="form.name"
                  type="text"
                  name="name"
                  placeholder="Name"
                  class="form-control"
                  :class="{ 'is-invalid': form.errors.has('name') }"
                />
                <has-error :form="form" field="name"></has-error>
              </div>
              <div class="form-group">
                <input
                  v-model="form.email"
                  type="email"
                  name="email"
                  placeholder="Email address"
                  class="form-control"
                  :class="{ 'is-invalid': form.errors.has('email') }"
                />
                <has-error :form="form" field="email"></has-error>
              </div>
              <div class="form-group">
                <input
                  v-model="form.password"
                  type="password"
                  name="password"
                  class="form-control"
                  :class="{ 'is-invalid': form.errors.has('password') }"
                />
                <has-error :form="form" field="password"></has-error>
              </div>
              <div class="form-group">
                <select
                  v-model="form.type"
                  
                  name="type"
                  class="form-control"
                  :class="{ 'is-invalid': form.errors.has('type') }"
                >
                <option value="">Select user role</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
                <option value="author">Author</option>
                </select>
                <has-error :form="form" field="type"></has-error>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-danger" data-dismiss="modal">
                Close
              </button>
              <button v-show="editmode" type="submit" class="btn btn-success">update</button>
              <button v-show="!editmode" type="submit" class="btn btn-primary">Create</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NotFound from './NotFound.vue';
export default {
  components: { NotFound },
  data() {
     
    return {
     editmode :true,
      users: {},
      form: new Form({
        id :"",
        name: "",
        email: "",
        password: "",
        photo:"",
        type:""
      }),
    };
  },
  methods: {
    UpdateUser(){
      this.$Progress.start();
  //console.log("updated");
  this.form.put('api/user/'+ this.form.id)
  .then(()=>{
    $("#addnew").modal("show");
    Swal.fire("Updated!", "Information has been updated.", "success");
    this.$Progress.finish();
    Fire.$emit("AfterCreate");
  })
  .catch(()=>{
    this.$Progress.fail();
  });
    },
    newModal(){
      this.editmode=false;
this.form.reset();
 $("#addnew").modal("show");
    },
    editModal(user){
      this.editmode=true;
this.form.reset();
 $("#addnew").modal("show");
 this.form.fill(user);
    },
   deleteUser(id) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
         if (result.isConfirmed) {
        this.form.delete('api/user/'+id).then(()=>{
        
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
          Fire.$emit("AfterCreate");
        
        }).catch(()=>{
          Swal.fire("Failed","There was somthing wrong", "warning");
        })
         }
      });
    },
   
    loadUsers() {

      if(this.$gate.isAdmin()){
      axios.get("api/user").then(({ data }) => (this.users = data.data));
      }
      
    },
    CreateNewUser() {
     
      this.form.post("api/user")
      .then(() => {
        Fire.$emit("AfterCreate");
        $("#addnew").modal("hide");
        toast.fire({
          icon: "success",
          title: "Successfully User Created",
        });
        
     }).catch(()=>{

     });
    },
  },
  created() {
   // Fire.$on('searching', ()=>{
     // let query= 'this.$parent.search';
      //axios.get('api/findUser?q'+query)
      //.then((data)=>{
        //this.users= data.data
      //})
      //.catch();
    //}),
    this.loadUsers();
    Fire.$on("AfterCreate", () => {
      this.loadUsers();
    });
  },
  mounted() {
    console.log("Component mounted.");
  },
};
</script>