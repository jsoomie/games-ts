const carPic = document.createElement("img") as HTMLImageElement;
const roadPic = document.createElement("img") as HTMLImageElement;
const wallPic = document.createElement("img") as HTMLImageElement;
const goalPic = document.createElement("img") as HTMLImageElement;
const treePic = document.createElement("img") as HTMLImageElement;
const flagPic = document.createElement("img") as HTMLImageElement;

const imageData = [
  {
    title: carPic,
    fileSrc: "player_car.png",
  },
  {
    title: roadPic,
    fileSrc: "track_road.png",
  },
  {
    title: wallPic,
    fileSrc: "track_wall.png",
  },
  {
    title: goalPic,
    fileSrc: "track_goal.png",
  },
  {
    title: treePic,
    fileSrc: "track_trees.png",
  },
  {
    title: flagPic,
    fileSrc: "track_flag.png",
  },
];

let picsToLoad = imageData.length;

const onLoadedLaunch = (): void => {
  imageData.map((data) => {
    beginLoadingImage(data.title, data.fileSrc);
  });
  if (picsToLoad === 0) {
    imageLoadDone();
  }
};

const beginLoadingImage = (imgVar: HTMLImageElement, fileName: string) => {
  picsToLoad--;
  imgVar.src = fileName;
};

const loadImages = (): void => {
  onLoadedLaunch();
};
