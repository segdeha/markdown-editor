/**
 * Markdown Editor jQuery Plugin
 * @version 0.0.1
 * @author Andrew Hedges <andrew@hedges.nam>
 * @requires jQuery, markdown.js, ES6 template support
 */
;(function (window, document, $, markdown, undefined) {

    function MarkdownEditor(el) {
        this.$editor = $(el);
        var height = this.$editor.outerHeight();
        var width = this.$editor.outerWidth();
        var offset = this.$editor.offset()
        this.$rendered = $(`<div class="rendered-markdown"></div>`);
        this.$rendered.css({
            background: 'white',
            height: `${height}px`,
            left: `${offset.left}px`,
            position: 'absolute',
            top: `${offset.top}px`,
            width: `${width}px`
        });
        $('body').append(this.$rendered);
        this.$editor.on('blur', this.handleBlur.bind(this));
        this.$rendered.on('click', this.handleClick.bind(this));
        window.requestAnimationFrame(this.showRendered.bind(this));
    }

    MarkdownEditor.prototype = Object.assign(MarkdownEditor.prototype, {
        showRendered: function () {
            var output = markdown.toHTML(this.$editor.val());
            this.$rendered.html(output).show();
        },
        hideRendered: function () {
            this.$rendered.hide();
            this.$editor.focus();
        },
        handleBlur: function (evt) {
            this.showRendered();
        },
        handleClick: function (evt) {
            if (evt.target.matches('a')) {
                // prevent default behavior
                evt.preventDefault();
                // open the link href in a new window
                window.open($(evt.target).attr('href'));
            }
            else {
                // hide the rendered output
                // focus on the textarea
                this.hideRendered();
            }
        }
    });

    $.fn.mdEditor = function initEditor() {
        return new MarkdownEditor(this);
    };

}(this, this.document, jQuery, markdown));
