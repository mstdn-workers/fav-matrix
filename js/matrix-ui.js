function stringToElements(str) {
  var lines = str.split('\n');
  var n = lines.length;
  var elems = [];
  lines.forEach((line, i) => {
    elems.push(document.createTextNode(line));
    if (i+1 != n) {
      elems.push(document.createElement('br'));
    }
  });
  return elems;
}

Vue.component('fm-cell-label', {
  props: ['i', 'width', 'text'],
  template: `
    <foreignObject :width="width">
      <div contenteditable="true" @blur="onBlur" style="text-align: center">
      </div>
    </foreignObject>
    `,
  data: () => ({ editing: false }),
  mounted() {
    var textElem = this.$el.getElementsByTagName('div')[0];
    textElem.innerText = "";
    stringToElements(this.text).forEach(e => textElem.appendChild(e));
    this.setLabel(textElem.innerText);
  },
  computed: {
    transform() { return `translate(${this.width / 2}, 18)`; },
  },
  methods: {
    setLabel(text) {
      // https://jp.vuejs.org/v2/guide/list.html#%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A0%85
      // this.$root.$refs.matrix.labels[this.i] = this.text;
      this.$root.$refs.share_url.labels.splice(this.i, 1, text);
    },
    onBlur(event) {
      this.setLabel(event.target.innerText);
    },

  }
});

Vue.component('fm-cell', {
  props: ['i', 'x', 'width', 'y', 'height', 'label'],
  computed: {
    transform() {
      return `translate(${this.x}, ${this.y})`
    },
  },
  template: `
    <g :transform="transform">
      <rect fill="none" stroke="black" stroke-width="2"
          :width="width" :height="height">
      </rect>
      <fm-cell-label :i="i" ref="label" :width="width" :text="label">
      </fm-cell-label>
    </g>
  `
});

Vue.component('fm-matrix-ui', {
  props: ['n', 'labels'],
  data: () => ({
    width: 600,
    height: 600,
    margin: 10,
    title_height: 0,
  }),
  computed: {
    vb() {
      var startx = -this.margin,
          starty = -this.title_height - this.margin
          width = this.width + 2 * this.margin,
          height = this.height + this.title_height + 2 * this.margin;
      return `${startx} ${starty} ${width} ${height}`
    },
    rows() { return parseInt(this.n); },
    cols() { return parseInt(this.n); },
    cell_width() { return this.width / this.n; },
    cell_height() { return this.height / this.n; },
    l() { return this.rows * this.cols; },
    coords() {
      return Array.from({ length: this.l }, (_, i) => i).map(i => ({
        x: this.cell_width * (i % this.cols),
        y: this.cell_height * Math.floor(i / this.cols)
      }));
    },
  },
  template: `
    <div class="card-panel center-align">
      <svg xmlns="http://www.w3.org/2000/svg"
          :viewBox="vb">
        <foreignObject
        <fm-cell v-for="(c, i) in coords"
                 :i="i"
                 :x="c.x" :y="c.y"
                 :width="cell_width"
                 :height="cell_height"
                 :label="labels[i] || '________'"></fm-cell>
      </svg>
    </div>
    `
});