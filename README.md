# Artworks Data Table with Pagination and Row Selection

This project is a React application that displays a paginated table of artworks. The table allows users to:
- Navigate through pages of artwork data.
- Select multiple rows.
- Use an overlay to define how many rows to select on the current page.

It uses the following libraries:
- **React**: Frontend framework.
- **PrimeReact**: UI components for the table, dialog, input number, and more.
- **Axios**: For fetching data from the API.

## Features
- **Pagination**: Allows users to browse through multiple pages of data.
- **Multiple Row Selection**: Users can select multiple rows from the table.
- **Row Selection Input**: An overlay dialog that lets users specify how many rows to select on the current page.
- **API Integration**: Fetch data from the Art Institute of Chicago API and display it in a paginated format.

## Setup and Installation

### Prerequisites
Make sure you have the following installed:
- Node.js (preferably v14 or higher)
- npm (comes with Node.js)
- TypeScript (optional, if you are using TypeScript)

### Step 1: Clone the repository
1. Clone this repository to your local machine:

   ```bash
     git clone https://github.com/your-username/artworks-datatable.git
     cd artworks-datatable
2. install dependencies
  ```bash
    npm install
3. run application
   ```bash
      npm start
