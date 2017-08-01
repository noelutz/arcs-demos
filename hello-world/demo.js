/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

const {
  BrowserLoader,
  SlotComposer,
  DemoBase,
  Arc,
  systemParticles,
  workerPecFactory,
} = window.Arcs;

let recipes = [
{
  name: "Hello, World! Hello, you!",
  particles: [
    {
      name: "Greeting",
      constrain: {
        "person": "person"
      }
    },
    {
      name: "HelloWorld",
      constrain: {
        "person": "person"
      }
    },
    {
      name: "Choose",
      constrain: {
        "singleton": "person"
      }
    }
  ]
}];

let stages = [{
  recipes: [
    recipes[0],
  ]
}];

let db = {
  people: [
    {
      name: "Claire"
    }
  ],
};

function ContextFactory({loader, pecFactory, slotComposer}) {
  // uber arc
  let pageArc = new Arc({loader, id: 'pageArc'});
  // bootstrap data context
  let Person = loader.loadEntity('Person');
  // TODO(sjmiles): empirically, views must exist before committing Entities
  let personView = pageArc.createView(Person.type.viewOf(), 'peopleFromWebpage');
  // commit entities
  pageArc.commit(db.people.map(p => new Person(p)));
  // demo arc
  let arc = new Arc({id: 'demo', loader, pecFactory, slotComposer});
  arc.createView(Person.type, 'personSlot');
  arc.mapView(personView);
  // TODO(sjmiles): boilerplate? not needed until we are rendering particles (arc not pageArc)?
  systemParticles.register(loader);
  // your context objects
  return {arc};
}

let template = Object.assign(document.createElement('template'), {innerHTML: `

<style>
  :host {
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
  }
  [particle-container] {
    flex: 1;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding-bottom: 25px;
    overflow: auto;
    overflow-x: hidden;
  }
  [particle-container] > * {
    flex: 1;
  }
</style>

<auto-tabs particle-container>
  <slot></slot>
</auto-tabs>
<suggestions-element></suggestions-element>

`.trim()});

class DemoFlow extends DemoBase {
  get template() {
    return template;
  }
  didMount() {
    let root = '../';
    let {arc} = ContextFactory({
      loader: new BrowserLoader(root),
      pecFactory: workerPecFactory.bind(null, root),
      slotComposer: new SlotComposer(this.$('[particle-container]'))
    });
    this.arc = arc;
    this.stages = stages;
    this.suggestions = this.$('suggestions-element');
    this.suggestions.arc = arc;
    this.suggestions.callback = this.nextStage.bind(this);
  }
}

customElements.define('demo-flow', DemoFlow);