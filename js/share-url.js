Vue.component('fm-share-url', {
  data: () => ({ labels: [] }),
  computed: {
    url() {
      var labels = this.labels;
      var url_base = window.location.origin + window.location.pathname;
      var params = [];
      params = params.concat(
        "n=" + this.$root.n,
        labels.map(l => "labels[]=" + encodeURIComponent(l.trim())));
      var address = url_base + "?" + params.join('&');
      return address;
    }
  },
  template: `<input type="text" v-model="url" />`,
});