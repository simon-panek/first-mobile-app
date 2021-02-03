# Project: PicNote

### Author

Simon Panek

## Description

A simple multi-platform app that allows the user to capture images with their camera and store them with a custom description.

## Access

Published to Expo.io: `https://expo.io/@paneks19/projects/first-mobile-app`

Also available via the following QR code

![Scan this QR code to access](picnotes-qr-code-expo.png)

### Installation via GitHub

[Fork this Repo](https://github.com/simon-panek/first-mobile-app)

1. Clone down to your local computer
2. Navigate to the `first-mobile-app` directory
3. Run $`npm i` in your terminal
4. Run $`npm start` in your terminal
5. If you are developing using an Android or iOS emulator select either of those from the Expo development window or scan the QR code to test on your mobile device

#### Warning

This app requires the use of a camera and needs user permission to function properly. Also, since a camera is required for use, neither emulators or web development will allow for fully testing the functionality.

### Functionality

- Welcome Screen
  - Press the `ADD PICNOTE` button to capture a new picture
  - Press the `VIEW NOTES` button to view all existing PicNotes
- Image Capture Screen
  - Frame your image using the preview window and press the button to capture the image
- Description Capture Scree
  - Add a description for the most recently captured image and press the `Submit` button to store the PicNote
- View All Notes Screen
  - Scroll through all stored images and descriptions
  - Press the `ADD PICNOTE` button to add a new note

#### Future Functionality

- Future development will allow the All Notes Screen to sort based on image description or date of capture
- The user will also be able to search for a specific image based on its description
