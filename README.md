# ShopSwipe - Product Discovery Mobile App

A Tinder-like mobile application for product discovery built with React and Capacitor.js. This app allows users to discover products through an intuitive swiping interface.

## Features

- **Swipe Left:** Reject/pass on a product
- **Swipe Right:** Like/save a product
- **Swipe Up:** Add product to cart
- **Beautiful Product Cards:** Displaying product image, name, brand, price, and discount information
- **Visual Feedback:** Smooth animations and visual cues for user interactions

## Tech Stack

- **React.js:** For building the user interface components
- **Capacitor.js:** For wrapping the React app into a native mobile application
- **Framer Motion:** For gesture-based interactions and animations
- **TailwindCSS:** For styling the application

## Development

1. Clone the repository
2. Install dependencies: `npm install`
3. Run development server: `npm run dev`
4. Build for production: `npm run build`
5. Add Capacitor platforms:
   - Android: `npx cap add android`
   - iOS: `npx cap add ios`
6. Sync the project: `npx cap sync`
7. Open in native IDE:
   - Android: `npx cap open android`
   - iOS: `npx cap open ios`

## Product Data Structure

The application uses a static product data array with the following structure:

```json
{
  "id": 1,
  "name": "product name",
  "brand": "brand name",
  "price": 2999,
  "originalPrice": 4999,
  "discountPercentage": 40,
  "imageUrl": "https://example.com/image.jpg"
}
```

## Building APK

To build an APK file:

1. Ensure you have Android Studio installed
2. Run `npx cap open android` to open the project in Android Studio
3. In Android Studio, select Build > Build Bundle(s) / APK(s) > Build APK(s)
4. The APK will be generated and can be found in the Android Studio build output directory
