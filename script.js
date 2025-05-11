function convertFile() {
  const fileInput = document.getElementById('fileInput');
  const format = document.getElementById('formatSelect').value;
  const downloadLink = document.getElementById('downloadLink');

  const file = fileInput.files[0];
  if (!file) return alert('Please select a file');

  const reader = new FileReader();
  reader.onload = function (e) {
    let content = e.target.result;
    let convertedContent;
    let filename = file.name.split('.')[0];

    if (format === 'json') {
      convertedContent = JSON.stringify({ content: content });
    } else if (format === 'txt') {
      convertedContent = content.toString();
    }

    const blob = new Blob([convertedContent], { type: 'text/plain' });
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = `${filename}.${format}`;
    downloadLink.style.display = 'inline';
    downloadLink.textContent = `Download ${filename}.${format}`;
  };

  reader.readAsText(file);
}
