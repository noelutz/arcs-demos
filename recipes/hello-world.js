window.recipes = window.recipes || {};

window.recipes.helloWorld = {
  name: "Hello, World!",
  particles: [
    {
      name: "Create",
      constrain: {
        "newMsg": "msg"
      }
    },
    {
      name: "HelloWorld",
      constrain: {
        "hello": "msg"
      }
    },
    {
      name: "Greet",
      constrain: {
        "message": "msg"
      }
    },
    {
      name: "PersonalGreet",
      constrain: {
        "person": "person"
      }
    },
    {
      name: "Choose",
      constrain: {
        "singleton": "person"
      }
    },
  ]
};
