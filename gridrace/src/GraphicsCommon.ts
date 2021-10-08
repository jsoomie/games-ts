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

type Bitmap = (
  useBitmap: HTMLImageElement,
  atX: number,
  atY: number,
  withAngle: number
) => void;

type ColorText = (
  showWords: string,
  textX: number,
  textY: number,
  fillColor: string
) => void;

// Create circle
const circle: Circle = (centerX, centerY, radius, fillColor): void => {
  context.fillStyle = fillColor;
  context.beginPath();
  context.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
  context.fill();
};

// Create Rectangle
const rectangle: Rectangle = (
  topLeftX,
  topLeftY,
  boxWidth,
  boxHeight,
  fillColor
): void => {
  context.fillStyle = fillColor;
  context.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
};

// Change bitmap to turn image
const drawBitmapCenteredWithRotation: Bitmap = (
  useBitmap,
  atX,
  atY,
  withAngle
) => {
  context.save();
  context.translate(atX, atY);
  context.rotate(withAngle);
  context.drawImage(useBitmap, -useBitmap.width / 2, -useBitmap.height / 2);
  context.restore();
};

// Color Texts and display
const colorText: ColorText = (showWords, textX, textY, fillColor) => {
  context.fillStyle = fillColor;
  context.fillText(showWords, textX, textY);
};
