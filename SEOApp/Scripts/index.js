if (!String.prototype.format) {
    String.prototype.format = function () {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] != 'undefined'
              ? args[number]
              : match
            ;
        });
    };
}

var breakTime = 15;
var clickTime;
var countDownInterval;
var infoHtml = "<strong>Total Hit{0}:</strong> {1}, at position: {2}."

function InvokeCallback(data) {

}

function Countdown() {
    var currentTime = new Date().getTime();
    var diff = Math.floor((currentTime - clickTime) / 1000);
    if (diff >= breakTime) {
        clearInterval(countDownInterval);
        $(".btn-invoke").removeClass("disabled");
        $("#timer").text('');
    } else {
        $(".btn-invoke").removeClass("disabled").addClass("disabled");
        $("#timer").text("(" + (breakTime - diff) + ")");
    }
}

function validation() {
    if ($("#Keywords").val().trim() === '')
        $("#Keywords").removeClass("invalid").addClass("invalid");
    else
        $("#Keywords").removeClass("invalid");

    if ($("#SightUrl").val().trim() === '')
        $("#SightUrl").removeClass("invalid").addClass("invalid");
    else
        $("#SightUrl").removeClass("invalid");

    return $("#Keywords").val().trim() !== '' && $("#SightUrl").val().trim() !== '';
}

$(document).ready(function () {
    $(document).on("click", ".btn-clear", function () {
        $("input").each(function () {
            $(this).val('');
        });
        if ($(".result-section").is(":visible"))
            $(".result-section").slideToggle(400);
    });

    $(document).on("click", ".btn-invoke", function () {
        //$(this).closest("form").submit();
        
        if (validation()) {
            if ($(".result-section").is(":visible"))
                $(".result-section").slideToggle(400);
            clickTime = new Date().getTime();
            Countdown();
            countDownInterval = setInterval(Countdown, 1000);

            $.ajax({
                url: "/Home/InvokeResult",
                data: { Keywords: $("#Keywords").val(), SightUrl: $("#SightUrl").val() },
                cache: false,
                type: "GET",
                success: function (data) {
                    $("#resultTime").text(new Date().toString());
                    if (data.total > 0) 
                        $("#searchResult").html(infoHtml.format((data.total > 1 ? "s" : ""), data.total, data.results));
                    else
                        $("#searchResult").html(infoHtml.substring(0, infoHtml.indexOf("{1}") + 3).format("", data.total));
                    $(".result-section").slideToggle(400);
                },
                error: function (reponse) {
                }
            });
        }
    });

    $(document).on("keyup", "input", function (e) {
        if (e.keyCode == 13) {
            $(".btn-invoke").click();
        }
    });
});