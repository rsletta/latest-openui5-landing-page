<template>
  <div>
    <ui5-busyindicator :active="!listReady" size="Large">
      <div>
        <ui5-list id="myList" class="card-content-child list" separators="None">
          <ui5-li-custom
            v-for="version in maintainedVersions"
            v-bind:key="version.version"
            type="Inactive"
          >
            <div class="listitem">
              <span style="margin-right: 1rem; align-self: stretch">{{
                version.version
              }}</span>

              <div style="margin-bottom: 0.5rem">
                <ui5-badge
                  class="badge"
                  v-if="
                    !version.support.includes('OUT OF MAINTENANCE') &&
                    !version.lts
                  "
                  color-scheme="8"
                  >{{ version.support }}</ui5-badge
                >
                <ui5-badge
                  class="badge"
                  v-if="
                    version.support.includes('OUT OF MAINTENANCE') &&
                    !version.lts
                  "
                  color-scheme="2"
                  >{{ version.support }}</ui5-badge
                >
                <ui5-badge class="badge" v-if="version.lts" :color-scheme="version.ltsStatusColor">{{
                  version.eom
                }}</ui5-badge>
              </div>
            </div>
          </ui5-li-custom>
          <ui5-li-custom
            v-for="version in eolVersions"
            v-bind:key="version.version"
            type="Inactive"
          >
            <div class="listitem">
              <span style="margin-right: 1rem; align-self: stretch">{{
                version.version
              }}</span>

              <div style="margin-bottom: 0.5rem">
                <ui5-badge
                  class="badge"
                  v-if="
                    !version.support.includes('OUT OF MAINTENANCE') &&
                    !version.lts
                  "
                  color-scheme="8"
                  >{{ version.support }}</ui5-badge
                >
                <ui5-badge
                  class="badge"
                  v-if="
                    version.support.includes('OUT OF MAINTENANCE') &&
                    !version.lts
                  "
                  color-scheme="2"
                  >{{ version.support }}</ui5-badge
                >
                <ui5-badge class="badge" v-if="version.lts" :color-scheme="version.ltsStatusColor">{{
                  version.eom
                }}</ui5-badge>
              </div>
            </div>
          </ui5-li-custom>
        </ui5-list>
      </div>
    </ui5-busyindicator>
  </div>
</template>

<script>
import "@ui5/webcomponents/dist/BusyIndicator";
import "@ui5/webcomponents/dist/List";
import "@ui5/webcomponents/dist/CustomListItem";
import "@ui5/webcomponents/dist/Badge";

export default {
  data() {
    return {
      versions: [],
      listReady: false,
    };
  },
  computed: {
    maintainedVersions: function() {
      return this.versions.filter(version => {
        return version.support !== 'OUT OF MAINTENANCE';
      })
    },
    eolVersions: function() {
         return this.versions.filter(version => {
        return version.support === 'OUT OF MAINTENANCE';
      })   
    }
  },
  created: async function () {
    const data = await fetch(
      "https://latestopenui5storage.blob.core.windows.net/latest-openui5/versions.json"
    ).then((response) => {
      return response.json();
    });

    const versions = Object.keys(data.versions)
      .map((key) => {
        return data.versions[key];
      })
      .sort((a, b) => {
        // Versions come in semver formated (MAJOR.MINOR.PATCH) strings. We only care about the minor version number, and want to compare that in the sorter. 
        const aMinor = parseInt(a.version.split(".")[1], 10);
        const bMinor = parseInt(b.version.split(".")[1], 10);
        return aMinor - bMinor;
      })
      .reverse();

    this.versions = versions.reduce((acc, curr) => {
      let ltsYear = null;
      if (curr.eom) {
        ltsYear = parseInt(curr.eom.split("/")[1]);
      }

      let newEntry = {};
      newEntry.version = curr.version;
      newEntry.published = curr.published;
      newEntry.runtime = curr.runtime;
      newEntry.runtimeMobile = curr.runtimeMobile;
      newEntry.sdk = curr.sdk;
      newEntry.lts = curr.lts ? "LTM" : "";
      newEntry.ltsState = curr.lts ? "Success" : "None";
      newEntry.ltsStatusColor = ltsYear > new Date().getUTCFullYear() ? "8" : "2";
      newEntry.eom = curr.eom ? curr.eom : "";
      newEntry.support = curr.support  ? curr.support.toUpperCase() : "MAINTENANCE";

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
  display: flex;
  justify-content: center;
  text-align: start;
  width: 18rem;
}

.listitem {
  padding: 0.2rem;
  margin-top: 0.2rem;
  display: flex;
  flex-direction: row;
}

</style>
