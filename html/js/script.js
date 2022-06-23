$(document).ready(function(){
    // Client listener
    window.addEventListener('message', function(event) {
        if (event.data.status == 'open') {
            $("#container").css('display', 'block')
            $("#container").html('');
            base =  '<div class="deathscreen">' +
            '<h3>' + event.data.title + '</h3>' +
            '<h4>' + event.data.msg + '</h4>' +
            '</div>';
            $("#container").append(base);
        } else if (event.data.status == 'close') {
            $("#container").css('display', 'none')
        }
    });
});