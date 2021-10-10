// Control Keys
enum Key {
  LEFT = "ArrowLeft",
  UP = "ArrowUp",
  RIGHT = "ArrowRight",
  DOWN = "ArrowDown",
  W = "w",
  A = "a",
  S = "s",
  D = "d",
}

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

const setupInput = (): void => {
  // Mouse Control
  canvas.addEventListener("mousemove", updateMousePos);

  greenCar.setupInput(Key.W, Key.D, Key.S, Key.A);
  blueCar.setupInput(Key.UP, Key.RIGHT, Key.DOWN, Key.LEFT);

  // Keyboard Controls
  document.addEventListener("keydown", keyPressed);
  document.addEventListener("keyup", keyReleased);
};

const keySet = (keyEvent: KeyboardEvent, car: Cars, setTo: boolean) => {
  // LEFT KEY
  if (keyEvent.key === car.controlKeyLeft) {
    car.keyHeldTurnLeft = setTo;
  }

  // RIGHT KEY
  if (keyEvent.key === car.controlKeyRight) {
    car.keyHeldTurnRight = setTo;
  }

  // UP KEY
  if (keyEvent.key === car.controlKeyUp) {
    car.keyHeldGas = setTo;
  }

  // DOWN KEY
  if (keyEvent.key === car.controlKeyDown) {
    car.keyHeldReverse = setTo;
  }
};

// which key is pressed
const keyPressed = (e: KeyboardEvent): void => {
  keySet(e, blueCar, true);
  keySet(e, greenCar, true);
};

const keyReleased = (e: KeyboardEvent): void => {
  keySet(e, blueCar, false);
  keySet(e, greenCar, false);
};
