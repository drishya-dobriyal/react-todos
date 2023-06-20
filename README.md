# Todo List App 

This is a simple Todo List application built with React. It allows you to fetch and display todo items from a dummy API, add new items, update existing items, and delete items.

## Features

- Fetch and show todo items from the API: The application fetches todo items from the [JSONPlaceholder](https://jsonplaceholder.typicode.com/todos) API and displays them in a list.

- Add a todo item: You can add a new todo item by entering the title in the input field and pressing the Enter key. The application will make a POST request to the API and save the new item in the React state.

- Update an item: You can update the title of an existing todo item by clicking on it. This will activate the edit mode, allowing you to modify the title. Press Enter to save the changes. The application will make a PUT request to the API to update the item.

- Delete an item: You can delete a todo item by clicking on the trash icon next to it. This will send a DELETE request to the API to remove the item from the list.

Please note that the API requests for adding, updating, and deleting items are dummy calls and do not actually modify the server data. They are intended for demonstration purposes only.

## Site: 
"https://drishya-dobriyal.github.io/react-todos/"

## Installation and Setup

1. Clone the repository: git clone https://github.com/your-username/todo-list-app.git
2. Navigate to the project directory: cd react-todos
3. Install the dependencies: npm install
4. Start the development server: npm start
5. Open your browser and visit http://localhost:3000 to see the Todo List application.

## Technologies Used
1. React: JavaScript library for building user interfaces.
2. react-toastify: Library for displaying toast notifications.

## Acknowledgements
1. The Todo List application is built using React, a powerful JavaScript library for building user interfaces.
2. The JSONPlaceholder API is used as a dummy API for fetching, adding, updating, and deleting todo items.
3. The react-toastify library is used for displaying error and success messages.

