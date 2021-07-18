<template lang="pug">
#home
  #home-left
    .home-input
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
    #home-left-first
      p(v-if='list.length === 0')
      img(src="../assets/icons/radio_button_unchecked_white_24dp.svg" v-else)
      | {{ currentText }}
    #home-left-time {{ timeText }}
    #home-left-list
      ul
        li(v-for="(item,idx) in list" v-if="idx >= 1")
          img(src="../assets/icons/radio_button_unchecked_white_24dp.svg")
          | {{ item }}
          img.playbtn(src="../assets/icons/play_circle_outline_white_24dp.svg")
      p MORE
  #home-center
    .home-clock
      img(src="../assets/icons/play_circle_white_24dp.svg" v-if="status !== 1" @click='start')
      img(src="../assets/icons/pause_circle_white_24dp.svg" v-else @click='pause')
  #home-right
    router-link.todo(to="/Settings/TODOLIST")
      img(src="../assets/icons/list_white_24dp.svg")
    router-link.analytics(to="/Settings/ANALYTICS")
      img(src="../assets/icons/assessment_white_24dp.svg")
    router-link.ringtones(to="/Settings/RINGTONES")
      img(src="../assets/icons/library_music_white_24dp.svg")
    p POMODORO
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      newitem: '',
      timer: 0
    }
  },
  computed: {
    status () {
      return this.$store.state.status
    },
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
    current () {
      return this.$store.state.current
    },
    currentText () {
      let text = this.current
      if (text.length === 0) {
        if (this.list.length === 0) {
          text = '沒有事項'
        } else {
          text = this.list[0]
        }
      }
      return text
    },
    timeleft () {
      return this.$store.state.timeleft
    },
    timeText () {
      const m = Math.floor(this.timeleft / 60)
      const s = Math.floor(this.timeleft % 60)
      return `${m}:${s}`
    }
  },
  methods: {
    additem () {
      this.$store.commit('addList', this.newitem)
      this.newitem = ''
    },
    start () {
      if (this.status !== 2 && this.list.length > 0) {
        this.$store.commit('start')
      }
      if (this.list.length > 0) {
        this.$store.commit('changeStatus', 1)
        this.timer = setInterval(() => {
          this.$store.commit('countdown')
          if (this.timeleft <= -1) {
            this.finish()
          }
        }, 1000)
      }
    },
    finish () {
      clearInterval(this.timer)
      this.$store.commit('changeStatus', 0)
      this.$store.commit('addFinish')

      const audio = new Audio()
      audio.src = require('../assets/sounds/' + this.$store.state.sound)
      audio.play()

      if (this.list.length > 0) {
        this.start()
      }
    },
    pause () {
      clearInterval(this.timer)
      this.$store.commit('changeStatus', 2)
    }
  }
}
</script>
