<template>
  <img
    :src="resolvedSrc"
    :alt="alt"
    :class="['item-icon', sizeClass, { 'loading': !loaded }]"
    @load="onLoad"
    @error="onError"
  >
</template>

<script>
import AssetRegistry from '@/core/AssetRegistry';

export default {
  name: 'ItemIcon',
  props: {
    type: {
      type: String,
      required: true
    },
    variant: {
      type: String,
      required: true
    },
    size: {
      type: String,
      default: 'medium',
      validator: val => ['small', 'medium', 'large'].includes(val)
    },
    fallback: {
      type: String,
      default: '/src/assets/images/fallback-item.png'
    }
  },
  data() {
    return {
      loaded: false
    };
  },
  computed: {
    resolvedSrc() {
      const key = `${this.type}_${this.variant}`;
      const asset = AssetRegistry.get('item', key);
      return asset ? asset.path : this.fallback;
    },
    sizeClass() {
      return `item-icon--${this.size}`;
    },
    alt() {
      return `${this.variant} ${this.type}`;
    }
  },
  methods: {
    onLoad() {
      this.loaded = true;
    },
    onError(e) {
      console.warn(`Missing item asset: ${this.type}/${this.variant}`, e);
      this.loaded = true;
    }
  },
  mounted() {
    // Preload image to trigger load/error handling
    const img = new Image();
    img.src = this.resolvedSrc;
  }
};
</script>

<style scoped>
.item-icon {
  object-fit: contain;
  transition: opacity 0.2s ease-in-out;
  opacity: 0;
}

.item-icon.loading {
  opacity: 0.6;
}

.item-icon:not(.loading) {
  opacity: 1;
}

.item-icon--small { width: 32px; height: 32px; }
.item-icon--medium { width: 64px; height: 64px; }
.item-icon--large { width: 128px; height: 128px; }
</style>