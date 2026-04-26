import { AssetRegistry } from '@/core/AssetRegistry';

/**
 * Pre-registers all gun level images into the asset pipeline
 * Ensures images are discoverable and cached at runtime
 */
const GUN_LEVEL_COUNT = 50;

for (let level = 1; level <= GUN_LEVEL_COUNT; level++) {
  const path = `/src/assets/images/items/guns/level_${level}.png`;
  AssetRegistry.register('item', `gun_level_${level}`, path);
}

export default AssetRegistry;