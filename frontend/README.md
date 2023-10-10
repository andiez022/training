# Tagging Tool WebApp

## Install dependencies

- Run command `npm install` to install all package

- Create .env file and prepare all env variables

```
   cp .env.example .env
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build` (Only for Production)

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

## Run project with Docker (Recommended use for Production)

```
   docker-compose up --build -d
```

## Project structure

````
.
├── src
|    ├── common
|    |     ├── assets
|    |     |     ├── fonts
|    |     |     |     └── ```
|    |     |     ├── images
|    |     |     |     └── ```
|    |     |     └── ```
|    |     ├── locales
|    |     |     ├── ${locale}.json
|    |     |     └── ```
|    |     ├── sass
|    |     |     ├── variables.scss
|    |     |     └── ```
|    |     ├── utils
|    |     |     ├── convert.ts
|    |     |     ├── notify.tsx
|    |     |     ├── storage.ts
|    |     |     └── ```
|    |     ├── enum.ts
|    |     └── ```
|    ├── components
|    |     ├── ${component-name}
|    |     |     ├── ${component-name}.tsx
|    |     |     ├── ${component-name}.scss
|    |     |     └── ```
|    |     └── ```
|    ├── services
|    |     ├── controllers
|    |     |     └── ```
|    |     ├── types
|    |     |     ├── apiType.ts
|    |     |     └── ```
|    |     ├── apiClient.ts
|    |     ├── apiServices.ts
|    |     └── ```
|    ├── views
|    |     ├── ${route-name}
|    |     |     ├── ${view-name}.tsx
|    |     |     ├── ${view-name}.scss
|    |     |     └── ```
|    |     └── ```
|    ├── App.tsx
|    ├── i18n.ts
|    ├── index.tsx
|    └── store.ts
├── package.json
├── README.md
├── .env.example
└── tsconfig.json
````

## License

UNLICENSED.
