import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";


const appSetting = {
    databaseURL: "https://moviestore-fc7ae-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSetting);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "ShoppingList");


const inputFieldEle = document.getElementById("input-field");
const addButtonEle = document.getElementById("add-btn");
const listEle = document.getElementById("list");

// Adding Item to the Database
addButtonEle.addEventListener("click", function () {
    let inputValue = inputFieldEle.value;
    push(shoppingListInDB, inputValue);
    console.log(`${inputValue} added to the Database`);
    inputFieldBlank();
});

// Adding Item to the DOM element

onValue(shoppingListInDB, function (shoppingList) {
    if (shoppingList.exists()) {
        let shoppingListArray = Object.entries(shoppingList.val());
        // For Empty the books Items in the DOM
        liFieldBlank();
        for (let i = 0; i < shoppingListArray.length; i++) {
            let currentShoppingList = shoppingListArray[i];
            addElemToDom(currentShoppingList);
        }
        console.log(shoppingListArray);
    } else {
        liFieldBlank();

        listEle.innerHTML += `There is no Item left`;
    }
})
function liFieldBlank() {
    listEle.innerHTML = '';
}
function inputFieldBlank() {
    inputFieldEle.value = '';
}
function addElemToDom(shoppingList) {
    let shoppingListId = shoppingList[0];
    let shoppingListValue = shoppingList[1];
    let newEle = document.createElement('li');
    newEle.innerHTML = shoppingListValue;
    listEle.appendChild(newEle);
    removeItem(newEle, shoppingListId)
}

function removeItem(element, shoppingListId) {
    element.addEventListener("click", async function () {
        let exactLocationOfStoryInDB = await ref(database, `ShoppingList/${shoppingListId}`);
        remove(exactLocationOfStoryInDB);
    })
}


