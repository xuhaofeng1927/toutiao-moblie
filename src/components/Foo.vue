<template>
  <div class="com">
    <h2>Foo 组件</h2>
    <p>{{count}}</p>
    <button @click="addcount">+</button>
  </div>
</template>

<script>
export default {
  methods: {
    addcount () {
      // this.$store.commit('addcount', 10)
      this.$store.dispatch('delaycout', 2)
    }
  },
  computed: {
    count () {
      return this.$store.state.count
    }
  }
}
</script>

<style></style>
