// @license
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt

"use strict";

// Defines the HelloWorld particle in-line. Every DOM particle
// needs to call the defineParticle function to register itself.
defineParticle(({DomParticle}) => {

  // Specifies the DOM template to be used when the rendering function
  // is called on the HelloWorld particle. The templating syntax is similar
  // to the one used by templates in web-components.
  let template = `
    <style>
      [hello] {
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
        font-size: 16px;
        background-color: #AED581;
        padding: 20px;
      }
    </style>
    <div hello>
      <!-- Basic variable substitution where {{name}} will be replaced
           by the value associated with 'name' when  the particle is
           rendered. Note that the span is necessary here because (for now)
           variable substitution only works if the variable is a
           lonely child of an element. -->
      <div>
        Hello, World! Hello,
        <span>{{name}}</span>!
        <!-- Defines where and how the 'greeting' slot should be rendered
             in the HelloWorld particle DOM. Another particle may render
             content into that slot. In our example that's the Greeting
             particle. -->
        <span slotid="greeting"></span>
      </div>
    </div>
  `.trim();

  // Defines the HelloWorld particle as a sub-class of DomParticle.
  // HelloWorld may be speculatively instantiated by Arcs and will
  // be (definitely) created when the user picks the Hello World
  // suggestion.
  return class extends DomParticle {
    get template() {
      return template;
    }
    _willReceiveProps(props) {
      // Copies the name from the input view (i.e., particle input parameter) to
      // the particle's internal state.
      if (props.person) {
        this._setState({ name: props.person.name });
      }
    }
    // Main rendering function called whenever the state of the particle changed.
    // Returns the dictionary that is used to do variable substitution in the
    // template. In our case it specifies a single variable with the name of the
    // person to greet.
    _render(props, state) {
      if (state.name && state.name.length) {
      	return {
      	  name: state.name
      	};
      }
    }
  };
});
