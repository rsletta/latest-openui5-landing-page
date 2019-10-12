<template>
  <div class="app">
    <header class="app-header">
      <ui5-shellbar profile></ui5-shellbar>
    </header>
    <section></section>
    <VersionList />
  </div>
</template>

<script>
import "@ui5/webcomponents-base/dist/features/browsersupport/Edge";
import VersionList from "./components/VersionList.vue";
import "@ui5/webcomponents/dist/ShellBar";

export default {
  name: "app",
  components: {
    VersionList
  }
};
</script>

<style>
body {
  margin: 0;
}

.app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}

.ui5-logo {
  height: 2rem;
  margin-left: 2rem;
}
.app-title {
  margin-left: 1rem;
}

.app-content {
  height: calc(100% - 3rem);
  padding: 0 1rem;
  width: calc(100% - 2rem);
}
</style>
