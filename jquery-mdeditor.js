/**
 * Markdown Editor jQuery Plugin
 * @version 0.0.1
 * @author Andrew Hedges <andrew@hedges.nam>
 * @requires jQuery, markdown.js, ES6 template support
 */
;(function (window, document, $, markdown, undefined) {

    function MarkdownEditor(el) {
        this.timer = null; // used for throttling window resize events
        this.$editor = $(el);
        var height = this.$editor.outerHeight();
        var width = this.$editor.outerWidth();
        var offset = this.$editor.offset();
        this.$rendered = $(`<div class="rendered-markdown" title="Click to edit"></div>`);
        this.$rendered.css({
            background: 'white',
            height: `${height}px`,
            left: `${offset.left}px`,
            overflow: 'auto',
            position: 'absolute',
            top: `${offset.top}px`,
            width: `${width}px`
        });
        $('body').append(this.$rendered);
        this.$editor.on('blur', this.handleBlur.bind(this));
        this.$rendered.on('click', this.handleClick.bind(this));
        $(window).on('resize', this.handleResize.bind(this));
        window.requestAnimationFrame(this.showRendered.bind(this));
    }

    MarkdownEditor.prototype = Object.assign(MarkdownEditor.prototype, {
        showRendered: function showRendered() {
            var output = markdown.toHTML(this.$editor.val());
            this.$rendered.html(output).show();
        },
        hideRendered: function hideRendered() {
            this.$rendered.hide();
            this.$editor.focus();
        },
        handleBlur: function handleBlur(evt) {
            this.showRendered();
        },
        handleClick: function handleClick(evt) {
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
        },
        handleResize: function handleResize(evt) {
            clearTimeout(this.timer);
            this.timer = setTimeout(this.updateSize.bind(this), 17);
        },
        updateSize: function updateSize() {
            var height = this.$editor.outerHeight();
            var width = this.$editor.outerWidth();
            var offset = this.$editor.offset();
            this.$rendered.css({
                height: `${height}px`,
                left: `${offset.left}px`,
                top: `${offset.top}px`,
                width: `${width}px`
            });
        }
    });

    $.fn.mdEditor = function initEditor() {
        return new MarkdownEditor(this);
    };

}(this, this.document, jQuery, markdown));
