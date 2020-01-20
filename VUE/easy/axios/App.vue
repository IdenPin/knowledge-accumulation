<template>
  <div>
    <p>{{listVal}}</p>
    <input type="text" :value="listVal" @input="listVal = $event.target.value">
    <div v-for="(item,index) in list" :key="index">
      {{item.name}}
    </div>
  </div>
</template>
<script>
import qs from 'qs'
import axios from 'axios'
// let cancel
// let CancelToken
export default {
  data() {
    return {
      list: [],
      listVal: '',
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
    // window.console.log('data', this.foo)
    // window.console.log('JSON', this.JSON)
    // window.console.log('QS', this.QS)
    this.fetch()
  },
  methods: {
    inputFn(v) {
      window.console.log('v',v)
    },
    async fetch(){
      const instance = axios.create();
      instance.CancelToken = axios.CancelToken;
      instance.isCancel = axios.isCancel;
      const {data} = await axios.get('http://api.jirengu.com/fm/getChannels.php').catch(function(){})
      this.list = data.channels
    }
  },
}
</script>