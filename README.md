# markdown-editor

Quick proof-of-concept for a progressive enhancement [Markdown](https://daringfireball.net/projects/markdown/syntax) editor [jQuery](http://jquery.com/) plugin.

Markdown rendering is handled by the excellent [markdown-js](https://github.com/evilstreak/markdown-js) library by @[evilstreak](https://github.com/evilstreak).

## Demo

See a demo of [markdown-editor in action](https://segdeha.github.io/markdown-editor/).

## Usage

Download [jquery-mdeditor.js](https://raw.githubusercontent.com/segdeha/markdown-editor/master/jquery-mdeditor.js) and link to it in your HTML.

For any given `<textarea>` on your page, such as the following:

```html
<textarea name="editor"></textarea>
```

Turn it into an editor that renders Markdown by selecting the element using jQuery and calling `mdEditor()` on the result, as follows:

```javascript
$('[name="editor"]').mdEditor();
```

-----

You can even have multiple editors on the page, though you currently have to initialize them one at a time.

```html
<textarea name="editor"></textarea>
<textarea name="editor2"></textarea>
```

```javascript
$('[name="editor"]').mdEditor();
$('[name="editor2"]').mdEditor();
```

-----

You can also store the return value of the `mdEditor()` call and show/hide the rendered output programatically, as follows:

```javascript
var editor = $('[name="editor"]').mdEditor();
editor.showRendered();
editor.hideRendered();
```
