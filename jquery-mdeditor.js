/**
 * Markdown Editor jQuery Plugin
 * @version 0.0.1
 * @author Andrew Hedges <andrew@hedges.nam>
 * @requires jQuery, markdown.js, ES6 template support
 */
;(function (window, document, $, markdown, undefined) {

    function MarkdownEditor(el) {
        this.timer     = null; // used for throttling window resize events
        this.$editor   = $(el);
        this.$rendered = $(`<div class="rendered-markdown" title="Click to edit"></div>`);
        this.$rendered.css({
            background: 'white',
            overflow: 'auto',
            position: 'absolute'
        });
        this._updateSize();
        $('body').append(this.$rendered);
        this.$editor.on('blur', this._handleBlur.bind(this));
        this.$rendered.on('click', this._handleClick.bind(this));
        $(window).on('resize', this._handleResize.bind(this));
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

        _handleBlur: function _handleBlur(evt) {
            this.showRendered();
        },

        _handleClick: function _handleClick(evt) {
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

        _handleResize: function _handleResize(evt) {
            clearTimeout(this.timer);
            this.timer = setTimeout(this._updateSize.bind(this), 17);
        },

        _updateSize: function _updateSize() {
            var height = this.$editor.outerHeight();
            var width  = this.$editor.outerWidth();
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
