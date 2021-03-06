import {sendAdminRequest, fetchState} from "./network";
import he from "he";

document.getElementById("seed-button").onclick = () => {
  if(confirm("This will delete everything from the database.")) {
    if(confirm("Are you really sure???")) {
      sendAdminRequest("player", "post", {seed: true, playerCount: 30})
        .then(() => alert("The DB was seeded."))
        .catch(e => alert(e));
    }
  }
};

document.getElementById("seed-without-players-button").onclick = () => {
  if(confirm("This will delete everything from the database.")) {
    if(confirm("Are you really sure???")) {
      sendAdminRequest("player", "post", {seed: true, playerCount: 0})
        .then(() => alert("The DB was seeded."))
        .catch(e => alert(e));
    }
  }
};

document.getElementById("reset-button").onclick = () => {
  if(confirm("This will stop the current game a start a new one.")) {
    sendAdminRequest("competition", "put", {running: true})
      .then(() => alert("The thread was reset."))
      .then(fetchAndDisplay)
      .catch(e => alert(e));
  }
};

document.getElementById("duration-button").onclick = () => {
  const duration = parseInt(document.getElementById("duration-input").value) * 60;
  sendAdminRequest("ranked", "put", {duration})
    .then(() => alert("The duration was set."))
    .catch(e => alert(e));
};

document.getElementById("new-player-button").onclick = () => {
  const playerName = document.getElementById("new-player-input").value;
  sendAdminRequest("player", "post", {player_name: playerName})
    .then(response => {
      document.getElementById("new-player-secret").value = response.player_secret;
      document.getElementById("new-player-id").value = response.player_id;
      alert("A new player was created.");
    })
    .catch(e => alert(e));
};

document.getElementById("new-player-secret-button").onclick = () => {
  document.getElementById("new-player-secret").select();
  document.execCommand("copy");
};
document.getElementById("new-player-id-button").onclick = () => {
  document.getElementById("new-player-id").select();
  document.execCommand("copy");
};

document.getElementById("danger-zone-button").onclick = () => {
  const display = document.getElementById("danger-zone").style.display;
  document.getElementById("danger-zone").style.display = display === "none" ? "block" : "none";
};

document.getElementById("player-zone-button").onclick = () => {
  const display = document.getElementById("player-zone").style.display;
  document.getElementById("player-zone").style.display = display === "none" ? "block" : "none";
};

document.getElementById("change-multiplier-button").onclick = async () => {
  const multiplier = parseInt(document.getElementById("change-multiplier-input").value) || 0;
  await sendAdminRequest("multiplier", "put", {multiplier});
  alert(`The next multiplier was set to ${multiplier}`);
};

document.getElementById("resume-button").onclick = async () => {
  await sendAdminRequest("paused", "put", {paused: false});
  await fetchAndDisplay();
  alert("The game was resumed");
};
document.getElementById("pause-button").onclick = async () => {
  await sendAdminRequest("paused", "put", {paused: true});
  await fetchAndDisplay();
  alert("The game was paused");
};

document.getElementById("enable-leaderboard-button").onclick = async () => {
  await sendAdminRequest("leaderboard", "put", {disabled: false});
  await fetchAndDisplay();
  alert("The leaderboard was enabled");
};
document.getElementById("disable-leaderboard-button").onclick = async () => {
  await sendAdminRequest("leaderboard", "put", {disabled: true});
  await fetchAndDisplay();
  alert("The leaderboard was disabled");
};


function displayEntries(entries) {
  const table = document.getElementById("player-list-body");
  for(const i in entries) {
    const entry = entries[i];
    const row = table.insertRow(0);
    row.insertCell(0).innerHTML = he.encode(entry.player_id.toString());
    row.insertCell(1).innerHTML = he.encode(entry.name);
    row.insertCell(2).innerHTML = he.encode(entry.secret);
  }
}

function clearEntries() {
  const table = document.getElementById("player-list-body");
  while (table.firstChild) {
    table.removeChild(table.firstChild);
  }
}

function togglePauseButtons(gameState) {
  if (gameState.paused) {
    document.getElementById("resume-button").className = "btn btn-primary";
    document.getElementById("pause-button").className = "btn btn-secondary";
  } else {
    document.getElementById("resume-button").className = "btn btn-secondary";
    document.getElementById("pause-button").className = "btn btn-primary";
  }
}

function toggleLeaderboardButtons(gameState) {
  if (!gameState.disabledLeaderboard) {
    document.getElementById("enable-leaderboard-button").className = "btn btn-secondary";
    document.getElementById("disable-leaderboard-button").className = "btn btn-primary";
  } else {
    document.getElementById("enable-leaderboard-button").className = "btn btn-primary";
    document.getElementById("disable-leaderboard-button").className = "btn btn-secondary";
  }
}

async function fetchAndDisplay() {
  const entries = await sendAdminRequest("get_players", "post");
  clearEntries();
  displayEntries(entries);

  const state = await fetchState(-1);
  document.getElementById("current-multiplier-input").value = state.multiplier;
  togglePauseButtons(state);
  toggleLeaderboardButtons(state);
}

setInterval(fetchAndDisplay, 5 * 1000);
fetchAndDisplay();
