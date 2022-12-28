const xhr = new XMLHttpRequest();

xhr.onreadystatechange = function() {
  if (xhr.readyState === 4 && xhr.status === 200) {
    const container = document.getElementById("Top-Nav-Bar");
    container.innerHTML = xhr.responseText;
  }
};

xhr.open('GET', '../TopNavBar.html', true);
xhr.send();