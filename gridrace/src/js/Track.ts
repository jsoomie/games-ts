// TRACKS settings
enum Track {
  WIDTH = 40,
  HEIGHT = 40,
  COLS = 20,
  ROWS = 15,
  GAP = 2,
}

// Track Keys
enum TrackGrid {
  ROAD,
  WALL,
  PLAYER_START,
  GOAL,
  TREE,
  FLAG,
}

console.log("hello World");

// prettier-ignore
const trackGrid = [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,  //  1
                    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1,  //  2
                    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,  //  3
                    1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1,  //  4
                    1, 0, 0, 5, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 5, 0, 0, 1, 1,  //  5
                    1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1,  //  6
                    1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1,  //  7
                    1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1,  //  8
                    1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1,  //  9
                    1, 0, 2, 1, 0, 0, 1, 5, 0, 0, 0, 3, 1, 0, 0, 1, 0, 0, 1, 1,  //  10
                    1, 3, 3, 1, 0, 0, 1, 0, 0, 0, 0, 3, 1, 0, 0, 1, 0, 0, 1, 1,  //  11
                    1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 5, 0, 0, 1, 1,  //  12
                    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1,  //  13
                    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1,  //  14
                    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]; //  15

// See where the tracks row at column and row
const isWallAtColRow = (col: number, row: number): boolean => {
  if (col >= 0 && col < Track.COLS && row >= 0 && row < Track.ROWS) {
    const trackIndexUnderCoord = rowColToArrayIndex(col, Track.COLS, row);
    return trackGrid[trackIndexUnderCoord] !== TrackGrid.ROAD;
  } else {
    return false;
  }
};

// how track handles the car
const carTrackHandling = (): void => {
  const carTrackCol = Math.floor(carX / Track.WIDTH);
  const carTrackRow = Math.floor(carY / Track.HEIGHT);

  // CAR ON COLLISION
  const trackIndexUnderCar = rowColToArrayIndex(
    carTrackCol,
    Track.COLS,
    carTrackRow
  );

  if (
    carTrackCol >= 0 &&
    carTrackCol < Track.COLS &&
    carTrackRow >= 0 &&
    carTrackRow < Track.ROWS
  ) {
    if (isWallAtColRow(carTrackCol, carTrackRow)) {
      carSpeed *= Car.BUMP_SPEED_DECREASE;
    }
  }
};

// Finds index of rows to columns
const rowColToArrayIndex = (
  col: number,
  trackCol: number,
  row: number
): number => {
  return col + trackCol * row;
};

type TrackType = (
  gap: number,
  width: number,
  height: number,
  fillColor: string,
  grid: number[],
  trackRows: number,
  trackCols: number
) => void;

const drawTracks = (): void => {
  for (let eachRow = 0; eachRow < Track.ROWS; eachRow++) {
    for (let eachCol = 0; eachCol < Track.COLS; eachCol++) {
      const arrayIndex = rowColToArrayIndex(eachCol, Track.COLS, eachRow);
      const tileKind = trackGrid[arrayIndex];
      let useImage;

      switch (tileKind) {
        case TrackGrid.ROAD:
          useImage = roadPic;
          break;
        case TrackGrid.WALL:
          useImage = wallPic;
          break;
        case TrackGrid.GOAL:
          useImage = goalPic;
          break;
        case TrackGrid.TREE:
          useImage = treePic;
          break;
        case TrackGrid.FLAG:
          useImage = flagPic;
          break;
      }

      context.drawImage(
        useImage as HTMLImageElement,
        Track.WIDTH * eachCol,
        Track.HEIGHT * eachRow
      );
    }
  }
};
