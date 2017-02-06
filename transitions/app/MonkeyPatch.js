// @flow
import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';

const Wrapper = ({children}) => (
  <View style={{ flexDirection: 'row' }}>
    <Text>Monkeys eat: </Text>
    {children}
  </View>
);

const Fruit = ({name}) => (
  <Text>{name}</Text>
);

class FruitInComp extends Component {
  render() {
    return <Fruit name={this.props.name} />;
  }
}

const PropSpecifiedInComp = (props) => (
  <Text needsMonkey={true}>{props.name}</Text>
);

const PropSpecifiedInInnerComp = (props) => (
  <PropSpecifiedInComp {...props} />
);

// TODO comps declared in React.createClass

const monkeyPatch = (e: React.Element<*>) => {
  let children: Array<*> = e.props && React.Children.map(e.props.children, monkeyPatch);
  let newE = e;
  if (e.type && (
    typeof e.type.prototype.render === 'function')) {

    // const OldType = e.type;
    // const NewType = (props) => monkeyPatch(<OldType {...props}>{props.children}</OldType>);

    const NewType = function () { };
    NewType.prototype = new e.type();
    for (let key of Object.keys(e.type)) {
      // Clone things like childContextTypes, displayName etc.
      if (key !== 'prototype') NewType[key] = e.type[key];
    }
    const oldRender = NewType.prototype.render;
    NewType.prototype.render = function () { return monkeyPatch(oldRender.call(this)) };


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
      // <Text needsMonkey={true}>Bananas (inline Text)</Text>
      <View>
        <Fruit name="Apples" needsMonkey={true} />
        <FruitInComp name="Oranges" needsMonkey={true} />
        <PropSpecifiedInComp name="Kiwis" />
        <PropSpecifiedInInnerComp name="Pears" />
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