(function($) {
  $(function() {
    $('body').append('<pre><code class="javascript" id="view-source"></code></pre>')
    $('#view-source').text($('body > script ').text())
    hljs.highlightBlock($('#view-source')[0]);
  });
})(jQuery)