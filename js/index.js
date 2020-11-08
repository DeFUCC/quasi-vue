const QuasiApp = Vue.createApp({
  setup() {
    const svg = Vue.ref('')

    const options = Vue.reactive({
      size: 10,
      fillPolygons: false,
      fillColor: true,
      rotate: true,
      magnify: 0.8,
      skinnyMidpoint: 0,
      fatMidpoint: 0,
      symmetry: 5,
      lines: 60,
      strokeWidth: 0.001,
      color: false,
    })

    function generate(opt) {
      svg.value = Quasi.svg(options)
    }

    Vue.watchEffect(() => {
      generate(options)
    })

    function save() {
      saveSvg(document.getElementById('quasi').children[0], 'quasi.svg')
    }

    return {
      save,
      svg,
      generate,
      options,
    }
  },
})

QuasiApp.mount('#quasi-app')

// SAVE AN SVG

function saveSvg(svgEl, name) {
  svgEl.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
  var svgData = svgEl.outerHTML
  var preface = '<?xml version="1.0" standalone="no"?>\r\n'
  var svgBlob = new Blob([preface, svgData], {
    type: 'image/svg+xml;charset=utf-8',
  })
  var svgUrl = URL.createObjectURL(svgBlob)
  var downloadLink = document.createElement('a')
  downloadLink.href = svgUrl
  downloadLink.download = name
  document.body.appendChild(downloadLink)
  downloadLink.click()
  document.body.removeChild(downloadLink)
}
