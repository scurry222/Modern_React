# Rendering Lists

## The primary job of app developers!!


Since React tries to keep the API surface to a minimum, it uses as many base JavaScript features as possible. Where in other frameworks:

```
// Vue
<ul id="tweets">
  <li v-for="tweet in tweets">
    {{ tweet.text }}
  </li>
</ul>

// Angular
<ul id="tweets">
  <li *ngFor="let tweet of tweets">
    {{ tweet.text }}
  </li>
</ul>
```


React will just use **.map**:

```
const tweets = [
  { id: 1, stars: 13, text: 'Turns out "git reset --hard HEAD^" was a terrible idea.' },
  { id: 2, stars: 87, text: 'Tech conferences are too expensive.' },
  { id: 3, stars: 51, text: 'Clean code is subjective. Optimize for deletion.' },
  { id: 4, stars: 19, text: 'Maybe the real benefit of open source was the friendships we made along the way?' },
]

const stars = tweets.map((tweet) => tweet.stars) // [13,87,51,19]
```


...Which then can be revealed to the API surface:

```
<ul id="tweets">
  {tweets.map((tweet) => (
    <li key={tweet.id}>
      {tweet.text}
    </li>
  ))}
</ul>
```

But keep in mind, React needs a unique **key** prop to each list item!! It will yell a t you if you forget, but it also helps React know which items change throughout different renders of the component.
