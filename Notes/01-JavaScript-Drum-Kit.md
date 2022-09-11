# Notes

## Error logging `audio[data-key=65]`
In the tutorial, he tries to log the HTML audio element using  the `audio[data-key=65]` selector (6' 30"), 
which only works when he adds quotes to the number.
If I'm not mistaken, that's because, at first, the engine interprets the attribute as a number and later, adding quotes, as a string.

## `<kbd>`
>The `<kbd>` HTML element represents a span of inline text denoting textual user
>input from a text entry device."
["\<kbd>" - _MDN_.](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/kbd)