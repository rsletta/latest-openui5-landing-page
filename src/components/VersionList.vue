<template>
  <div>
    <div v-if="listReady">
      <ui5-list
        v-for="version in versions"
        v-bind:key="version.version"
        id="myList"
        class="card-content-child list"
        style="width: 100%"
        separators="None"
      >
        <ui5-li type="Inactive" :info="version.eom" :info-state="version.lts">{{ version.version }}</ui5-li>
      </ui5-list>
    </div>
    <div v-else>
      <ui5-busyindicator active size="Large"></ui5-busyindicator>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import "@ui5/webcomponents/dist/BusyIndicator";
import "@ui5/webcomponents/dist/List";
import "@ui5/webcomponents/dist/StandardListItem";

export default {
  data() {
    return {
      versions: [],
      listReady: false
    };
  },
  created: function() {
    const db = firebase.firestore();
    db.collection("versions")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          if (doc.id === "latest" || doc.id === "savedVersions") {
            return;
          } 
          let newEntry = {};
          let data = doc.data();
          newEntry.version = data.version;
          newEntry.published = data.published;
          newEntry.runtime = data.runtime;
          newEntry.runtimeMobile = data.runtimeMobile;
          newEntry.sdk = data.sdk;
          newEntry.lts = data.lts ? "Success" : "Neutral";
          newEntry.eom = data.eom ? data.eom : "";
          this.versions.push(newEntry);
        })

        this.versions.reverse();
        this.listReady = true;
      })
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.list{
  text-align: start;
}
</style>
