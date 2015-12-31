/**
 * Created by Will on 12/31/2015.
 */

"use strict";

$('#court').hide();
$('#court').addEventListener('change', changeRequest, false);
$('#room').hide();
$('#room').addEventListener('change', changeRequest, false);
$('#date').hide();
$('#date').addEventListener('change', changeRequest, false);
$('#time').hide();
$('#time').addEventListener('change', changeRequest, false);
$('#jis').hide();
$('#jis').addEventListener('change', changeRequest, false);

var request = {
    court : null,
    courtroom : null,
    date : null,
    time : null
};

var count = 1;


window.onload = function () {
    requestAndFill("court");
};

function changeRequest() {
    request[this.getAttribute("id")] = this.value;
    requestAndFill(this.getAttribute("id"));
    if (count <= 3) {
        if (count == 1) {
            $('#room').show();
        } else if (count == 2) {
            $('#date').show();
        } else if (count == 3) {
            $('#time').show();
        }
        count++;
    }
}

function requestAndFill(s) {
    $.post("../..", request)
        .done(function (data) {
            var parent = document.getElementById(s);
            for (var i = 0; i < data.length; i++) {
                var node = document.createElement("OPTION");
                node.innerHTML = data[i];
                parent.appendChild(node);
            }
        });
}

