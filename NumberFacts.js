let url = "http://numbersapi.com/";
let favNum = 85;

async function getNum() {
  console.log("For number " + favNum);
  let data = await $.getJSON(`${url}${favNum}?json`);
  console.log(data);
}

getNum();

let multipleNums = [13, 45, 62];
async function getMultipleNums() {
  let data = await $.getJSON(`${url}${multipleNums}?json`);
  console.log("For numbers " + multipleNums);
  console.log(data);
}

getMultipleNums();

let favNums = [72, 85, 63, 1];
let list = document.getElementById("list");

async function myFavNums() {
  let pageData = await $.getJSON(`${url}${favNums}?json`);
  for (let num in pageData) {
    let fact = pageData[num];
    let listItem = document.createElement("li");
    listItem.textContent = `${fact}`;
    list.appendChild(listItem);
  }

  console.log("For numbers " + favNums);
  console.log(pageData);
}

myFavNums();
