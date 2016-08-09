// create editor instance once the DOM has loaded
$(function () {
    var editor = $('[name="editor"]').mdEditor();
    editor.showRendered();
});
