//import config from "../config/apiKey.js";
//const apiKey = config.apiKey;
const apiKey = ""; //apikey 숨김처리- 자신의 apikey를 쓸 것
const url1 = 'https://api.openai.com/v1/chat/completions'; //message생성
const url2 = 'https://api.openai.com/v1/images/generations'; //image생성

const headers = {
  'Authorization': `Bearer ${apiKey}`,
  'Content-Type': 'application/json'
};

var letterCount = 0; //로컬스토리지에 저장된 편지 수

//chatGPT이용하여 편지 생성,저장,보기 함수
async function letterGenerator(item){
  let keywordId = "item" + item.getAttribute('id') +"_text";
  let keyword = document.getElementById(keywordId).innerText;
  let message ="";
  let image ="";

  const data = {
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: '너는 감성적인 편지를 생성해.' },
      { role: 'user', content: `${keyword}를 이용해서 반말로 편지를 작성해줘. 
      절대 반말이랑 존댓말을 섞어서 쓰지마.
      보내는사람과 받는 사람의 관계는 서로 모르는 사이야.
      그러니 편지 외의 내용, 보내는사람, 받는사람 모두 작성하지마. 
      그리고 한 문장이 끝나면 "<br><br>"을 적어줘. 단 마지막 문장에는 붙이지 마` },
    ]
  };

  const response = await fetch(url1, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(data)
  })
  const result = await response.json();

  //chatGpt응답 전달 --> 편지내용 gpt응답과 보내는 사람을 재조합하여 생성
  message = generateMessage(result.choices[0].message.content);

  //img생성
  //image = await generateImage(message); //계속 village 혹은 villager에 맞는 이미지가 나오는 문제 발생함.
  image = await generateImage(result.choices[0].message.content);
  
  //img + message -> 편지 저장(session storage)
  //saveMessage(message);
  saveMessage(message, image);

  //편지 보기
  showMessage(letterCount);
  
  //저장된 편지 수 갱신
  letterCount++;
}

//chatGPT가 생성한 내용에 보내는 사람을 랜덤으로 추가하여 최종 편지내용 반환
function generateMessage (message){
  const village = ['별빛 마을', '꿈의 섬', '바람골', '신비한 숲', '고래의 해변', '무지개섬', '조용한 항구', '파란 잔디', '별의 섬', '석양의 해변', 
    '달빛 정원', '구름 섬', '풀잎 마을', '봄빛 마을', '꿈의 정원', '여름의 끝 섬', '눈꽃 마을', '열매의 숲', '고양이 마을', '새싹 마을',
    '구름 정원', '북극의 별 섬', '햇살 마을', '다람쥐의 숲', '달콤한 과일 섬', '사탕나무 숲', '여우의 숲', '새벽의 정원', '꿈꾸는 달의 섬', '숨겨진 보물섬'
  ]
  const villager = ['코코', '베니', '루비', '루나', '찰리', '잭', '리오', '초코', '조지', '다니', 
    '미리', '시나몬', '디온', '그레이스', '조이', '제이', '라온', '카시', '해리', 
    '넬리', '롤라', '피치', '폴리', '루이', '티키', '레이', '스노우', '세라', '미로'
  ];

  let villageName = village[Math.floor(Math.random() * village.length)];
  let villagerName = villager[Math.floor(Math.random() * villager.length)];
  message =  message + "<br><br>"+ villageName + "에서<br>" + villagerName;

  return message;
}
/*function saveMessage(message){
  letterArray[letterCount] = {msg : message};
}*/
function saveMessage(message, image){
  if(sessionStorage.getItem('msg') == null && sessionStorage.getItem('img') == null){
    sessionStorage.setItem('msg', '[]');
    sessionStorage.setItem('img', '[]');
  }
  var msgArray = JSON.parse(sessionStorage.getItem('msg'));
  var imgArray = JSON.parse(sessionStorage.getItem('img'));

  msgArray.push(message);
  imgArray.push(image);

  sessionStorage.setItem('msg', JSON.stringify(msgArray));
  sessionStorage.setItem('img', JSON.stringify(imgArray));
}

function showMessage(count){
  let letterPage = window.open("", 'popup');
  letterPage.document.write(`
  <html>
    <head>
      <link rel="stylesheet" type="text/css" href="../styles/letter.css">
    </head>
    <body>
      <div id="container">
        <div class="img"><img src="${JSON.parse(sessionStorage.getItem('img'))[count]}"></div>
        <div class="text">${JSON.parse(sessionStorage.getItem('msg'))[count]}</div>
      </div>
    </body>
  </html>  
  `);
}

//vendingMachine.js의 buy함수에서 itemContainer.value에 저장하기 위한 함수 -> 저장된 편지의 index역할을 함
function getLetterCount() {
  return letterCount;
}

async function generateImage(message) {
  const imageResponse = await fetch(url2, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      model: "dall-e-3",
      prompt: `${message}는 편지내용이야. 여기에 어울리는 밝고 감성적인 이미지를 생성해줘.
      이미지에 글은 넣지마.`,
      size: "1024x1024",
    })
  });
  
  const imageData = await imageResponse.json();
  //console.log(imageData);
  return imageData.data[0].url;
}
