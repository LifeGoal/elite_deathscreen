$(document).ready(function(){
    // Client listener
    window.addEventListener('message', function(event) {
        if (event.data.status == 'open') {
            $("#container").css('display', 'block')
            if (event.data.type == 'knockdown') {
                $("#container").html('');
                base =  '<div class="deathscreen">' +
                '<h3>DU TAPPADE MEDVETANDET</h3>' +
                '<h4>DU KOMMER FÖRBLÖDA OM ' +
                '<font color="red">' + event.data.time + '</font> SEKUNDER!' +
                '</h4>' +
                '</div>';
                $("#container").append(base);
            } else if (event.data.type == 'death') {
                $("#container").html('');
                base =  '<div class="deathscreen">' +
                '<h3>DU HAR MIST LIVET</h3>' +
                '<h4>' + event.data.msg1 + '' + event.data.timer + '' + event.data.msg2 +
                '</h4>' +
                '</div>';
                $("#container").append(base);
            } else if (event.data.type == 'deathrevive') {
                $("#container").html('');
                base =  '<div class="deathscreen">' +
                '<h3>DU HAR MIST LIVET</h3>' +
                '<h4>' + event.data.msg1 + '' + event.data.holdtime + '' + event.data.msg2 + '' + event.data.cost + ' SEK' +
                '</h4>' +
                '</div>';
                $("#container").append(base);
            } else if (event.data.type == 'bed') {
                $("#container").html('');
                base =  '<div class="deathscreen">' +
                '<h3>DU HAR MIST LIVET</h3>' +
                '<h4>' + event.data.msg + '</h4>' +
                '</div>';
                $("#container").append(base);
            }
        } else if (event.data.status == 'close') {
            $("#container").css('display', 'none')
        }
    });
});