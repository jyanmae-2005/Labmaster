# Labmaster

A multi-screen React Native learning app built with Expo and TypeScript. Labmaster brings hands-on mobile development activities together in one place.

## Run the app

```bash
npm install
npm start
```

Use the Expo Go app to scan the terminal QR code, or run `npm run android` with an Android emulator available.
Run `npm run lint` and `npx tsc --noEmit` to check the source.

## App screens

- **Home** — learning dashboard, completion summary, and shortcuts to the labs.
- **Labs** — searchable, filterable activity library with completion tracking.
- **Progress** — course progress, weekly activity, and milestones.
- **Settings** — edit the local profile name and switch between light and dark appearance.

The appearance preference and completed lab IDs use React Context, so changes are reflected across screens immediately. Screens use responsive Flexbox layouts, scrollable content, and a centered maximum content width for larger devices.

## Demo recording checklist

When recording with an emulator or device, show the Home dashboard at a phone-sized viewport, resize or rotate to demonstrate its responsive layout, switch to Settings and toggle Dark appearance, then return to Home and Labs to show the theme applied across screens. Mark a lab complete and show the updated progress.
