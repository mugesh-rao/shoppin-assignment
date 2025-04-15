@echo off
echo Building ShopSwipe APK...

rem Build the React app
call npm run build

rem Sync with Capacitor
call npx cap sync android

rem Open Android Studio (assuming it's installed)
call npx cap open android

echo.
echo Once Android Studio is open:
echo 1. Select "Build" from the top menu
echo 2. Select "Build Bundle(s) / APK(s)" 
echo 3. Choose "Build APK(s)"
echo 4. Find the APK in the build output directory (usually android/app/build/outputs/apk/debug/)
echo.
echo Build process initiated! 