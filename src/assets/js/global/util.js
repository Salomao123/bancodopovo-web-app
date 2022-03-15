abrirModalImg = function(idImg) {
    $(".modalImg").css("display", "block");
    var srcImg = $("#" + idImg).attr('src');
    $("#img01").attr("src", srcImg);
    var altImg = $("#" + idImg).attr('alt');
    $("#captionImg").html(altImg);
}