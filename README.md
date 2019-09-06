# Easy sampletask for middle+ ReactJS developers

## Instructions
1. Clone this repo.

2. Create new branch. The name of your branch should contain first name and last name in camel case.

3. Launch dev-server using `npm run dev`. Project will be available on `localhost:1337`

## Requiremets
1. This sampletask is oriented on 1 hour of work (usually it takes less).
2. This sampletask uses:
 - TypeScript
 - ReactJS
 - ReactRouter v5
 - MobX as a global application state manager  
 - SASS for styling
 - Webpack for dev-server / bundling
   
   If you have troubles with this stack, you can use official documentation of each item. You can also use Redux instead of MobX, but the responsibility of installing, configuring and using is on you own. You can also use any library for AJAX requests (Superagent, axios, etc.).

3. if you are installing additional dependencies, they all should be appeared in `package.json`.

3. Provided code should be well-formatted. Indentations should be done using tabs, size of indentation is 4 spaces. Avoid rows longer than 80 symbols. Components should be placed to the `components` folder
4. Provide typings for any entity you fetch from API. Your code should not contain `"any"`.

## Pages List
```
/        -> Homepage

/account -> Account // private, contains Sign In form if not yet signed in

/sign-up -> SignUp

/sign-in -> SignIn

/gallery -> Gallery
```

## API docs
[click me!](http://192.168.88.72:8081)

## Tasks overview
1. Implement sign-in, sign-up and sign-out logic. Private pages should be wrapped with `components/SignInForm.tsx`
2. Chain list of photos to provided API.
3. Implement image-preload feature. Image in gallery card should not be displayed until it fully loaded. While image loading, `components/Preloader` should be shown. If image is not reachable, `components/BrokenImage` should be shown.
4. Implement photo zoom by clicking on the image. If user reloads page while image is zoomed in, it should be still zoomed in after reload.
5. Implement "likes" according to API docs.
6. (not required, but will be a good tip) Implement code-splitting on the level of views (hint: use ViewWrapper component for it).

## Recommendations
Before starting, discover the interface, project structure and API docs. It can take up to 10 minutes, but after that it will be easier for you to complete tasks.

Take a look on comments inside the source code. They are helpful and sometimes contain hints :)

Fill free to modify everything if you need. But remember, that provided source code is mosltly like a Lego - you just need to assemble it.

It is strongly recommended to use Visual Studio Code for doing this sampletask. It will help you and will significantly decrease the time you will spend on this competition.

```javascript
console.log("Good luck, have fun!")
```