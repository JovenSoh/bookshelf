# BookShelf

A personal digital bookshelf to display the books you are reading or have finished. Built with React and Tailwind CSS, it features a clean, dark-mode interface and an interactive accordion layout to view book details.

## Features

- **Interactive Accordion UI:** Books are displayed in a responsive accordion. Clicking a book cover expands to show details like the synopsis and personal notes.
- **Responsive Design:** The layout is optimized for both desktop and mobile viewing. On smaller screens, the accordion switches to a horizontally scrollable view.
- **Easy Customization:** Book data is managed through a simple JSON file, making it easy to add or update your collection.
- **Ready for Deployment:** Comes with instructions for quick deployment to GitHub Pages.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed on your machine.

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/jovensoh/bookshelf.git
    cd bookshelf
    ```

2.  **Install NPM packages:**
    ```sh
    npm install
    ```

3.  **Run the development server:**
    ```sh
    npm run dev
    ```
    Open [http://localhost:5173](http://localhost:5173) to view it in the browser. The page will reload if you make edits.

## Customizing Your Bookshelf

### Adding Your Books

All book data is stored in `src/data/books.json`. You can edit this file to add your own books. Each book is a JSON object with the following structure:

```json
{
  "id": 1,
  "title": "Book Title",
  "author": "Author Name",
  "image": "book-cover.jpg",
  "synopsis": "A short summary of the book.",
  "notes": "Your personal thoughts or notes on the book.",
  "status": "reading"
}
```

- `id`: A unique number for each book.
- `title`: The title of the book.
- `author`: The author's name.
- `image`: The filename of the book cover image.
- `synopsis`: A brief description of the book.
- `notes`: Your personal notes. This can be an empty string.
- `status`: The current status, can be "reading" or "finished".

### Adding Book Covers

Place your book cover images in the `public/images/` directory. Make sure the `image` field in `books.json` matches the filename of the corresponding image in this directory.

## Deployment

This project is set up for easy deployment to GitHub Pages.

### Step 1: Set Up Your Repository

If you cloned this repository, make sure to link it to your own GitHub account.

### Step 2: Configure for GitHub Pages

1.  **Install `gh-pages`:**
    This package helps with deploying the build files.
    ```sh
    npm install gh-pages --save-dev
    ```

2.  **Update `package.json`:**
    Add a `homepage` field and `predeploy`/`deploy` scripts. Replace `your-username` and `your-repo-name` with your actual GitHub username and repository name.

    ```json
    {
      // ...
      "homepage": "https://your-username.github.io/your-repo-name",
      "scripts": {
        // ...
        "predeploy": "npm run build",
        "deploy": "gh-pages -d dist"
      },
      // ...
    }
    ```

3.  **Update `vite.config.js`:**
    Set the `base` path to your repository name. This ensures that all assets are loaded correctly on GitHub Pages.

    ```javascript
    import { defineConfig } from 'vite'
    import react from '@vitejs/plugin-react'

    // https://vitejs.dev/config/
    export default defineConfig({
      base: '/your-repo-name/', // Replace 'your-repo-name'
      plugins: [react()],
    })
    ```

### Step 3: Deploy

Run the deploy script:

```sh
npm run deploy
```

This command will first build the project and then push the contents of the `dist` folder to a `gh-pages` branch on your repository. Your website should be live at the URL specified in the `homepage` field in `package.json` shortly after.
