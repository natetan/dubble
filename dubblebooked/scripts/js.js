/**
 * Created by Will and Yulong on 12/31/2015.
 */
(function () {
    "use strict";

    $('#court').hide();
    document.getElementById("court").addEventListener('change', changeRequestCourt, false);
    $('#room').hide();
    document.getElementById("room").addEventListener('change', changeRequestRoom, false);
    $('#date').hide();
    document.getElementById("date").addEventListener('change', changeRequestDate, false);
    $('#time').hide();
    document.getElementById("time").addEventListener('change', changeRequestTime, false);
    $('#jis').hide();
//document.getElementById("jis").addEventListener('change', changeRequest, false);

    var request = {
        court: null,
        room: null,
        date: null,
        time: null
    };

    var count = 1;


    window.onload = function () {
        requestAndFill("court");
    };

// If court is selected
    function changeRequestCourt() {
        request[this.getAttribute("id")] = this.value;
        $('#room').empty();
        $('#room').append("<option disabled=\"disabled\" selected=\"selected\">Room</option>");
        $('#date').empty();
        $('#date').append("<option disabled=\"disabled\" selected=\"selected\">Date</option>");
        $('#time').empty();
        $('#time').append("<option disabled=\"disabled\" selected=\"selected\">Time</option>");
        request["room"] = "";
        request["date"] = "";
        request["time"] = "";
        requestAndFill("room");
    }

// Room is clicked
    function changeRequestRoom() {
        request[this.getAttribute("id")] = this.value;
        $('#date').empty();
        $('#date').append("<option disabled=\"disabled\" selected=\"selected\">Date</option>");
        $('#time').empty();
        $('#time').append("<option disabled=\"disabled\" selected=\"selected\">Time</option>");
        request["date"] = "";
        request["time"] = "";
        requestAndFill("date");
    }

    function changeRequestDate() {
        request[this.getAttribute("id")] = this.value;
        $('#time').empty();
        $('#time').append("<option disabled=\"disabled\" selected=\"selected\">Time</option>");
        request["time"] = "";
        requestAndFill("time");

    }

    function changeRequestTime() {
        requestAndFill(this.getAttribute("id"));
    }

    function requestAndFill(s) {
        console.log(s);
        $.post("../..", request)
            .done(function (data) {
                var parent = document.getElementById(s);
                for (var i = 0; i < data.length; i++) {
                    var node = document.createElement("OPTION");
                    if (s == "time")
                        node.innerHTML = parseTime(data[i]);
                    else
                        node.innerHTML = data[i];
                    parent.appendChild(node);

                }
                $("#" + s).show();
                console.log(data);
            });
    }

    function parseTime(t) {
        if (parseInt(t.substring(0, 2)) > 12) {
            var time = parseInt(t.substring(0, 2)) - 12;
            if (time < 10) {
                time = "0" + time;
            }
            return time + t.substring(2) + " PM"
        } else if (parseInt(t.substring(0, 2)) == 12) {
            return t + " PM";
        } else {
            return t + " AM";
        }

    }
})();

