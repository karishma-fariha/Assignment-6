const loadCategories = () => {
    const url = "https://openapi.programming-hero.com/api/categories";
    fetch(url)
        .then((res) => res.json())
        .then((json) => displayCategories(json.categories));

};
const loadTreeDetail = (id) => {
    const url = `https://openapi.programming-hero.com/api/plant/${id}`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => displayTreeDetails(data.plants));
}
const displayTreeDetails = (tree) => {
    console.log(tree)
    const box = document.getElementById("details-container")
    box.innerHTML = `<div>
                 <h2> ${tree.name}</h2>
                    </div>
                     <div class="">
                            <img src="${tree.image}" alt="">
                        </div>
                        <div class="">
                            <h2>Category : ${tree.category}</h2>
                            <h2>Price : ৳${tree.price}</h2>
                            <p>Description : ${tree.description}</p>
                        </div>`;
    document.getElementById("tree").showModal();
}
const loadCategoriesTree = (id) => {

    const url = `https://openapi.programming-hero.com/api/category/${id}`;
    fetch(url)
        .then(res => res.json())
        .then((data) => displayTrees(data.plants));
}
const displayTrees = (trees) => {
    const treeContainer = document.getElementById("tree-container");
    treeContainer.innerHTML = "";

    for (let tree of trees) {
        //  console.log(tree); 
        const card = document.createElement("div");

        card.innerHTML = ` <div class="bg-white rounded-xl justify-center px-10 py-5 space-y-3">
    <img class="max-w-80 max-h-80 mb-2 rounded-md mx-auto" src="${tree.image}" alt="">
    <h2 onclick="loadTreeDetail(${tree.id})" class="text-xl font-semibold my-3"> ${tree.name} </h2>
    <p class="text-xs font-normal mb-3">${tree.description}</p>
    <div class="flex justify-between items-center">
        <button class="mb-3 btn bg-[#cff0dc] text-xs font-normal text-[#15803D]">${tree.category}</button>
        <h3 class =" mb-3 text-xs font-semibold">৳${tree.price}</h3>
    </div>
    <button onclick="loadCart(${tree.price},'${tree.name}')" class="btn bg-[#15803D] text-white rounded-2xl w-full text-xs font-medium">Add to Cart</button>
 </div>
    
`;

        treeContainer.append(card);
    }
}

const loadingAllTrees = () => {
    const url = "https://openapi.programming-hero.com/api/plants";
    fetch(url)
        .then((res) => res.json())
        .then((json) => displayTrees(json.plants));
}

const displayCategories = (trees) => {
    const treeCategories = document.getElementById("tree-categories");
    treeCategories.innerHTML = "";
    for (let tree of trees) {
        // console.log(tree)
        const btnTree = document.createElement("div");
        btnTree.innerHTML = `  <button onclick ="loadCategoriesTree('${tree.id}')" class="btn btn-ghost rounded-md text-black btn-success w-full">${tree.category_name}</button>`;
        treeCategories.append(btnTree);
    }

};


let cartItems = []

const loadCart = (price, name) => {
    let items = cartItems.find(item => item.name === name)
    if (items) {
        items.count++
    } else {
        cartItems.push({ name, price, count: 1 })
    }
    CartBuilding()
}

const CartBuilding = () => {
    const cartElement = document.getElementById("cartItems")
    cartElement.innerHTML = ""

    let total = 0

    cartItems.forEach(item => {
        total += item.price * item.count

        const addItems = document.createElement("div")
        addItems.innerHTML = `
      <div class="flex items-center justify-between gap-14 bg-[#DCFCE795] p-5 rounded-xl ">
        <div>
          <h2 class="font-bold">${item.name}</h2>
          <p class="text-gray-400">৳${item.price} x ${item.count}</p>
        </div>
        <div>
          <i class="fa-solid fa-xmark text-gray-400 cursor-pointer"
             onclick="removeFromCart('${item.name}')"></i>
        </div>
      </div>`
        cartElement.append(addItems)
    })

    const totalDiv = document.createElement("div")
    totalDiv.className = "mt-4 font-bold text-xl"
    totalDiv.innerText = `Total: ৳${total}`
    cartElement.append(totalDiv)
}

const removeFromCart = (name) => {
    cartItems = cartItems.filter(item => item.name !== name)
    CartBuilding()
}
loadingAllTrees();
loadCategories();