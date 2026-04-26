class AssetRegistry {
  constructor() {
    this.registry = new Map(); // [category, new Map(key -> { path, metadata })]
  }

  register(category, key, path, metadata = {}) {
    if (!this.registry.has(category)) {
      this.registry.set(category, new Map());
    }
    this.registry.get(category).set(key, { path, ...metadata });
  }

  get(category, key) {
    const categoryMap = this.registry.get(category);
    if (!categoryMap) return null;
    return categoryMap.get(key) || null;
  }

  has(category, key) {
    const categoryMap = this.registry.get(category);
    return categoryMap ? categoryMap.has(key) : false;
  }

  clearForTesting() {
    this.registry.clear();
  }
}

export default new AssetRegistry();