<template>
  <div class="com">
    <h2>Bar 组件</h2>
    <p>{{ $store.state.count}}</p>
    <button @click="subcount" v-bind:disabled="disabled">-</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      disabled: false
    }
  },
  methods: {
    subcount () {
      if (this.$store.state.count) {
        this.$store.commit({
          type: 'subcount',
          a: 10,
          b: 5
        })
      } else {
        this.disabled = true
      }
    }
  }
}
</script>

<style></style>
