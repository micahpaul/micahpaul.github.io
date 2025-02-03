# Tips for **Build a Music Player**

## Build a Music Player: Step 11
A couple of you asked me about this one, and no wonder! It's pretty complicated. 

`find()` is a method you can call on an array. It takes a callback function with one argument. 

Here's the example this step provides: 

```js
const numbers = [10, 20, 30, 40, 50];

// Find the first number greater than 25
const foundNumber = numbers.find((number) => number > 25);
console.log(foundNumber); // Output: 30
```

Note that inside the call to `find()` is this self-contained arrow function: `(number) => number > 25`

It might help our understanding to rewrite this using a named function instead of the anonymous one: 

```js
const numbers = [10, 20, 30, 40, 50];

function isGreaterThan25(number) {
    return number > 25;
}

// Find the first number greater than 25
const foundNumber = numbers.find(isGreaterThan25);
console.log(foundNumber); // Output: 30
```

So basically this step is looking for you to pass a self-contained function callback into `find()`. Let's start with a dummy `callback` argument in that call:

```js
const playSong = id => {
  const song = userData.songs.find(callback);
}
```

Now we're getting the error `[ReferenceError: callback is not defined]`. So let's define it!

The output says "Your `find` call should return a song whose `id` is strictly equal to the `id` passed into the `playSong` function."

Let's modify the example from above:

```js
(number) => number > 25;
```

That function was looking for a `number` somewhere in the `numbers` array. But we're looking for a `song`. And we want it to exactly equal the `id` that has been passed into `playSong`. 

So the callback might look like this:

```js
(song) => song === id;
```

Putting it all together, we end up with something like this:

```js
const playSong = id => {
  const song = userData.songs.find((song) => song.id === id); 
}
```

## Build a Music Player: Step 20

This one was really hard for me, so I suspect it will be for you, too. 

It helps if you break the step down into smaller steps. Also, `console.log()` is our **very** good friend!

1. First, figure out the index of the song you'll want to play.
    - You can use `song.id.replace()` to get rid of the `song-` part of it.
    - Use `parseInt()` to convert the string to an integer.
1. Next, find the `button` you want to add an event listener to.
    - You already have `song`, which is a `<li>` element. Take a look at the HTML you're trying to pull the button out of:
        ```HTML
        <li id="song-0" class="playlist-song">
          <button class="playlist-song-info" >
            <span class="playlist-song-title">Scratching The Surface</span>
            <span class="playlist-song-artist">Quincy Larson</span>
            <span class="playlist-song-duration">4:25</span>
          </button>
        </li>
        ```
    - You're looking for the `<button class="playlist-song-info">`. You can use `song.querySelector()` to grab it.
1. Now that you have the index and the button, you're ready to call `button.addEventListener()`.
1. Here it is, all put together:

```js
songs.forEach((song) => {
  const n = parseInt(song.id.replace("song-", ""));
  const button = song.querySelector('.playlist-song-info');
  button.addEventListener("click", () => {playSong(n)});
});
```

## Build a Music Player: Step 36

This step asks you to find `.playlist-song` element that has `aria-current="true"`. 

That's a little tricky; it requires you to know how to use `querySelector` to get an element by its class and also its attribute. Fortunately, this isn't very hard:

```js
let currentSongElement = document.querySelector('.playlist-song[aria-current="true"]');
```

Then, you can check if `currentSongElement` is truthy. If it is, then call `currentSongElement.removeAttribute("aria-current")` to remove that attribute from it.