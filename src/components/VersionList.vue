<template>
  <div>
    <ui5-busyindicator :active="!listReady" size="Large">
      <div>
        <ui5-list
          id="myList"
          class="card-content-child list"
          separators="None"
        >
          <ui5-li
            v-for="version in versions"
            v-bind:key="version.version"
            type="Inactive"
            v-bind:description="version.eom"
            v-bind:additional-Text="version.lts"
            v-bind:additional-text-state="version.ltsState"
            >{{ version.version }}</ui5-li
          >
        </ui5-list>
      </div>
    </ui5-busyindicator>
  </div>
</template>

<script>
import "@ui5/webcomponents/dist/BusyIndicator";
import "@ui5/webcomponents/dist/List";
import "@ui5/webcomponents/dist/StandardListItem";

export default {
  data() {
    return {
      versions: [],
      listReady: false,
    };
  },
  created: async function () {
    const data = await fetch(
      "https://latestopenui5storage.blob.core.windows.net/latest-openui5/versions.json"
    ).then((response) => {
      return response.json();
    });

    const versions = Object.keys(data.versions).map((key) => {
      return data.versions[key];
    }).sort((a, b) => {
      return parseFloat(a.version) - parseFloat(b.version);
    }).reverse();

    this.versions = versions.reduce((acc, curr) => {
      let newEntry = {};
      newEntry.version = curr.version;
      newEntry.published = curr.published;
      newEntry.runtime = curr.runtime;
      newEntry.runtimeMobile = curr.runtimeMobile;
      newEntry.sdk = curr.sdk;
      newEntry.lts = curr.lts ? "LTM" : "";
      newEntry.ltsState = curr.lts ? "Success" : "None";
      newEntry.eom = curr.eom ? curr.eom : "";

      acc.push(newEntry);
      return acc;
    }, []);

    this.listReady = true;
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.list {
  text-align: start;
}

</style>
