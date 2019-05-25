/* eslint-disable no-undef */

$(document).on("pagebeforeshow ", "#home", function() {
    var info_view = ""; //string to put HTML in
    $("#noteDisplay").empty(); // since I do this everytime the page is redone, I need to remove existing before apending them all again
    $.getJSON("./noteList/") //Send an AJAX request
        .done(function(data) {
            $.each(data, function(index, record) { // make up each li as an <a> to the details-page
                $("#noteDisplay").append("<li><a data-parm='" + record.Subject + "'  href='#details-page'>" + record.Subject + "</a></li>");
            });
            // $.each(data, function(index, record) { // make up each li as an <a> to the details-page
            //     $("#noteDisplay").append("<li>Priorty:" + record.Priority + "<br/>" +
            //         "Subject:" + record.Subject + "<br/>" + "Description:" + record.Description + "</li>");
            // });


            $("#noteDisplay").listview("refresh"); // need this so jquery mobile will apply the styling to the newly added li's

            $("a").on("click", function(event) { // set up an event, if user clicks any, it writes that items data-parm into the details page's html so I can get it there
                var parm = $(this).attr("data-parm");
                //do something here with parameter on  details page
                $("#detailParmHere").html(parm);

            });

        }); // end of .done

});


$(document).on("pagebeforeshow", "#details-page", function() {

    var textString = "fix me";
    var id = $("#detailParmHere").text();
    $.getJSON("/findNote/" + id)
        .done(function(data) {
            textString = "Priority: " + data.Priority + "<br> Subject: " + data.Subject + "<br>Description: " + data.Description;
            $("#showdata").html(textString);

        })
        .fail(function(jqXHR, textStatus, err) {
            textString = "Sorry! Could not find it :(";
            $("#showdata").text(textString);
        });



});

$(document).on("pagebeforeshow", "#deletePage", function() {

    $("#deleteSubjectName").val("");
});

function deleteNote() {
    var note = $("#deleteSubjectName").val();
    $.ajax({
        url: "/deleteProduct/" + note,
        type: "DELETE",
        contentType: "application/json",
        success: function(response) {
            alert("The note successfully deleted in cloud");
        },
        error: function(response) {
            alert("Product NOT deleted in cloud");
        }
    });
}

// clears the fields
$(document).on("pagebeforeshow", "#addPage", function() {
    $("#newPriority").val("");
    $("#newSubject").val("");
    $("#newDescription").val("");
});

function addItem() {
    var newPriority = $("#newPriority").val();
    var newSubject = $("#newSubject").val();
    var newDescription = $("#newDescription").val();
    var newNote = { Priority: newPriority, Subject: newSubject, Description: newDescription };

    $.ajax({
        url: "/addNote/",
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(newNote)
    });

}