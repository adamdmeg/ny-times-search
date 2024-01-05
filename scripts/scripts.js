
const form = document.getElementById('search');
const searchInput = document.getElementById('query');
const main = document.getElementById('section');

const apiKey = process.env.AUTH_TOKEN;

const APILINK = `https://api.nytimes.com/svc/books/v3/lists/overview.json?published_date={}&api-key=${apiKey}`;


// Function to run the API response

function runAPIResponse(url) {
  fetch(url).then(res => res.json())
  .then(function(data){
    console.log(data.results);
    const lists = data.results.lists;
    lists.forEach(list => {
      const list_name = list.list_name;
      const books = list.books;

      // Create a section element for the list
      const list_section = document.createElement('section');
      list_section.classList.add('list-section');

      // Create a heading for the list name
      const heading = document.createElement('h2');
      heading.textContent = list_name;
      list_section.appendChild(heading);

      // Create a div element for the list of books
      const listContainer = document.createElement('div');
      listContainer.classList.add('list-container');

      // Iterate through each book in the list and create a card element
      books.forEach(book => {
        const title = book.title;
        const description = book.description;
        const author = book.author;
        const book_image = book.book_image;

        // Create a card element for the book
        const card = document.createElement('div');
        card.classList.add('card');

        // Create an image element for the book
        const imageElement = document.createElement('img');
        imageElement.src = book_image;
        card.appendChild(imageElement);

        // Create a title element for the book
        const titleElement = document.createElement('h3');
        titleElement.textContent = title;
        card.appendChild(titleElement);

        // Create an author element for the book
        const authorElement = document.createElement('p');
        authorElement.textContent = author;
        card.appendChild(authorElement);

        // Create a description element for the book
        const descriptionElement = document.createElement('p');
        descriptionElement.textContent = description;
        card.appendChild(descriptionElement);

        // Append the card to the list container
        listContainer.appendChild(card);
      });

      // Append the list container to the list section
      list_section.appendChild(listContainer);

      // Append the list section to the main section
      main.appendChild(list_section);
    });
  });
}

// Add event listener to the form
form.addEventListener('submit', (e) => {
  e.preventDefault();
  main.innerHTML = '';

  const searchItem = searchInput.value; 

  if (searchItem) {
    const url = APILINK.replace('{}', searchItem);
    console.log(url);
    runAPIResponse(url);
    searchInput.value = '';
  }
});