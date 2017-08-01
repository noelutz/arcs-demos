window.recipes = window.recipes || {};

window.recipes.helloWorld = {
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
};
