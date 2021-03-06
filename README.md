# Sea of Thieves Cooking Timer

Give the aspiring pirate chef within you the proper tools to succeed. This web application lets you create timers for the various cookable foods in Sea of Thieves. Playing with a crew? Create an online room and invite your shipmates on board. They'll see the same timers as you will, allowing someone else to take your precious Ruby Splashtail off the pan while you're already fishing for the next catch.

This application is still heavily in development. Visit the latest version here: [misacorp.github.io/sea-of-thieves-cooking-timer](https://misacorp.github.io/sea-of-thieves-cooking-timer/)

## TODO

This is where I dump ideas in order to clear my head. Check the [Issues page](https://github.com/Misacorp/sea-of-thieves-cooking-timer/issues) for a broader view of what remains to be done.

- (Possibly fixed?) TIMER_SYNC is emitted twice when joining an existing room: when a client joins and when they request for timers. The latter happens because TimerGrid does not catch the timers paired with the USER_JOINED event. Rework TimerGrid so that it catches the timers and doesn't have to ask for them a second time.
- Navigating within the app should disconnect the user from the room they were in.
- Save nickname to local storage

## Deployment

To deploy the server, run `git subtree push --prefix server heroku master` in the project root.

To deploy the client, run `npm run deploy` in the client directory.