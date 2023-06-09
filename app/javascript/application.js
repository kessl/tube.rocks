import { createIframes, createPlayers } from "./setup";
import { registerEvents } from "./events";

const testId = 'agarhXlrhnc'

window.addEventListener('load', function() {
  const elements = createIframes([testId, testId, testId])
  const players = createPlayers(elements)
  registerEvents(players)
})
