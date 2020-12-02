var i = 0, len;
displayWR(i);

function displayWR(i) {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      myFunction(this, i);
    }
  };
  xmlhttp.open("GET", "World_Rank.xml", true);
  xmlhttp.send();
}

function myFunction(xml, i) {
  var xmlDoc = xml.responseXML;
  x = xmlDoc.getElementsByTagName("Player");
  len = x.length;
  document.getElementById("showWR").innerHTML =
  "Rank: " +
  x[i].getElementsByTagName("Rank")[0].childNodes[0].nodeValue +
    "<br>Name: " +
  x[i].getElementsByTagName("Name")[0].childNodes[0].nodeValue +
  "<br>Title: " +
  x[i].getElementsByTagName("TITLE")[0].childNodes[0].nodeValue +
  "<br>Melo: " +
  x[i].getElementsByTagName("Melo")[0].childNodes[0].nodeValue;
}

function next() {
  if (i < len-1) {
    i++;
    displayWR(i);
  }
}

function previous() {
  if (i > 0) {
    i--;
    displayWR(i);
  }
}