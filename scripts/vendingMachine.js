function input() {
	/*input 함수
	put 버튼을 눌러 자판기에 돈을 넣으면,
	1. 지갑에 그 만큼의 돈이 들어감.
	2. input 내용을 초기화
	3. 자판기 편지를 선택할 수 있음.*/

	let insertedMoney = parseInt(document.getElementById("insertedMoney").value);
	let walletMoney = parseInt(document.getElementById("wallet_money").innerText);

	walletMoney += insertedMoney;
	document.getElementById("wallet_money").innerText = walletMoney;
	document.getElementById("insertedMoney").value = "";
}

function buy(item) {
	/*buy 함수
	select_button을 누르면,
	1. 지갑에 있는 금액 < price인지 검사
	2. 지갑에서 그만큼 돈이 차감됨.
	3. letter 생성되고 	배열에 저장됨. 저장된 letter를 클릭 시 편지내용을 다시 볼 수 있음.
	4. items란에 물품이 들어감.*/

	//1번
	let price = parseInt(item.innerText);
	let walletMoney = parseInt(document.getElementById("wallet_money").innerText);
	
	if(walletMoney < price){
		alert("돈이 부족합니다.");
		return 0;
	}
	//2번
	walletMoney -= price;
	document.getElementById("wallet_money").innerText = walletMoney;

	//3번
	letterGenerator(item);

	//4번 
	//이미지와 text를 담을 container 만들기
	let itemContainer = document.createElement("div");
	itemContainer.className = 'purchased_item';
	itemContainer.value = getLetterCount();
	itemContainer.addEventListener('click', () => {showMessage(itemContainer.value)});

	//item 이미지 가져오기
	let itemNumber = item.getAttribute('id');
	let itemImgId = "item"+itemNumber+"_img";
	let itemImg = document.getElementById(itemImgId);
	
	//item 이미지 붙이기
	let newImg = document.createElement("img");
	newImg.src = itemImg.src;

	//item text 가져오기
	let itemTextId = "item"+itemNumber+"_text";
	let itemText = document.getElementById(itemTextId);

	//item text 붙이기
	let newText = document.createElement("div");
	newText.innerText = itemText.innerText;

	//container에 이미지와 텍스트 붙이기
	itemContainer.appendChild(newText);
	itemContainer.appendChild(newImg);
	
	//content_items에 container붙이기
	document.getElementById("content_items").appendChild(itemContainer);
}

