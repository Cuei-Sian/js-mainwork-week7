let people = [
  {
    area: "高雄",
    name: "小明",
  },
  {
    area: "高雄",
    name: "小天",
  },
  {
    area: "台中",
    name: "小華",
  },
  {
    area: "台北",
    name: "小華",
  },
];

// LV1:修改老師的 Codepen，接 API 顯示 Donut 圖
const url =
  "https://raw.githubusercontent.com/hexschool/js-training/main/travelAPI-lv1.json";

function getData() {
  axios
    .get(url)
    .then(function (response) {
      console.log(response.data);
      renderChart(response.data); //呼叫圖表函式執行
    })
    .catch(function () {
      console.log("發生錯誤，請檢查");
    });
}
getData();

// 將取回來的資料建立成圖表，使用建立函式來執行渲染圖表
function renderChart(data) {
  //將原始資料使用參數方式傳入
  // 篩選地區，並累加數字上去
  // totalObj 會變成 {高雄: 2, 台北: 1, 台中: 2}
  let totalObj = {};
  //將people改成參數data
  // people.forEach(function (item, index) {
  data.forEach(function (item, index) {
    if (totalObj[item.area] == undefined) {
      totalObj[item.area] = 1;
    } else {
      totalObj[item.area] += 1;
    }
  });

  // newData = [["高雄", 2], ["台北",1], ["台中", 1]]
  let newData = [];
  let area = Object.keys(totalObj);
  // area output ["高雄","台北","台中"]
  area.forEach(function (item, index) {
    let ary = [];
    ary.push(item);
    ary.push(totalObj[item]);
    newData.push(ary);
  });

  // 將 newData 丟入 c3 產生器
  const chart = c3.generate({
    bindto: "#chart",
    data: {
      columns: newData,
      type: "donut",
    },
    donut: {
      title: "地區",
    },
  });
}
