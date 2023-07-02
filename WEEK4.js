/*
This code fetches movie data from the OMDB API based on user input,
adds the retrieved movie details to a table on a web page, and prevents 
duplicate entries. It provides a simple movie search and display functionality.
*/

// Select the mainTitle element and assign it to the mainTitle constant
const mainTitle = document.getElementById("mainTitle");
// Set the text content of the mainTitle element to "Movie Search"
mainTitle.textContent = "Movie Search";

// Array to keep track of searched movies
const logMovies = [];

// Function to fetch movie data from the OMDB API
function fetchData(movieName) {
  // API key for accessing the OMDB API
  const apiKey = "5c70a48e";
  // Construct the URL for the API request using the movie name and API key
  const url = `https://www.omdbapi.com/?t=${movieName}&apikey=${apiKey}`;

  // Send a fetch request to the API and return the response data as JSON
  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // If the movie name is empty, throw an error
      if (movieName.length === 0) throw new Error("Please enter a movie name");
      // If the API response contains an error, throw an error
      if (data.Error) throw new Error("Movie not found");
      // Return the movie data
      return data;
    });
}

// Function to add a new movie record to the table
function addNewRecord(data) {
  // Check if the movie is already in the logMovies array
  if (logMovies.includes(data.Title)) {
    // Display an alert message if the movie is already in the list
    alert("Movie is already in the list");
    return;
  }

  // Add the movie title to the logMovies array
  logMovies.push(data.Title);

  // Select the table body and insert a new row at the beginning
  const newRow = document.querySelector(".list tbody").insertRow(0);

  // Insert the movie title, year, poster image, plot, and director into the cells of the new row
  newRow.insertCell(0).textContent = data.Title;
  newRow.insertCell(1).textContent = data.Year;
  newRow.insertCell(2).innerHTML = `<img src="${data.Poster}">`;
  newRow.insertCell(3).textContent = data.Plot;
  newRow.insertCell(4).textContent = data.Director;
}

// Main function that handles the movie search
function main() {
  // Get the value from the movieName input field and remove leading/trailing whitespace
  const movieName = document.querySelector("#movieName").value.trim();
  // If the input is empty, display an alert message and return
  if (movieName === "") {
    alert("Please enter a movie name");
    return;
  }

  // Call the fetchData function with the movie name, and once the data is retrieved successfully, call the addNewRecord function
  fetchData(movieName)
    .then(addNewRecord)
    .catch((error) => {
      // Catch any errors that occur during the fetch request or data processing
      alert(error);
    });
}

// Add a click event listener to the button element that calls the main function
document.querySelector("button").addEventListener("click", main);

// Add a keypress event listener to the input element that calls the main function when the enter key is pressed
document.querySelector("input").addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    main();
  }
});
