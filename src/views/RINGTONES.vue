<template lang="pug">
#RINGTONES
  |RINGTONES
</template>

<script>
export default {
  name: 'RINGTONES',
  data () {
    return {
      sounds: [
        { name: '鈴聲', src: 'alarm.mp3' },
        { name: '耶', src: 'yay.mp3' }
      ],
      fields: [
        { key: 'select', label: 'WORK' },
        { key: 'name', label: 'BREAK' },
        { key: 'src', label: 'LISTEN' }
      ]
    }
  },
  computed: {
    sound () {
      return this.$store.state.sound
    }
  }
}
</script>
