<template>
  <div></div>
</template>
<script>
import qs from 'qs'
export default {
  data() {
    return {
      foo : {
        name: 'pdeng',
        age: 20,
        list: [1,3,4,2],
      }
    }
  },
  computed: {
    QS() {
      return qs.stringify(this.foo)
    },
    JSON() {
      return JSON.stringify(this.foo)
    }
  },
  mounted() {
    window.console.log('data', this.foo)
    window.console.log('JSON', this.JSON)
    window.console.log('QS', this.QS)
  }
}
</script>