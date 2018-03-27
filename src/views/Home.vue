<template>
  <div class="container" style="max-width: 99%">
    <div class="content">
      <Kanban :stages="statuses" :blocks="blocks" @update-block="updateBlock">
        <div v-for="item in blocks" :slot="item.id" :key="item.id">
          <div><strong>{{ item.title }}</strong></div>
          <div>{{ item.description }}</div>
          <div v-if="item.assignTo">Assign to: {{ item.assignTo }}</div>
          <button type="button" class="btn btn-danger" v-if="token" v-on:click="deleteBlock(item.id)">Delete</button>
        </div>
      </Kanban>
    </div>
  </div>
</template>

<script>
import { debounce } from 'lodash'
import Kanban from '@/components/Kanban'
import { kanban } from '../firebase'
export default {
  name: 'home',
  components: {
    Kanban
  },
  data () {
    return {
      tasks: null,
      statuses: ['backlog', 'todo', 'doing', 'done'],
      blocks: []
    }
  },
  mounted () {
    kanban.on('value', snapshot => {
      this.blocks = []
      if (snapshot.val()) {
        this.tasks = snapshot.val().blocks
        for (const [key, value] of Object.entries(this.tasks)) {
          // console.log('key', key) 
          // console.log('value title', value.title)
          this.blocks.push({
            id: key,
            status: value.status,
            title: value.title,
            description: value.description,
            assignTo: value.assignTo
          })
        }
      }
    })
  },
  computed: {
    token () {
      return this.$store.state.token
    }
  },
  methods: {
    updateBlock: debounce(function (id, status, title) {
      this.blocks.find(b => b.id === id).status = status
      // console.log('id, status', id, status)
      let data
      for (const [key, value] of Object.entries(this.tasks)) {
        if (key === id) {
          data = {
            status: status,
            title: value.title,
            description: value.description,
            assignTo: value.assignTo
          }
          break
        }
      }
      // console.log('data : ', data)
      kanban.child('blocks').child(id).set(null)
      kanban.child('blocks').push(data)
      this.$notify({
        type: 'success',
        text: 'Success to update status task'
      })
    }, 500),
    deleteBlock (id) {
      kanban.child('blocks').child(id).set(null)
      this.$notify({
        type: 'success',
        text: 'Success to delete task'
      })
    }
  }
}
</script>

<style lang="scss">
@import '../assets/kanban.scss';
$backlog: #FB7D44;
$todo: rgb(109, 142, 156);
$doing: #F4CE46;
$done: #00B961;
* {
  box-sizing: border-box;
}
.drag-column {
  &-backlog {
    .drag-column-header,
    .is-moved,
    .drag-options {
      background: $backlog;
    }
  }
  &-todo {
    .drag-column-header,
    .is-moved,
    .drag-options {
      background: $todo;
    }
  }
  &-doing {
    .drag-column-header,
    .is-moved,
    .drag-options{
      background: $doing;
    }
  }
  &-done {
    .drag-column-header,
    .is-moved,
    .drag-options {
      background: $done;
    }
  }
}
.section {
  padding: 20px;
  text-align: center;
  a {
    color: white;
    text-decoration: none;
    font-weight: 300;
  }
  h4 {
    font-weight: 400;
    a {
      font-weight: 600;
    }
  }
}
</style>

