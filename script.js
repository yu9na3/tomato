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
    li.textContent = `${record.date} - ${record.variety} (${record.plantCount}株) - ${record.height}cm`;
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
function displayGraph() {
  const records = getRecordsFromLocalStorage(); // ローカルストレージから記録を取得する関数 (既存の displayRecords() 内の処理を流用できます)

  if (!records || records.length === 0) {
    return;
  }

  // グラフ描画に必要なデータの準備
  const labels = records.map(record => record.date);
  const heights = records.map(record => parseInt(record.height)); // 数値に変換

  const ctx = document.getElementById('myChart').getContext('2d');
  new Chart(ctx, {
    type: 'line', // グラフの種類 (例: 'line', 'bar')
    data: {
      labels: labels,
      datasets: [{
        label: 'トマトの高さ (cm)',
        data: heights,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

// 既存の saveRecord() や displayRecords() の関数も残しておきます

// ページ読み込み時にグラフも表示するように修正 (必要であれば)
document.addEventListener('DOMContentLoaded', () => {
  loadRecords(); // 記録を表示
  // displayGraph(); // グラフを表示 (初期表示時に表示したい場合)
});

// ローカルストレージから記録を取得する関数 (例)
function getRecordsFromLocalStorage() {
  const recordsString = localStorage.getItem('tomatoRecords');
  return recordsString ? JSON.parse(recordsString) : [];
}
