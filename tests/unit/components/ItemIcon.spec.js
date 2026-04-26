import { shallowMount } from '@vue/test-utils';
import ItemIcon from '@/components/ItemIcon.vue';
import AssetRegistry from '@/core/AssetRegistry';

describe('ItemIcon.vue', () => {
  const originalWarn = console.warn;
  let warnMock;

  beforeEach(() => {
    warnMock = jest.fn();
    console.warn = warnMock;
    AssetRegistry.clearForTesting();
  });

  afterEach(() => {
    console.warn = originalWarn;
  });

  it('resolves correct path for registered gun level', () => {
    AssetRegistry.register('item', 'gun_level_50', '/src/assets/images/items/guns/level_50.png');

    const wrapper = shallowMount(ItemIcon, {
      props: {
        type: 'gun',
        variant: 'level_50'
      }
    });

    expect(wrapper.find('img').attributes('src')).toBe('/src/assets/images/items/guns/level_50.png');
  });

  it('uses fallback when asset is not registered', () => {
    const wrapper = shallowMount(ItemIcon, {
      props: {
        type: 'gun',
        variant: 'level_999',
        fallback: '/src/assets/images/fallback-item.png'
      }
    });

    expect(wrapper.find('img').attributes('src')).toBe('/src/assets/images/fallback-item.png');
  });

  it('emits load event and sets loaded state', async () => {
    AssetRegistry.register('item', 'gun_level_1', '/src/assets/images/items/guns/level_1.png');

    const wrapper = shallowMount(ItemIcon, {
      props: {
        type: 'gun',
        variant: 'level_1'
      }
    });

    const img = wrapper.find('img');
    await img.trigger('load');

    expect(wrapper.vm.loaded).toBe(true);
    expect(img.classes()).not.toContain('loading');
  });

  it('handles missing image gracefully and logs warning', async () => {
    const wrapper = shallowMount(ItemIcon, {
      props: {
        type: 'gun',
        variant: 'level_999'
      }
    });

    const img = wrapper.find('img');
    await img.trigger('error');

    expect(warnMock).toHaveBeenCalledWith('Missing item asset: gun/level_999', expect.any(Object));
    expect(wrapper.vm.loaded).toBe(true);
  });

  it('applies correct size class', () => {
    const wrapper = shallowMount(ItemIcon, {
      props: {
        type: 'gun',
        variant: 'level_1',
        size: 'large'
      }
    });

    expect(wrapper.find('img').classes()).toContain('item-icon--large');
  });
});