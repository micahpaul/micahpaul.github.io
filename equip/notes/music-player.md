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

## Build a Music Player: Step 17
This is another one that more than one of you asked about.

In the starting state of this step, the play button always plays the song with `id = 0`. The problem is that if another song is already playing, this behavior doesn't really make sense. The instructions ask us to start changing the behavior of this button click.

The instructions say: 

> To fix this, within the arrow function of the event listener, replace `playSong(0)` with an if statement that checks if `userData.currentSong` is `null`.
>
> Inside the if block, call the `playSong` function with the `id` of the first song in the `userData.songs` array.

This is confusing because it has a few steps. First, we build the if statement: 

```js
  if(userData.currentSong === null) {

  }
```

So far, so good! We still need a call to `playSong()`, so let's use the original for now, even though we know it's wrong.

```js
  if(userData.currentSong === null) {
    playSong(0);
  }
```

We click, and it works! Well, sort of. We're doing almost, but not quite, what we've been asked. 

Remember that to get the first item out of an array, you can use square brackets, like this: `const firstItem = myArray[0];`

So we might try this:

```js
  if(userData.currentSong === null) {
    playSong(userData.songs[0]);
  }
```

Alas, it does not work. Now we're getting some gnarly errors. To see why, let's use our trusty friend `console.log()`:

```js
  if(userData.currentSong === null) {
    console.log(userData.songs[0]);
    playSong(userData.songs[0]);
  }
```

Aha! The logging shows us that we're calling it with the wrong kind of argument: 

```js
{ id: 0,
  title: 'Scratching The Surface',
  artist: 'Quincy Larson',
  duration: '4:25',
  src: 'https://cdn.freecodecamp.org/curriculum/js-music-player/scratching-the-surface.mp3' }
```

`playSong()` is looking for an `id`, not the whole `song` object. So we can fix that easily enough:

```js
  if(userData.currentSong === null) {
    playSong(userData.songs[0].id);
  }
```

And now it should pass.

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

## Build a Music Player: Step 25
This one is actually a lot easier than you think it will be.

Let's start by declaring the function. We'll do it as an arrow function to match the style around it:

```js
const getNextSong = () => {};
```

This function needs to return something, so let's add that to the function body:

```js
const getNextSong = () => {return };
```

But what does it need to return? An item from an array. Remember that we access those via square brackets - `[]`.

```js
const getNextSong = () => {return userData.songs[0];};
```

This will return the first element in the array (the one at index=0). Close, but not quite what we want. We're told to use `getCurrentSongIndex()` plus one. 

```js
const getNextSong = () => {return userData.songs[getCurrentSongIndex()+1];};
```

And that's actually all you need to do! But what about returning `undefined` if the current song is the last one in the playlist? Conveniently, trying to access an array element at an invalid index results in `undefined`. See [a full explanation here](https://algocademy.com/link/?problem=exceeding-array-bounds&lang=js&solution=1). So we're good.

## Build a Music Player: Step 27

For this step, we need to finish our `playNextSong` function. We've already handled the case where no song is playing yet, in which case we play the first song in the list. 

Start by adding an `else` block; we want to handle all the cases where `userData.currentSong` is not null.

Inside the `else`, we need to do a few things: 
1. figure out if "play next song" is a valid option
1. if so, then play the next song
1. if not, then stop and clear out the currently playing song

Let's go ahead and "stub out" this function to show what things still need to be done.

```js
const playNextSong = () => {
  if (userData.currentSong === null) {
    playSong(userData.songs[0].id);
  }
  else {
    const nextSongIsValid = false; // need to figure this out

    if (nextSongIsValid) {
      // call playSong(nextSong.id);
    }
    else {
      // set userData.currentSong to null
      // set userData.songCurrentTime to 0
      // call pauseSong()
    }
  }
}
```

There's a super simple way to see if the next song is valid: we can just call `getNextSong()` and see if it's truthy.

```js
const playNextSong = () => {
  if (userData.currentSong === null) {
    playSong(userData.songs[0].id);
  }
  else {
    const nextSong = getNextSong();

    if (nextSong) {
      // call playSong(nextSong.id);
    }
    else {
      // set userData.currentSong to null
      // set userData.songCurrentTime to 0
      // call pauseSong()
    }
  }
}
```

After that, it's really simple to finish the stuff we have stubbed out:

```js
const playNextSong = () => {
  if (userData.currentSong === null) {
    playSong(userData.songs[0].id);
  }
  else {
    const songToPlay = getNextSong(); 
    
    if (songToPlay) {
      playSong(songToPlay.id);
    }
    else {
     userData.currentSong = null;
     userData.songCurrentTime = 0;
     pauseSong();
    }
  }
}
```

## Build a Music Player: Step 36

This step asks you to find `.playlist-song` element that has `aria-current="true"`. 

That's a little tricky; it requires you to know how to use `querySelector` to get an element by its class and also its attribute. Fortunately, this isn't very hard:

```js
let currentSongElement = document.querySelector('.playlist-song[aria-current="true"]');
```

Then, you can check if `currentSongElement` is truthy. If it is, then call `currentSongElement.removeAttribute("aria-current")` to remove that attribute from it.