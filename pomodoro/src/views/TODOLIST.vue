<template lang="pug">
#TODOLIST
  b-input-group(size="lg")
    b-form-input(
      placeholder="ADD A NEW MISSION..."
      v-model="newitem"
      @keydown.enter='additem'
      invalid-feedback='至少輸入兩個字'
      :state='state'
      )
    b-input-group-append
      b-btn(size="lg" @click="additem") +
  .todo
    .todo-header TO-DO
      img(src="../assets/icons/arrow_drop_up_white_24dp.svg")
    ul.todo-list
      li(v-for="(item,idx) in list")
        img(src="../assets/icons/radio_button_unchecked_white_24dp.svg")
        | {{ item }}
        img.playbtn(src="../assets/icons/play_circle_outline_white_24dp.svg")
  .done
    .done-header DONE
    ul.done-list
      li(v-for="(item,idx) in finished")
        img(src="../assets/icons/check_circle_outline_white_24dp.svg")
        | {{ item }}
</template>

<script>
export default {
  name: 'TODOLIST',
  data () {
    return {
      newitem: ''
    }
  },
  methods: {
    additem () {
      this.$store.commit('addList', this.newitem)
      this.newitem = ''
    }
  },
  computed: {
    state () {
      if (this.newitem.length === 0) {
        return null
      } else if (this.newitem.length < 2) {
        return false
      } else {
        return true
      }
    },
    list () {
      return this.$store.getters.list
    },
    finished () {
      return this.$store.state.finished
    }
  }
}
</script>
