<template>
  <div>
    <h3>What are the newest versions?</h3>
    <div v-if="listReady">
      <ui5-list v-for="version in versions" v-bind:key="version" id="myList" class="full-width">
        <ui5-li>{{ version }}</ui5-li>
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
    var db = firebase.firestore();
    var doc = db.collection("versions").doc("savedVersions");
    doc.get().then(
      function(doc) {
        this.versions = doc.data().versions.split(",");
        this.listReady = true;
      }.bind(this)
    );
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
