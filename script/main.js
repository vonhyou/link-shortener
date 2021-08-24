function addProtocol(rec_url) {
  if (rec_url.indexOf('http://') != 0 &&
    rec_url.indexOf('https://') != 0) {
    rec_url = 'https://' + rec_url;
  }
  return rec_url;
}

function shortener() {
  const rec_url = addProtocol(document.forms.shorten.url.value);
  console.log(rec_url);

  const api_key = "9e2ca52fa32adc50ea1af5020e6b341c8080c568";
  fetch('https://api-ssl.bitly.com/v4/shorten', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${api_key}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ "long_url": rec_url })
  }).then((response) => {
    if (!response.ok) {
      document.getElementById("shortUrl").innerHTML = response.statusText;
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }).then((json) => {
    document.getElementById("shortUrl").value = json.link;
  });
}
