### Demo Project

This demo project showcases a number of features:

- It is deployed on [Vercel](https://vercel.com/) and the master branch version can be viewed [here](https://button-demo.vercel.app).
- A clap button that animates when clicked.
  - Copied and modified from [here](https://github.com/JonathanDn/mediumclap) ([jsfiddle demo](https://jsfiddle.net/urft14zr/425)).
  - See the [ClapButton component](https://github.com/CodyBrouwers/button-demo/blob/master/src/components/ClapButton.tsx).
  - TODO:
    - Update CSS animations and CSS class name changes to be entirely within React.
- Clicking the clap button increments a debounced count value that is charted in the background of the page using [react-charts](https://react-charts.tanstack.com).
  - See the [BackgroundScoreChart component](https://github.com/CodyBrouwers/button-demo/blob/9f7aa62218d16f5d9be37e070005c4cdcbebf047/src/components/BackgroundScoreChart.tsx).
- There is also an Next.js API endpoint at `/api/analytics/track` that is pinged when clicking the clap button. See [useTrackAnalytics file](https://github.com/CodyBrouwers/button-demo/blob/master/src/hooks/useTrackAnalytics.tsx).
  - This analytics call is debounced client side.
  - The endpoint is also setup to occasionaly fail some percentage of the time, and the `useTrackAnalytics` hook will retry the request a set number of times.
  - The endpoint saves the analytics data to an [Upstash](https://upstash.com) instance.
