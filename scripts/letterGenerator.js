const apiKey = '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'; // 여기에 본인의 OpenAI API 키를 넣으세요.
const url = 'https://api.openai.com/v1/chat/completions';

var letterArray = []; //편지를 배열에 저장
var letterCount = 0;

function letterGenerator(item){
  let keywordId = "item" + item.getAttribute('id') +"_text";
  let keyword = document.getElementById(keywordId).innerText;
  let message ="";

  const headers = {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json'
  };

  const data = {
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: '너는 동숲 주민이 작성한 유리병 편지를 생성해.' },
      { role: 'user', content: `${keyword}를 이용해서 반말로 5줄이내의 편지를 작성해줘. 편지 외의 내용, 보내는사람, 받는사람 모두 작성하지마. 그리고 한 문장이 끝나면 "<br>"을 적어줘` },
    ]
  };

  fetch(url, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(data)
  }).then(response => response.json())
    .then(result => {
      //chatGpt응답 전달 --> 편지내용 gpt응답과 보내는 사람을 재조합하여 생성
      message = generateMessage(result.choices[0].message.content);
      //편지 저장
      saveMessage(message);
      //편지 보기
      showMessage(message);
  })
  }
 
function generateMessage (message){
  const village = ['별빛 마을', '꿈의 섬', '바람골', '신비한 숲', '고래의 해변', '무지개섬', '조용한 항구', '파란 잔디', '별의 섬', '석양의 해변', 
    '달빛 정원', '구름 섬', '풀잎 마을', '봄빛 마을', '꿈의 정원', '여름의 끝 섬', '눈꽃 마을', '열매의 숲', '고양이 마을', '새싹 마을',
    '구름 정원', '북극의 별 섬', '햇살 마을', '다람쥐의 숲', '달콤한 과일 섬', '사탕나무 숲', '여우의 숲', '새벽의 정원', '꿈꾸는 달의 섬', '숨겨진 보물섬'
  ]
  const villager = ['코코', '베니', '루비', '루나', '찰리', '잭', '리오', '초코', '조지', '다니', 
    '미리', '시나몬', '디온', '그레이스', '조이', '제이', '라온', '카시', '코코넛', '해리', 
    '넬리', '롤라', '피치', '폴리', '루이', '티키', '레이', '스노우', '세라', '미로'
  ];

  let villageName = village[Math.floor(Math.random() * village.length)];
  let villagerName = villager[Math.floor(Math.random() * villager.length)];
  message =  message + "<p>" + villageName + "에서<br>" + villagerName + "</p>";

  //편지 반환
  return message;
}

function saveMessage(message){
  letterArray[letterCount] = message;
  alert(letterArray[letterCount]);
  letterCount++;
}

function showMessage(message){
  //문제)popup창에 css적용이 안됨.
  let openPopup = window.open('./letter.html', 'popup', 'width=500, height=400');
  openPopup.document.write("<div>" + message + "</div>");
  //openPopup.document.getElementById("content") = message;
}