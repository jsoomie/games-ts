const carPic = document.createElement("img") as HTMLImageElement;
// const roadPic = document.createElement("img") as HTMLImageElement;
// const wallPic = document.createElement("img") as HTMLImageElement;
// const goalPic = document.createElement("img") as HTMLImageElement;
// const treePic = document.createElement("img") as HTMLImageElement;
// const flagPic = document.createElement("img") as HTMLImageElement;

let trackPics: HTMLImageElement[] = [];

const imageData = [
  {
    title: carPic,
    fileSrc: "player_car.png",
  },
  {
    trackType: TrackGrid.ROAD,
    fileSrc: "track_road.png",
  },
  {
    trackType: TrackGrid.WALL,
    fileSrc: "track_wall.png",
  },
  {
    trackType: TrackGrid.GOAL,
    fileSrc: "track_goal.png",
  },
  {
    trackType: TrackGrid.TREE,
    fileSrc: "track_trees.png",
  },
  {
    trackType: TrackGrid.FLAG,
    fileSrc: "track_flag.png",
  },
];

let picsToLoad = imageData.length;

const onLoadedLaunch = (): void => {
  imageData.map((data) => {
    if (data.title !== undefined) {
      beginLoadingImage(data.title, data.fileSrc);
    } else {
      loadingImageForTrackCode(data.trackType, data.fileSrc);
    }
  });
  if (picsToLoad === 0) {
    imageLoadDone();
  }
};

const loadingImageForTrackCode = (trackCode: TrackGrid, fileSrc: string) => {
  trackPics[trackCode] = document.createElement("img");
  beginLoadingImage(trackPics[trackCode], fileSrc);
};

const beginLoadingImage = (imgVar: HTMLImageElement, fileName: string) => {
  picsToLoad--;
  imgVar.src = fileName;
};

const loadImages = (): void => {
  onLoadedLaunch();
};
