// let people = [
//   {
//     area: "高雄",
//     name: "小明",
//   },
//   {
//     area: "高雄",
//     name: "小天",
//   },
//   {
//     area: "台中",
//     name: "小華",
//   },
//   {
//     area: "台北",
//     name: "小華",
//   },
// ];

// // LV1:修改老師的 Codepen，接 API 顯示 Donut 圖
// const url =
//   "https://raw.githubusercontent.com/hexschool/js-training/main/travelAPI-lv1.json";

// function getData() {
//   axios
//     .get(url)
//     .then(function (response) {
//       console.log(response.data);
//       renderChart(response.data); //呼叫圖表函式執行
//     })
//     .catch(function () {
//       console.log("發生錯誤，請檢查");
//     });
// }
// getData();

// // 將取回來的資料建立成圖表，使用建立函式來執行渲染圖表
// function renderChart(data) {
//   //將原始資料使用參數方式傳入
//   // 篩選地區，並累加數字上去
//   // totalObj 會變成 {高雄: 2, 台北: 1, 台中: 2}
//   let totalObj = {};
//   //將people改成參數data
//   // people.forEach(function (item, index) {
//   data.forEach(function (item, index) {
//     if (totalObj[item.area] == undefined) {
//       totalObj[item.area] = 1;
//     } else {
//       totalObj[item.area] += 1;
//     }
//   });

//   // newData = [["高雄", 2], ["台北",1], ["台中", 1]]
//   let newData = [];
//   let area = Object.keys(totalObj);
//   // area output ["高雄","台北","台中"]
//   area.forEach(function (item, index) {
//     let ary = [];
//     ary.push(item);
//     ary.push(totalObj[item]);
//     newData.push(ary);
//   });

//   // 將 newData 丟入 c3 產生器
//   const chart = c3.generate({
//     bindto: "#chart",
//     data: {
//       columns: newData,
//       type: "donut",
//     },
//     donut: {
//       title: "地區",
//     },
//   });
// }
// ---------------------------------------------------

let data = [];
const url =
  "https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json";
//LV1
const ticketCardArea = document.querySelector(".ticketCard-area");
//LV3-1.修改下拉式篩選清單
const regionSearch = document.querySelector(".regionSearch");
// 第一步：利用事件監聽知道使用者所選取的選單的值
// 第二步：把資料篩選出來(設定篩選出的資料)
// 第三步：渲染畫面
//LV3-2.同步更新資訊文字"本次搜尋共 0 筆資料"
const searchResultText = document.querySelector("#searchResult-text");
// LV3-3.新增旅遊套票
// LV3-3.新增旅遊套票-第一步先選取各欄位的選擇器
const ticketName = document.querySelector("#ticketName");
const ticketImgUrl = document.querySelector("#ticketImgUrl");
const ticketRegion = document.querySelector("#ticketRegion");
const ticketPrice = document.querySelector("#ticketPrice");
const ticketNum = document.querySelector("#ticketNum");
const ticketRate = document.querySelector("#ticketRate");
const ticketDescription = document.querySelector("#ticketDescription");
const addTicketBtn = document.querySelector(".addTicket-btn");
//LV3-4.新增套票後自動清除輸入的資料-先選到表單
const addTicketForm = document.querySelector(".addTicket-form");

//LV3-3.新增旅遊套票-第二步將新增套票按鈕進行監聽
addTicketBtn.addEventListener("click", function () {
  //LV3-3.新增旅遊套票-第三步組合所需資料格式，使用上方data的物件格式
  const obj = {
    id: data.length,
    name: ticketName.value.trim(),
    imgUrl: ticketImgUrl.value.trim(),
    area: ticketRegion.value,
    // 使用.trim()將空格移除
    description: ticketDescription.value.trim(),
    //使用Number()將字串轉型成數字
    group: Number(ticketNum.value),
    price: Number(ticketPrice.value),
    rate: Number(ticketRate.value),
  };
  //將新增的資料加到data去
  data.push(obj);
  //LV3-4.新增套票後自動清除輸入的資料-加入資料後清除表單用reset()
  addTicketForm.reset();
  //將篩選的地區選項自動跳回到全部地區的選項
  regionSearch.value = "";
  //將資料渲染到畫面上
  renderTickets(data);
  //同步將資料更新到圖表上
  renderChart(data);
});

// LV3-1.修改下拉式篩選清單第一步
regionSearch.addEventListener("change", function () {
  // LV3-1.修改下拉式篩選清單第二步
  if (regionSearch.value === "") {
    renderTickets(data);
  } else {
    let filterData = [];
    data.forEach(function (ticket) {
      if (ticket.area === regionSearch.value) {
        filterData.push(ticket);
      }
    });

    // LV3-1.修改下拉式篩選清單第三步
    renderTickets(filterData);
  }
});

// 主線任務七：將取回來的資料建立成圖表，使用建立函式來執行渲染圖表
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
    size: {
      width: 160,
      height: 160,
    },

    data: {
      columns: newData,
      type: "donut",
      colors: {
        台北: "#26C0C7",
        台中: "#5151D3",
        高雄: "#E68618",
      },
    },
    donut: {
      title: "套票地區比重",
      width: 10,
      label: {
        show: false,
      },
    },
  });
}

//LV3：因為會使用到以下跟LV1一樣渲染的套票資訊，所以包裝成函式
function renderTickets(tickets) {
  // LV1
  let ticketList = "";
  tickets.forEach(function (ticket) {
    ticketList += `<li class="ticketCard">
        <div class="ticketCard-img">
          <a href="#">
            <img src="${ticket.imgUrl}" alt="">
          </a>
          <div class="ticketCard-region">${ticket.area}</div>
          <div class="ticketCard-rank">${ticket.rate}</div>
        </div>
        <div class="ticketCard-content">
          <div>
            <h3>
              <a href="#" class="ticketCard-name">${ticket.name}</a>
            </h3>
            <p class="ticketCard-description">
              ${ticket.description}
            </p>
          </div>
          <div class="ticketCard-info">
            <p class="ticketCard-num">
              <span><i class="fas fa-exclamation-circle"></i></span>
              剩下最後 <span id="ticketCard-num">${ticket.group}</span> 組
            </p>
            <p class="ticketCard-price">
              TWD <span id="ticketCard-price">$${ticket.price}</span>
            </p>
          </div>
        </div>
      </li>`;
  });
  ticketCardArea.innerHTML = ticketList;
  //LV3-2.同步更新資訊文字"本次搜尋共 0 筆資料"
  searchResultText.textContent = `本次搜尋共 ${tickets.length} 筆資料`;
}
renderTickets(data); //呼叫函式

function getData() {
  axios
    .get(url)
    .then(function (response) {
      //使用物件取值方式取得資料
      console.log(response.data.data);
      data = response.data.data;
      renderTickets(data);
      renderChart(data); //主線任務七
    })
    .catch(function () {
      console.log("發生錯誤");
    });
}
getData();
