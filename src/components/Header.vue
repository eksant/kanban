<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary" style="margin-bottom:10px">
    <a class="navbar-brand" href="/"><b>SIMPLE KANBAN</b></a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarColor01">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item" v-if="token"><a class="nav-link" data-toggle="modal" data-target="#create" style="cursor: pointer;">Create</a></li>
      </ul>
      <button class="btn btn-primary my-2 my-sm-0" @click="getLogin" v-if="!token" type="submit">Login</button>
      <button class="btn btn-primary my-2 my-sm-0" @click="logout" type="submit" v-else>Logout</button>
    </div>

    <div class="modal" id="create">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <form @submit.prevent="created">
              <fieldset>
                <div class="form-group">
                  <label for="tiles">Title</label>
                  <input type="text" class="form-control" v-model="create.title" placeholder="Enter title">
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Description</label>
                  <textarea class="form-control" v-model="create.description" placeholder="Description" rows="3"></textarea>
                </div>
                <div class="form-group">
                  <label for="tile">Assigned To</label>
                  <input type="text" class="form-control" v-model="create.assignTo" placeholder="Assigned To">
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>&nbsp;
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>                  
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
    <notifications/>
  </nav>
</template>

<script>
import { kanban } from '../firebase'
export default {
  data () {
    return {
      create: {
        title: '',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
        assignTo: '',
        status: 'backlog'
      }
    }
  },
  computed: {
    token () {
      return this.$store.state.token
    }
  },
  methods: {
    created () {
      // kanban.child('backlog').push(this.create)
      kanban.child('blocks').push(this.create)
      this.create.title = ''
      // this.create.description = ''
      this.create.assignTo = 'Eksa'
      $('#create').modal('hide')
      this.$notify({
        type: 'success',
        text: 'Success to insert new task'
      })
    },
    getLogin () {
      this.$router.push('/login')
    },
    logout () {
      let self = this
      localStorage.clear()
      window.location.href = '/'
      self.$store.dispatch('setToken', null)
      window.FB.logout(function (response) {
        // console.log('response : ', response)
        // self.$store.dispatch('setToken', null)
        // this.$router.push('/')
        // window.location.href = '/'
      })
    }
  }
}
</script>
