// @flow
import type {ReactElement} from 'react';

type Metrics = {
    x:number,
    y:number,
    width:number,
    height:number,
}

const sharedElementMap = new Map();

class SharedElement {
    constructor(id:string, isOnDetail:boolean, element:ReactElement, metrics:Metrics) {
        this.id = id;
        this.isOnDetail = isOnDetail;
        this.element = element;
        this.metrics = metrics;
    }
    scaleRelativeTo(other: SharedElement) {
        return {
            x: this.metrics.width / other.metrics.width,
            y: this.metrics.height / other.metrics.height,
        };
    }
}

class SharedElementRepo {
    static put(id:string, isOnDetail:boolean, element:ReactElement, metrics:Metrics) {
        let elementPair = sharedElementMap.get(id);
        if (elementPair === undefined) {
            elementPair = {};
            sharedElementMap.set(id, elementPair);
        };
        const key = isOnDetail ? 'onDetail' : 'onList';
        elementPair[key] = new SharedElement(id, isOnDetail, element, metrics);
    }

    static getCompletePairs():Array<SharedElement> {
        return Array.from(sharedElementMap.keys())
            .filter(k => {
                const p = sharedElementMap.get(k);
                return p.onList && p.onDetail;
            })
            .map(k => sharedElementMap.get(k));
    }
}

export default SharedElementRepo;