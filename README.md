# VueExposure

A Vue2 component to add IntersectionObserver and MutationObserver to Vue2 component or HTML element.

## Usage

step one

```bash
npm i @vsirrr/vue-exposure
```

step two

```html
<template>
  <VueExposure @exposure="exposure">
    <div>dom</div>
    <VueComponent />
  </VueExposure>
</template>

<script>
  import VueExposure from '@vsirrr/vue-exposure'

  export default {
    components: {
      VueExposure,
    },
    methods: {
      exposure(elm) {
        // todo
      },
    },
  }
</script>
```
