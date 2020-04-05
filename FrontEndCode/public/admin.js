// Simple jquery function to remove the record from front-end static. (Cannot do dynamic unless page is refreshed.)
$("button").click(function() {
    var thisButton = this;
    $.ajax({
        url: '/adminpanel',
        type: 'DELETE',
        data: {'cardno' : this.id},
        success: function(result) {
            thisButton.closest('tr').remove();
        },
        error: function(result) { // If there's an error deleting the record, it;ll show up on the page.
            console.log("Error deleting the record.");
            $("span").fadeIn("slow").text('Error deleting the record.').delay(800).slideUp(300);
        }
    });
});
