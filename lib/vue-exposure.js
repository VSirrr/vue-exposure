export default {
  name: 'VueExposure',
  props: {
    root: {
      type: typeof HTMLElement !== 'undefined' ? HTMLElement : Object,
      default: null
    },
    rootMargin: {
      type: String,
      default: '0px 0px 0px 0px'
    },
    threshold: {
      type: [Number, Array],
      default: 0
    }
  },
  mounted () {
    this.initIntersectionObserver()
    this.initMutationObserver()
  },
  beforeDestroy () {
    this.destroy()
  },
  methods: {
    initIntersectionObserver () {
      this.iObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.$emit('exposure', entry.target)
              // just emit 'exposure' once
              this.iObserver.unobserve(entry.target)
            }
          })
        },
        {
          root: this.root,
          rootMargin: this.rootMargin,
          threshold: this.threshold
        }
      )
      this.$nextTick(() => {
        const children = this.$slots.default
        if (!children || children.length < 1) {
          return
        }
        children.forEach((child) => {
          const elm = child.elm
          if (elm && elm.nodeType === 1) {
            this.iObserver.observe(elm)
          }
        })
      })
    },
    initMutationObserver () {
      // when DOM changes to observe the added nodes
      this.mObserver = new MutationObserver((list) => {
        list.forEach((item) => {
          const elm = item.addedNodes[0]
          if (elm && elm.nodeType === 1) {
            this.iObserver.observe(elm)
          }
        })
      })
      this.mObserver.observe(this.$el, { childList: true })
    },
    destroy () {
      this.iObserver.disconnect()
      this.mObserver.disconnect()
      this.mObserver = this.iObserver = null
    }
  },
  render (h) {
    return h('span', this.$slots.default)
  }
}
