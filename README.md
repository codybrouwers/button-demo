### Demo Project

This project showcases the following features:

- Deployed on [Vercel](https://vercel.com/) and the master branch version can be viewed [here](https://button-demo.vercel.app).
- A clap button that animates when clicked.
  - Copied and modified from [here](https://github.com/JonathanDn/mediumclap) ([jsfiddle demo](https://jsfiddle.net/urft14zr/425)).
  - See the [ClapButton component](https://github.com/CodyBrouwers/button-demo/blob/master/src/components/ClapButton.tsx).
- Clicking the clap button increments a debounced count value that is charted in the background of the page using [react-charts](https://react-charts.tanstack.com).
  - See the [BackgroundScoreChart component](https://github.com/CodyBrouwers/button-demo/blob/master/src/components/BackgroundScoreChart.tsx).
- There is also an Next.js API endpoint at [`/api/game/write`](https://github.com/CodyBrouwers/button-demo/blob/master/src/pages/api/game/write.api.ts) that is pinged when clicking the clap button. See [useTrackClicks hook](https://github.com/CodyBrouwers/button-demo/blob/master/src/hooks/useTrackClicks.tsx).
  - This analytics call is debounced client side with a [`useDebounceFunction` hook](https://github.com/CodyBrouwers/button-demo/blob/master/src/hooks/useDebounceFunction.tsx).
  - The endpoint is also setup to occasionaly fail some percentage of the time, and the `useTrackClicks` hook will retry the request a set number of times.
  - The endpoint saves the click data to an [Upstash](https://upstash.com) instance.

During development I thought it would be cool to turn this into a game so I am looking at adding realtime syncing with other people viewing the website via [Replicache](https://replicache.dev). The idea will be to compete with other players in real time probably by clicking the button the fastest to some score. Check back soon to try it out!
