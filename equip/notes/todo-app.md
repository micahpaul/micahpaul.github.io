# Tips for **Build a Todo App using Local Storage**

## Build a Todo App: Step 24
It's important to notice that we're already in the middle of the back-ticks here. So all we have to do is build the string.

Here's the code context when this step starts: 

```js
taskData.forEach(({id, title, date, description}) => {
    tasksContainer.innerHTML += `
    -- you are here
    `
})
```

The instruction in this step is: 

> Create a `div` element with the class of `task`. Utilize template strings to set the `id` attribute of the `div` to the `id` you destructured from the task data.

So we actually just need to write HTML. Start with a `div` element:

```html
<div></div>
```

Then, add the class of `task`:

```html
<div class="task"></div>
```

Finally, you'll need to set the `id` of this `div` to the `id` you pulled out for this `taskData` list item. That's just called `id`. Remember you're inside backticks, so you can use `${}` to inject that value into your string. Don't forget to put quotes around your `id` value!

```html
<div class="task" id="${id}"></div>
```