$('#displayPage').live('page init', function getData() {
console.log("HI");
toggleControls("on");
    var getListdiv = $('#dataPlay')[0];
    for (var i = 0, j = localStorage.length; i < j; i++) {
        var key = localStorage.key(i);
        var value = localStorage.getItem(key);
        value = value.split(',');

        $('<div>').attr({
            'class': 'listDiv'
        }).appendTo('#list');
        $('<h3>').html(value[0]).appendTo('.listDiv');
        $('<p>').html('Date Visited: ' + value[1]).appendTo('.listDiv');
        $('<p>').html('Order: ' + value[2]).appendTo('.listDiv');
        $('<p>').html('Type: ' + value[3]).appendTo('.listDiv');
        $('<p>').html('Rating: ' + value[4]).appendTo('.listDiv');
        $('<p>').html('Favorite: ' + value[5]).appendTo('.listDiv');
        $('<p>').html('Zip Code: ' + value[6]).appendTo('.listDiv');
        $('<p>').html('Comments: ' + value[7]).appendTo('.listDiv');
        $('<p>').html($('<a>').attr({
            'href': '#',
            'onclick': 'deleteItem(' + key + ');'
        }).html('Delete Beans')).appendTo('.listDiv');
        $('<p>').html($('<a>').attr({
            'href': '#',
            'onclick': 'editItem(' + key + ');'
        }).html('Edit Beans')).appendTo('.listDiv');

    }
});