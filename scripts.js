const road = document.getElementById("road");
const hand = document.getElementById("hand");
const amogus = document.getElementById("amogus");
const audio = document.querySelector("audio");
let positionX = 0;
const maxXLimit = 100;
const minXLimit = -150;
const stripes = document.getElementById("stripes");
let isArrowUpPressed = false;
let intervalId;

document.addEventListener("keydown", (event) => {
  const mood = document.getElementsByClassName("mood")[0];
  const vibes = ["vibe1", "vibe2", "vibe3", "vibe4", "vibe5"];
  let vibeIndex = 0;
  const positionIncrement = 10;

  switch (event.key) {
    case "ArrowLeft":
      positionX += positionIncrement;
      if (positionX + positionIncrement <= maxXLimit) {
        positionX += positionIncrement;
      }
      break;
    case "ArrowRight":
      positionX -= positionIncrement;
      if (positionX + positionIncrement <= minXLimit) {
        positionX += positionIncrement;
      }
      break;
    case "ArrowDown":
      stripes.style.animationPlayState = "paused";
      break;
    case "ArrowUp":
      isArrowUpPressed = true;
      stripes.style.animationPlayState = "running";

      if (isArrowUpPressed) {
        amogus.style.filter = "brightness(100%)";
        audio.play();
        intervalId = setInterval(() => {
          if (mood) {
            mood.removeAttribute("id");
            mood.setAttribute("id", vibes[vibeIndex]);
            vibeIndex = (vibeIndex + 1) % vibes.length;
          }
        }, 5000);
      } else {
        break;
      }
      break;
    default:
      return;
  }

  positionX = Math.min(positionX, maxXLimit);
  hand.style.transform = `translate(-${positionX}px)`;
  road.style.transform = `translate(${positionX}px)`;
});

document.addEventListener("keyup", (event) => {
  if (event.key === "ArrowUp") {
    isArrowUpPressed = false;
    amogus.style.filter = "brightness(0%)";
    stripes.style.animationPlayState = "paused";
    audio.pause();
    clearInterval(intervalId);
  }
});
