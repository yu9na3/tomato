function saveRecord() {
  const date = document.getElementById('date').value;
  const variety = document.getElementById('variety').value;
  const plantCount = document.getElementById('plant-count').value;
  const height = document.getElementById('height').value;

  if (!date || !variety || !plantCount || !height) {
    alert('全ての項目を入力してください。');
    return;
  }

  const record = {
    date: date,
    variety: variety,
    plantCount: plantCount,
    height: height
  };

  let records = localStorage.getItem('tomatoRecords');
  records = records ? JSON.parse(records) : [];
  records.push(record);
  localStorage.setItem('tomatoRecords', JSON.stringify(records));

  displayRecords();
  clearForm();
}

function displayRecords() {
  const recordListDiv = document.getElementById('record-list');
  recordListDiv.innerHTML = ''; // 一度クリア

  let records = localStorage.getItem('tomatoRecords');
  records = records ? JSON.parse(records) : [];

  if (records.length === 0) {
    recordListDiv.innerHTML = '<p>まだ記録はありません。</p>';
    return;
  }

  const ul = document.createElement('ul');
  records.forEach(record => {
    const li = document.createElement('li');
    li.textContent = `${record.date} - <span class="math-inline">\{record\.variety\} \(</span>{record.plantCount}株) - ${record.height}cm`;
    ul.appendChild(li);
  });
  recordListDiv.appendChild(ul);
}

function clearForm() {
  document.getElementById('date').value = '';
  document.getElementById('variety').value = '';
  document.getElementById('plant-count').value = '';
  document.getElementById('height').value = '';
}

// ページ読み込み時に記録を表示
document.addEventListener('DOMContentLoaded', displayRecords);
