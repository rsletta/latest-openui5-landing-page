<template>
  <div class="app">
    <header class="app-header">
      <ui5-shellbar
        id="shellbar"
        @logoClick="onLogoClick"
      >
      
      </ui5-shellbar>
    </header>
    <section class="app-content">
      <img
        class="header-img"
        src="./assets/repository-header.png"
        alt="OpenUI5 Latest Version - Community API header"
      />
      <div class="card-container">
        <div class="bodytext">
          <p>
            <ui5-link href="https://openui5.org/" target="_blank">OpenUI5</ui5-link> Latest Version is a community run API, serving the download urls of the latest
            available
            versions from
            <ui5-link href="https://github.com/sap/openui5" target="_blank">Github</ui5-link>.
          </p>
          <ui5-title>Documentation:</ui5-title>
          <p>
            Documentation for the API is available on
            <ui5-link
              href="https://github.com/rsletta/latest-openui5-landing-page/tree/master/api"
              target="_blank"
            >Github</ui5-link>.
          </p>
          <ui5-title>Disclaimer:</ui5-title>
          <p>
            This service has no affiliation to
            <ui5-link href="https://www.sap.com" target="_blank">SAP SE</ui5-link> or the
            <ui5-link href="https://openui5.org/" target="_blank">OpenUI5</ui5-link> team.
          </p>
        </div>
        <div>
          <ui5-title>What are the newest versions?</ui5-title>
          <ui5-card class="medium">
            <div class="card-content">
              <VersionList />
            </div>
          </ui5-card>
        </div>
      </div>
    </section>
    <footer class="footer">
      <div>
        <p>
          Created with ♥️ by
          <ui5-link href="https://twitter.com/rsletta" target="_blank">
            Ronnie André Bjørvik
            Sletta
          </ui5-link>. Powered by
          <ui5-link href="https://vuejs.org" target="_blank">Vue.js</ui5-link> and
          <ui5-link
            href="https://sap.github.io/ui5-webcomponents/"
            target="_blank"
          >UI5 Web Components</ui5-link>, running on <ui5-link href="https://azure.microsoft.com/" target="_blank">Microsoft Azure</ui5-link>.
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
import VersionList from "./components/VersionList.vue";
import "@ui5/webcomponents-fiori/dist/ShellBar";
import "@ui5/webcomponents-fiori/dist/ShellBarItem";
import "@ui5/webcomponents/dist/Icon";
import "@ui5/webcomponents/dist/Card";
import "@ui5/webcomponents/dist/Title";
import "@ui5/webcomponents/dist/Link";

export default {
  name: "app",
  components: {
    VersionList
  },
  methods: {
    onLogoClick: function() {
      window.open("https://github.com/rsletta/get_openui5_latest_url");
    }
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

.header-img {
  max-width: 100%;
}

.app-content {
  height: calc(100% - 3rem);
  padding: 0 1rem;
  width: calc(100% - 2rem);
}

.bodytext {
  padding: 0 1rem;
  text-align: start;
  font-size: var(--sapMFontMediumSize, 0.875rem);
}

.footer {
  font-size: var(--sapMFontMediumSize, 0.875rem);
}
ui5-card {
  margin: 1rem;
  min-width: 18rem;
}

ui5-card.medium {
  width: 20rem;
}

.card-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  min-width: 16rem;
}
</style>
