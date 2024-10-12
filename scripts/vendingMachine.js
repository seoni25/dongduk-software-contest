function input() {
	/*input 함수
	put 버튼을 눌러 자판기에 돈을 넣으면,
	1. wallet의 돈이 그만큼 빠짐.
	2. 잔액에 그 만큼의 돈이 들어감.
	3. input 내용을 초기화
	4. 자판기 음료를 선택할 수 있음.*/

	let insertedMoney = parseInt(document.getElementById("insertedMoney").value);
	let changeMoney = parseInt(document.getElementById("changeMoney").innerText);
	let walletMoney = parseInt(document.getElementById("wallet_money").innerText);
	
	if(walletMoney < insertedMoney){
		alert("가지고 있는 돈보다 더 많이 입력했습니다.");
		return;
	}
	
	changeMoney += insertedMoney;
	walletMoney -= insertedMoney;

	document.getElementById("wallet_money").innerText = walletMoney;
	document.getElementById("changeMoney").innerText = changeMoney;
	document.getElementById("insertedMoney").value = "";
}

function buy(item) {
	/*buy 함수
	select_button을 누르면,
	1. 잔액(change)에 있는 금액 < price인지 검사
	2. 잔액에서 그만큼 돈이 차감됨.
	3. letter 생성되고 	배열에 저장됨. 저장된 letter를 클릭 시 편지내용을 다시 볼 수 있음.
	4. items란에 물품이 들어감.*/

	//1번
	let price = parseInt(item.innerText);
	let changeMoney = parseInt(document.getElementById("changeMoney").innerText);
	
	if(changeMoney < price){
		alert("돈이 부족합니다.");
		return 0;
	}
	//2번
	changeMoney -= price;
	document.getElementById("changeMoney").innerText = changeMoney;

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

function change() {
	/*change함수
	change 버튼을 누르면,
	1. 만약 잔액이 남아있다면 반환->지갑에 넣기&잔액을 0원으로 만들기
	2. 잔액이 없다면, 반환할 잔액이 없다고 알림.*/

	let changeMoney = parseInt(document.getElementById("changeMoney").innerText);

	//1번 잔액이 남아있는 경우
	if(changeMoney > 0){
		let walletMoney = document.getElementById("wallet_money").innerText;
		walletMoney = parseInt(walletMoney);
		walletMoney += changeMoney;

		document.getElementById("wallet_money").innerText = walletMoney;
		document.getElementById("changeMoney").innerText = 0;
	}
	//2번 잔액이 남아있지 않는 경우
	else {
		alert("반환할 잔액이 없습니다.");
	}
}

