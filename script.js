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

  winning = null;
  isInterval = true;

  const teams = ["home", "guest"];
  for (let i = 0; i < teams.length; i++) {
    panel[teams[i]].score.textContent = `${scoreboard.home.score}`;
    panel[teams[i]].fouls.textContent = `${scoreboard.home.fouls}`;
  }

  if (interval !== null) {
    clearInterval(interval);
  }
  timerActive = true;
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
    panel[team].score.textContent = `${scoreboard[team].score}`;
  }
  checkWinning(team);
}

function addFoul(team) {
  if (scoreboard !== null) {
    scoreboard[team].fouls++;
    panel[team].fouls.textContent = `${scoreboard[team].fouls}`;
  }
}

function stopPlayTimer() {
  if (interval !== null) {
    if (timerActive) {
      clearInterval(interval);
      timerActive = false;
    } else {
      interval = setInterval(changeTimer, 1000);
      timerActive = true;
    }
  }
}

function checkWinning(team) {
  if (winning === null || winning !== team) {
    teams.sort((a, b) => scoreboard[b].score - scoreboard[a].score);
    panel[teams[0]].container.classList.add("winning");
    if (panel[teams[1]].container.classList.contains("winning")) {
      panel[teams[1]].container.classList.remove("winning");
    }
  }
}

const teams = ["home", "guest"];
const timer = document.querySelector(".timer");
const period = document.querySelector(".period");

const panel = {
  home: {
    score: document.querySelector(".home .score"),
    fouls: document.querySelector(".home .fouls"),
    container: document.querySelector(".home .score-container"),
  },
  guest: {
    score: document.querySelector(".guest .score"),
    fouls: document.querySelector(".guest .fouls"),
    container: document.querySelector(".guest .score-container"),
  },
};

let scoreboard = null;
let winning = null;
let interval = null;
let isInterval = null;
let timerActive = null;
