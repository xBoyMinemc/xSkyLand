
async function x(event) {
  // const players = mc.world.getPlayers();
  // const playerList = Array.from(players);
  if (event.player) {
    const form = new ActionFormData()
      .title("Test Title")
      .body("Body text here!")
      .button("btn 0")
      .button("btn 1")
      .button("btn 2")
      .button("btn 3")
      .button("btn 4")
      .button("btn 5");

    const result = await form.show(event.player);
    if (result.isCanceled) {
      console.log("Player exited out of the dialog.");
    } else {
      console.log("Your result was: " + result.selection);
    }
  }
}

world.events.blockBreak.subscribe((event) => {

  let xboy;
  try {
    console.log("xboy => ", xboy)
    // world.getDimension("overworld").runCommandAsync('me ${xboy}');
  } catch (error) {
    console.log("error => ", error)
  }

})