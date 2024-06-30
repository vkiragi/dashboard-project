const apiKey = "ef97ad13-d3af-42e8-8fcd-914a56d30b65"; // Your API key
const teamId = 10; // Golden State Warriors team ID
const today = new Date().toISOString().split("T")[0];

async function fetchUpcomingWarriorsGames() {
  const url = `https://api.balldontlie.io/v1/games?start_date=${today}&team_ids[]=${teamId}&per_page=3`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: apiKey,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    displayGames(data.data);
  } catch (error) {
    console.error("Error fetching Warriors games:", error);
    document.getElementById("gamesList").innerHTML =
      "<li>Error loading games. Please try again later.</li>";
  }
}

function displayGames(games) {
  const gamesList = document.getElementById("gamesList");
  gamesList.innerHTML = "";

  if (games.length === 0) {
    gamesList.innerHTML = "<li>No upcoming games scheduled at the moment.</li>";
    return;
  }

  games.forEach((game) => {
    const li = document.createElement("li");
    const gameDate = new Date(game.date).toLocaleDateString();
    const homeTeam = game.home_team.full_name;
    const visitorTeam = game.visitor_team.full_name;

    li.innerHTML = `
            <strong>${gameDate}</strong><br>
            ${visitorTeam} @ ${homeTeam}<br>
            Status: ${game.status}
        `;
    gamesList.appendChild(li);
  });
}

// Call the function to fetch and display games when the page loads
window.onload = fetchUpcomingWarriorsGames;
