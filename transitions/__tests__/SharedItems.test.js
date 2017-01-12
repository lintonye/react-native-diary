import SharedItems, { SharedItem } from '../app/SharedItems';

describe('SharedItems', () => {
    describe('add', () => {
        it('returns new instance if not exists', () => {
            const items = new SharedItems();
            const item = new SharedItem();
            const newItems = items.add(item);
            expect(items).not.toBe(newItems);
        })
        it('returns same instance if already exists', () => {
            const item = new SharedItem('sharedView', 'route');
            const items = new SharedItems([item]);
            const newItems = items.add(item);
            expect(items).toBe(newItems);
        })
        it('adds many items', () => {
            let items = new SharedItems();
            const n = 50;
            for (let i = 0; i < n; i++) {
                items = items.add(new SharedItem(`item${i}`, 'route1'));
            }
            expect(items.count()).toBe(n);
        })
    })
    describe('remove', () => {
        it('returns new instance if found an item to remove', () => {
            const item = new SharedItem('sharedView', 'route');
            const items = new SharedItems([item]);
            const newItems = items.remove(item.name, item.containerRouteName);
            expect(items).not.toBe(newItems);
        });
        it('returns same instance if item not found', () => {
            const item = new SharedItem('sharedView', 'route');
            const items = new SharedItems([item]);
            const newItems = items.remove('sharedView2', 'route');
            expect(items).toBe(newItems);
        });
        it('removes item properly', () => {
            const item = new SharedItem('sharedView', 'route');
            const items = new SharedItems([item]);
            const newItems = items.remove(item.name, item.containerRouteName);
            expect(newItems._items.length).toBe(0);
        })
    })
    describe('updateMetrics', () => {
        it('returns new instance if found an item to update', () => {
            const item = new SharedItem('sharedView', 'route');
            const items = new SharedItems([item]);
            const newItems = items.updateMetrics(item.name, item.containerRouteName, { x: 1, y: 2 });
            expect(items).not.toBe(newItems);
        });
        it('returns same instance if item not found', () => {
            const item = new SharedItem('sharedView', 'route');
            const items = new SharedItems([item]);
            const newItems = items.updateMetrics('blah', item.containerRouteName, { x: 1, y: 2 });
            expect(items).toBe(newItems);
        });
        it('update item properly', () => {
            const item = new SharedItem('sharedView', 'route');
            const items = new SharedItems([item]);
            const metrics = { x: 1, y: 2 };
            const newItems = items.updateMetrics(item.name, item.containerRouteName, metrics);
            expect(newItems._items[0].metrics).toBe(metrics);
        })
    })
    describe('removeAllMetrics', () => {
        it('returns new instance if some items has metrics', () => {
            const metrics = { x: 1, y: 2 };
            const item = new SharedItem('sharedView', 'route', 'reactElement', 'nativeHandle', metrics);
            const items = new SharedItems([item]);
            const newItems = items.removeAllMetrics();
            expect(items).not.toBe(newItems);
        });
        it('returns same instance if none of items have metrics', () => {
            const item = new SharedItem('sharedView', 'route');
            const items = new SharedItems([item]);
            const newItems = items.removeAllMetrics();
            expect(items).toBe(newItems);
        });
        it('update item properly', () => {
            const metrics = { x: 1, y: 2 };
            const item = new SharedItem('sharedView', 'route', 'reactElement', 'nativeHandle', metrics);
            const items = new SharedItems([item]);
            const newItems = items.removeAllMetrics();
            expect(newItems._items[0].metrics).toBeNull;
        })
    });
    describe('getMeasuredItemPairs', () => {
        it('only returns measured pairs', () => {
            const metrics = { x: 1, y: 2, width:3, height: 4 };
            const item1 = new SharedItem('shared1', 'route1', 'reactElement', 'nativeHandle', metrics);
            const item2 = new SharedItem('shared1', 'route2', 'reactElement', 'nativeHandle', metrics);
            const itemNoMetrics1 = new SharedItem('shared2', 'route1');
            const itemNoMetrics2 = new SharedItem('shared2', 'route2');
            const items = new SharedItems([item1, item2, itemNoMetrics1, itemNoMetrics2]);
            const pairs = items.getMeasuredItemPairs('route1', 'route2');
            expect(pairs.length).toBe(1);
        });
        it('only returns pairs based on given route names', () => {
            const metrics = { x: 1, y: 2, width:3, height: 4 };
            const item1 = new SharedItem('shared1', 'route1', 'reactElement', 'nativeHandle', metrics);
            const item2 = new SharedItem('shared1', 'route2', 'reactElement', 'nativeHandle', metrics);
            const itemOtherRoute1 = new SharedItem('shared2', 'route3', 'reactElement', 'nativeHandle', metrics);
            const itemOtherRoute2 = new SharedItem('shared2', 'route4', 'reactElement', 'nativeHandle', metrics);
            const items = new SharedItems([item1, item2, itemOtherRoute1, itemOtherRoute2]);
            const pairs = items.getMeasuredItemPairs('route1', 'route2');
            expect(pairs.length).toBe(1);
            const p = pairs[0];
            expect(p.fromItem).toBe(item1);
            expect(p.toItem).toBe(item2);
        });
        it('does not return unmatched items', () => {
            const metrics = { x: 1, y: 2, width:3, height: 4 };
            const item1 = new SharedItem('shared1', 'route1', 'reactElement', 'nativeHandle', metrics);
            const items = new SharedItems([item1]);
            const pairs = items.getMeasuredItemPairs('route1', 'route2');
            expect(pairs.length).toBe(0);
        });
        it('returns multiple measured pairs', () => {
            const metrics = { x: 1, y: 2, width: 3, height: 4 };
            const item1 = new SharedItem('shared1', 'route1', 'reactElement', 'nativeHandle', metrics);
            const item2 = new SharedItem('shared1', 'route2', 'reactElement', 'nativeHandle', metrics);
            const item3 = new SharedItem('shared2', 'route1', 'reactElement', 'nativeHandle', metrics);
            const item4 = new SharedItem('shared2', 'route2', 'reactElement', 'nativeHandle', metrics);
            const items = new SharedItems([item1, item2, item3, item4]);
            const pairs = items.getMeasuredItemPairs('route1', 'route2');
            expect(pairs.length).toBe(2);
        });
    });
    describe('findMatchByName', () => {
        it('returns found item', () => {
            const item1 = new SharedItem('shared1', 'route1', 'reactElement', 'nativeHandle');
            const item2 = new SharedItem('shared1', 'route2', 'reactElement', 'nativeHandle');
            const items = new SharedItems([item1, item2]);
            const matching = items.findMatchByName(item1.name, item1.containerRouteName);
            expect(matching).toBe(item2);
        })
    })
    describe('allMetricsReady', () => {
        it('returns true if all pairs contain metrics', () => {
            const metrics = { x: 1, y: 2, width: 3, height: 4 };
            const item1 = new SharedItem('shared1', 'route1', 'reactElement', 'nativeHandle', metrics);
            const item2 = new SharedItem('shared1', 'route2', 'reactElement', 'nativeHandle', metrics);
            const item3 = new SharedItem('shared2', 'route1', 'reactElement', 'nativeHandle', metrics);
            const item4 = new SharedItem('shared2', 'route2', 'reactElement', 'nativeHandle', metrics);
            const items = new SharedItems([item1, item2, item3, item4]);
            expect(items.areMetricsReadyForAllPairs('route1', 'route2')).toBe(true);
        });
        it('returns false if some item does not contain metrics', () => {
            const metrics = { x: 1, y: 2, width: 3, height: 4 };
            const item1 = new SharedItem('shared1', 'route1', 'reactElement', 'nativeHandle', metrics);
            const item2 = new SharedItem('shared1', 'route2', 'reactElement', 'nativeHandle');
            const item3 = new SharedItem('shared2', 'route1', 'reactElement', 'nativeHandle', metrics);
            const item4 = new SharedItem('shared2', 'route2', 'reactElement', 'nativeHandle', metrics);
            const items = new SharedItems([item1, item2, item3, item4]);
            expect(items.areMetricsReadyForAllPairs('route1', 'route2')).toBe(false);
        });
        it('returns true if all pairs contain metrics and other routes contain unmeasured items', () => {
            const metrics = { x: 1, y: 2, width: 3, height: 4 };
            const item1 = new SharedItem('shared1', 'route1', 'reactElement', 'nativeHandle', metrics);
            const item2 = new SharedItem('shared1', 'route2', 'reactElement', 'nativeHandle', metrics);
            const item3 = new SharedItem('shared2', 'route3', 'reactElement', 'nativeHandle', metrics);
            const item4 = new SharedItem('shared2', 'route4', 'reactElement', 'nativeHandle', metrics);
            const items = new SharedItems([item1, item2, item3, item4]);
            expect(items.areMetricsReadyForAllPairs('route1', 'route2')).toBe(true);
        });
    })
})

