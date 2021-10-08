const roadPic = document.createElement("img") as HTMLImageElement;
const wallPic = document.createElement("img") as HTMLImageElement;
const carPic = document.createElement("img") as HTMLImageElement;

const imageData = [
  {
    title: carPic,
    fileSrc: "./player_car.png",
  },
  {
    title: roadPic,
    fileSrc: "./track_road.png",
  },
  {
    title: wallPic,
    fileSrc: "./track_wall.png",
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
