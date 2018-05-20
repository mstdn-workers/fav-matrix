var app = new Vue({
  el: "#app",
  data: {},
  computed: {
    params: () => new URLSearchParams(window.location.search),
    n: function() { return this.params.get('n') || '4' },
  },
  template: `
<div class="container">
  <fm-matrix-ui ref="matrix" :n="n"
                :labels="params.getAll('labels[]')">
  </fm-matrix-ui>
  <fm-share-url ref="share_url"></fm-share-url>
</div>
  `
});