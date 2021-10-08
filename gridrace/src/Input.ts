// Control Keys
enum Key {
  LEFT = "ArrowLeft",
  UP = "ArrowUp",
  RIGHT = "ArrowRight",
  DOWN = "ArrowDown",
}

// Held down keys
let keyHeldGas = false;
let keyHeldReverse = false;
let keyHeldTurnLeft = false;
let keyHeldTurnRight = false;

// Mouse controls
let mouseX = 0;
let mouseY = 0;

// MOUSE EVENTS
const updateMousePos = (e: MouseEvent): void => {
  let rect = canvas.getBoundingClientRect();
  let root = document.documentElement;

  mouseX = e.clientX - rect.left - root.scrollLeft;
  mouseY = e.clientY - rect.top - root.scrollTop;
};

const setupInput = () => {
  // Mouse Control
  canvas.addEventListener("mousemove", updateMousePos);

  // Keyboard Controls
  document.addEventListener("keydown", keyPressed);
  document.addEventListener("keyup", keyReleased);
};

// which key is pressed
function keyPressed(e: KeyboardEvent) {
  // LEFT KEY
  if (e.key === Key.LEFT) {
    keyHeldTurnLeft = true;
  }

  // RIGHT KEY
  if (e.key === Key.RIGHT) {
    keyHeldTurnRight = true;
  }

  // UP KEY
  if (e.key === Key.UP) {
    keyHeldGas = true;
  }

  // DOWN KEY
  if (e.key === Key.DOWN) {
    keyHeldReverse = true;
  }
}

function keyReleased(e: KeyboardEvent) {
  // LEFT KEY
  if (e.key === Key.LEFT) {
    keyHeldTurnLeft = false;
  }

  // RIGHT KEY
  if (e.key === Key.RIGHT) {
    keyHeldTurnRight = false;
  }

  // UP KEY
  if (e.key === Key.UP) {
    keyHeldGas = false;
  }

  // DOWN KEY
  if (e.key === Key.DOWN) {
    keyHeldReverse = false;
  }
}
