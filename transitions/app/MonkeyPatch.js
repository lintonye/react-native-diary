// @flow
import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';
import _ from 'lodash';

const Wrapper = ({children}) => (
  <View style={{ flexDirection: 'row' }}>
    <Text>Monkeys eat: </Text>
    {children}
  </View>
);

const Fruit = ({name}) => (
  <Text>{name}</Text>
);

class FruitInClassComp extends Component {
  render() {
    return <Fruit name={this.props.name} />;
  }
}

const PropSpecifiedInComp = (props) => (
  <Text needsMonkey={true}>{props.name}</Text>
);

const PropSpecifiedInInnerComp = (props) => (
  <PropSpecifiedInComp name={props.name} />
);

class PropSpecifiedInClassComp extends Component {
  render() {
    return <Text needsMonkey={true}>{this.props.name}</Text>;
  }
}

const PropSpecifiedInInnerClassComp = props => <PropSpecifiedInClassComp {...props} />

// TODO comps declared in React.createClass
const isFunctionalComponent = T => typeof T === 'function' && !T.prototype.render;
// && ['Fruit', 'PropSpecifiedInComp', 'PropSpecifiedInInnerComp'].includes(T.name);
const isClassComponent = T => typeof T === 'function' && typeof T.prototype.render === 'function';
const isComponent = T => isFunctionalComponent(T) || isClassComponent(T);
const clonePrototype = (prototype) => {
  const result = _.clone(prototype);
  Object.setPrototypeOf(result, prototype);
  return result;
}

const monkeyPatch = (e: React.Element<*>) => {
  let children: Array<*> = e.props && React.Children.map(e.props.children, monkeyPatch);
  let newE = e;
  let NewType = null;
  if (isComponent(e.type)) {
    console.log('===> has render', e.type.displayName || e.type.name, typeof e.type.prototype.render)
    if (isClassComponent(e.type)) {
      NewType = function () { };
      for (let key of Object.keys(e.type)) {
        // Clone things like childContextTypes, displayName etc.
        if (key !== 'prototype') NewType[key] = e.type[key];
      }
      const oldRender = e.type.prototype.render;
      const newPrototype = clonePrototype(e.type.prototype);
      // newPrototype.render = function () { return monkeyPatch(oldRender.call(this)) };
      NewType.prototype = newPrototype;
    } else {
      NewType = (props, context) => monkeyPatch(e.type(props, context));
    }

    NewType.displayName = 'Patched.' + (e.type.displayName || e.type.name);
    newE = React.createElement(NewType, e.props, children);

    // const oldRender = e.type.prototype.render;
    // e.type.prototype.render = function () { return monkeyPatch(oldRender.call(this)) };
    // newE = React.cloneElement(e, {needsMonkey:false}, children);
    // console.log('OldType='+ OldType.displayName, 'NewType = '+ NewType.displayName, 'children = ', children);
  }


  return (e.props && !!e.props.needsMonkey && e.type && e.type.name !== 'Wrapper'
    ? React.createElement(Wrapper, null, newE)
    : newE
  );
}

const printElement = (e: React.Element<*>, level: number = 0) => {
  const indent = Array(level).fill('  ').join('');
  console.log(indent + 'type', e.type ? e.type.displayName || e.type.name : typeof e);
  if (e.props) React.Children.forEach(e.props.children, c => printElement(c, level + 1));
}

class WrappedApp extends Component {
  render() {
    const e = (
      <View>
        <Text needsMonkey={true}>Bananas (inline Text)</Text>
        <Fruit name="Apples (Fruit)" needsMonkey={true} />
        <FruitInClassComp name="Oranges (FruitInClassComp)" needsMonkey={true} />
        <Text> --- Prop specified in comps --- </Text>
        <PropSpecifiedInComp name="Kiwis (In functional Comp)" />
        <PropSpecifiedInInnerComp name="Pears (In inner functional Comp)" />
        <PropSpecifiedInClassComp name="Kiwis (In class Comp)" />
        <PropSpecifiedInInnerClassComp name="Pears (In inner class Comp)" />
        <Fruit name="Rocks" needsMonkey={false} />
      </View>
    );
    const patched = monkeyPatch(e);
    console.log('original element ===>');
    printElement(e);
    console.log('patched element ===>');
    printElement(patched);
    return patched;
  }
}

const App = (props) => (
  <View>
    <WrappedApp />
    <Text needsMonkey="true">&lt;= No monkeys allowed here!</Text>
  </View>
)

export default App;