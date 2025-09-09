const loadCategories = () => {
    const url = "https://openapi.programming-hero.com/api/categories";
    fetch(url)
        .then((res) => res.json())
        .then((json) => displayCategories(json.categories
        ));

};

const loadCategoriesTree = (id) =>{

const url =`https://openapi.programming-hero.com/api/category/${id}`;
fetch(url)
.then(res=>res.json())
.then((data) =>displayTrees(data.plants));
}
const displayTrees = (trees) =>{
const treeContainer = document.getElementById("tree-container");
treeContainer.innerHTML = "";

for(let tree of trees){
 console.log(tree); 
 const card = document.createElement("div");

card.innerHTML = ` <div class="bg-white rounded-xl justify-center py-8 px-4">
    <img class="max-w-80 max-h-80 mb-2 rounded-md mx-auto" src="${tree.image}" alt="">
    <h2> ${tree.name} </h2>
    <p>${tree.description}</p>
    <div class="flex justify-between items-center">
        <button class="btn bg-[#cff0dc]">Fruit Tree</button>
        <h3>৳500</h3>
    </div>
    <button class="btn bg-[#15803D] text-white rounded-2xl w-full">Add to Cart</button>
 </div>
    
`;

 treeContainer.append(card); 
}
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

loadCategories();