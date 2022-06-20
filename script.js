function startGame() {
  scoreboard = {
    home: {
      score: 0,
      fouls: 0,
    },
    guest: {
      score: 0,
      fouls: 0,
    },
    period: 0,
    timer: 0,
  };
  isInterval = true;
  homeScore.textContent = `${scoreboard.home.score}`;
  homeFouls.textContent = `${scoreboard.home.fouls}`;

  guestScore.textContent = `${scoreboard.guest.score}`;
  guestFouls.textContent = `${scoreboard.guest.fouls}`;

  if (interval !== null) {
    clearInterval(interval);
  }
  newPeriod();
}

function newPeriod() {
  if (isInterval) {
    scoreboard.timer = 721;
    changeTimer();
    interval = setInterval(changeTimer, 1000);
    period.textContent = `${++scoreboard.period}`;
    isInterval = false;
  }
}

function changeTimer() {
  if (--scoreboard.timer === 0) {
    clearInterval(interval);
    isInterval = true;
  }

  const minutes = Math.floor(scoreboard.timer / 60);
  const seconds = scoreboard.timer % 60;

  timer.textContent = `${minutes}:${String(seconds).padStart(2, "0")}`;
}

function addPoints(team, points) {
  if (scoreboard !== null) {
    scoreboard[team].score += points;
    if (team === "home") {
      homeScore.textContent = `${scoreboard.home.score}`;
    } else {
      guestScore.textContent = `${scoreboard.guest.score}`;
    }
  }
}

function addFoul(team) {
  if (scoreboard !== null) {
    scoreboard[team].fouls++;
    if (team === "home") {
      homeFouls.textContent = `${scoreboard.home.fouls}`;
    } else {
      guestFouls.textContent = `${scoreboard.guest.fouls}`;
    }
  }
}

const timer = document.querySelector(".timer");
const period = document.querySelector(".period");

const homeScore = document.querySelector(".home .score");
const homeFouls = document.querySelector(".home .fouls");

const guestScore = document.querySelector(".guest .score");
const guestFouls = document.querySelector(".guest .fouls");

let scoreboard = null;
let interval = null;
let isInterval = null;
