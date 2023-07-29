<template>
<div>
  <img alt="Vue logo" src="./assets/logo.png"/>
  <ContractInteraction />
</div>
</template>

<script>
import ContractInteraction from "./components/ContractInteraction";

export default {
  name: 'App',
  components: {
    ContractInteraction
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
