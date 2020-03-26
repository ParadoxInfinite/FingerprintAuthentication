$("button").click(function() {
    var thisButton = this;
    $.ajax({
        url: '/adminpanel',
        type: 'DELETE',
        data: {'cardno' : this.id},
        success: function(result) {
            thisButton.closest('tr').remove();
        },
        error: function(result) {
            console.log("Error deleting the record.");
            $("span").fadeIn("slow").text('Error deleting the record.').delay(800).slideUp(300);
        }
    });
});
