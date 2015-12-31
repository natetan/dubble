/**
 * Created by Will on 12/31/2015.
 */

"use strict";

$('#court').hide();
$('#court').addEventListener('change', showElement, false);
$('#room').hide();
$('#room').addEventListener('change', showElement, false);
$('#date').hide();
$('#date').addEventListener('change', showElement, false);
$('#time').hide();
$('#time').addEventListener('change', showElement, false);
$('#jis').hide();
$('#jis').addEventListener('change', showElement, false);


window.onload = function () {
    // alert("hello");
    $.post("../..", function (data) {
        //console.log("Data Loaded: " + data );
        //console.log(data[0]);

        //for (var i = 0; i < data.length; i++) {
        //    console.log(data[i]);
        //}
        //console.log(i + 1);
        var parent = document.getElementById("court");
        for (var i = 0; i < data.length; i++) {
            var node = document.createElement("OPTION");
            node.innerHTML = data[i];
            parent.appendChild(node);
        }
        $('#court').show();
    });

    $.post("../..", {court: "John"})
        .done(function (data) {
            alert("Data Loaded: " + data);
        });

    var courtSelect = $('#court');
    var roomSelect = document.getElementById("room");


    function showElement() {
        if (this.value == "court") {
            $('#room').show();
        } else if (this.value == "room") {
            $('#date').show();
        } else if (this.value == "date") {
            $('#time').show();
        } else {
            $('#jis').show();
        }
    }
};

