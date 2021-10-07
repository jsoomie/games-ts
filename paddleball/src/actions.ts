type TextFill = (
  showWords: string,
  textX: number,
  textY: number,
  fillColor: string
) => void;

type Circle = (
  centerX: number,
  centerY: number,
  radius: number,
  fillColor: string
) => void;

type Rectangle = (
  topLeftX: number,
  topLeftY: number,
  boxWidth: number,
  boxHeight: number,
  fillColor: string
) => void;

const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
const context = canvas.getContext("2d") as CanvasRenderingContext2D;

// Draw text
export const colorText: TextFill = (
  showWords,
  textX,
  textY,
  fillColor
): void => {
  context.fillStyle = fillColor;
  context.fillText(showWords, textX, textY);
};

// Create Rectangle
export const rectangle: Rectangle = (
  topLeftX,
  topLeftY,
  boxWidth,
  boxHeight,
  fillColor
): void => {
  context.fillStyle = fillColor;
  context.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
};

// Create circle
export const circle: Circle = (centerX, centerY, radius, fillColor): void => {
  context.fillStyle = fillColor;
  context.beginPath();
  context.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
  context.fill();
};

// Create Bricks
export const bricks = (
  gap: number,
  width: number,
  height: number,
  fillColor: string,
  grid: boolean[],
  brickRows: number
) => {
  for (let eachRow = 0; eachRow < brickRows; eachRow++) {
    for (let eachCol = 0; eachCol < grid.length; eachCol++) {
      if (grid[eachCol]) {
        rectangle(
          width * eachCol,
          height * eachRow,
          width - gap,
          height - gap,
          fillColor
        );
      }
    }
  }
};

export const brickReset = (grid: boolean[]) => {
  for (let i = 0; i < grid.length; i++) {
    grid[i] = true;
    // if (Math.random() < 0.5) {
    //   grid[i] = true;
    // }
  }
};
