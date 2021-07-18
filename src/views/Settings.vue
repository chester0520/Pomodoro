<template lang="pug">
#Settings
  #Settings-left
    router-link.todo(to="/Settings/TODOLIST")
      img(src="../assets/icons/list_white_24dp.svg")
      |TO-DO LIST
    router-link.analytics(to="/Settings/ANALYTICS")
      img(src="../assets/icons/assessment_white_24dp.svg")
      |ANALYTICS
    router-link.ringtones(to="/Settings/RINGTONES")
      img(src="../assets/icons/library_music_white_24dp.svg")
      |RINGTONES
    .clock
      |25:00W
      |THE FIRST THING
  #Settings-center
    .content
      router-view
  #Settings-right
    router-link.close(to="/")
      img(src="../assets/icons/clear_white_24dp.svg")
    p POMODORO
</template>
