# Cosmetic 3D

This is a full-stack Next.js and Strapi application for viewing cosmetic products in 3D.

## Project Structure

- `frontend/`: The Next.js frontend.
- `backend/`: The Strapi backend.

## Setup

### Backend (Strapi)

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run develop
    ```

4.  **Create an admin account:**
    Open your browser to [http://localhost:1337/admin](http://localhost:1337/admin) and create an administrator account.

5.  **Create Collection Types:**
    In the Strapi admin panel, go to the Content-Type Builder and create the following collection types:

    - **Product:**
      - `title` (Text)
      - `description` (Rich Text)
      - `price` (Decimal)
      - `images` (Media)
      - `model_filename` (Text) - *This should be the filename of the 3D model in the `frontend/public/3D-Modals-GLB` directory.*
      - `slug` (UID, attached to `title`)

    - **BlogPost:**
      - `title` (Text)
      - `content` (Rich Text)
      - `featured_image` (Media)
      - `author` (Text)
      - `tags` (Text)
      - `slug` (UID, attached to `title`)

    - **ThemeSettings (Single Type):**
      - `primary_color` (Text)
      - `secondary_color` (Text)
      - `background_color` (Text)
      - `font` (Text)

6.  **Set Permissions:**
    Go to `Settings` -> `Roles` -> `Public` and enable the `find` and `findOne` actions for `Product`, `BlogPost`, and `ThemeSettings`.

7.  **Add Content:**
    Add some sample products, blog posts, and theme settings.

### Frontend (Next.js)

1.  **Navigate to the root directory:**
    ```bash
    cd ..
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Create an environment file:**
    Create a `.env.local` file in the root of the project and add the following:
    ```
    STRAPI_URL=http://localhost:1337
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

    Open your browser to [http://localhost:3000](http://localhost:3000) to see the application.

## Notes

- The Strapi project is set up with SQLite. To use PostgreSQL, you will need to install the `pg` package and create a `database.js` file in the `config` directory with your PostgreSQL credentials.
- The Strapi `package.json` has a placeholder UUID. You should replace `"replace-with-your-own-uuid"` with a unique UUID.
