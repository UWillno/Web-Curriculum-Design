
function nowdate() {
    document.getElementById("date").innerHTML = Date();
}
setInterval(nowdate, 1000);