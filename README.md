# Sort War

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Running Development Environment

### `npm i` to install necessary dependencies.
### `npm start` to load react-app with electron.

## Add your own programs

***important***  Your program must accept the following list of arguments from commandline:
- **algorithm** *default | insertion | bubble | merge | heap | quick | counting | radix*
- **count** *[number]*
- **type** *integer | double | string*
- **input_file_path**
- **output_file_path**

1. Pack your app in a folder named *{your_name}-{language}.{file_extension}*, and rename your main app to this folder name.
2. Add your name and language to list of types in `src/types.js`.
3. Add languages of yours to `authorHasLangs` object in `src/config/vars.js`.

> Auto-dectect would be added in future so that you don't need to add these manually.
