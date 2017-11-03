document.addEventListener("DOMContentLoaded", function() {
    var $alpha = document.querySelector('.js_alphabet');
    if ($alpha) {
        var alphabet = "abcdefghijklmnopqrstuvwxyz".split('');
        for(var i in alphabet) {
            var $button = document.createElement("button");
            $button.className = 'btn-letter';
            var t = document.createTextNode(alphabet[i]);
            $button.appendChild(t);
            $alpha.appendChild($button);
        }
    }
});