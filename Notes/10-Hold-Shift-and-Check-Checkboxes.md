# Notes

## Adjacent sibling combinator
In order to style the checked elements he uses the adjacent sibling combinator
as elements `<input>` and `<p>` are direct siblings:
```css
    input:checked + p {
      background: #F9F9F9;
      text-decoration: line-through;
    }
```
- "[Adjacent sibling combinator](https://developer.mozilla.org/en-US/docs/Web/CSS/Adjacent_sibling_combinator)" - _MDN_


### Resources

- "[\<input\>.checked attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#checked)" - _MDN_
- "[MouseEvent.shiftKey](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/shiftKey)" - _MDN_



