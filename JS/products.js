const products = {
  men: ["Images/mens1.png", "Images/mens2.png", "Images/mens3.png", "Images/mens4.png", "Images/mens5.png", "Images/mens6.png", "Images/mens7.png", "Images/mens8.png", "Images/mens9.png"],
  female: ["Images/womens1.png", "Images/womens2.png", "Images/womens3.png", "Images/womens4.png", "Images/womens5.png", "Images/womens6.png", "Images/womens7.png", "Images/womens8.png", "Images/womens9.png"],
  kids: ["Images/kids1.png", "Images/kids2.png", "Images/kids3.png", "Images/kids4.png", "Images/kids5.png", "Images/kids6.png", "Images/kids7.png"]
};

let currentCategory = "men";
let index = 0;

const img = document.getElementById("productImage");
const prevImg = document.getElementById("prevImage");
const nextImg = document.getElementById("nextImage");

function updateImages() {
  const list = products[currentCategory];

  img.src = list[index];
  prevImg.src = list[(index - 1 + list.length) % list.length];
  nextImg.src = list[(index + 1) % list.length];
}

function changeImage(newIndex) {
  img.classList.add("fade");
  setTimeout(() => {
    index = newIndex;
    updateImages();
    img.classList.remove("fade");
  }, 200);
}

document.querySelectorAll(".tab").forEach(tab => {
  tab.onclick = () => {
    document.querySelector(".tab.active").classList.remove("active");
    tab.classList.add("active");
    currentCategory = tab.dataset.category;
    index = 0;
    updateImages();
  };
});

document.querySelector(".left").onclick = () => {
  changeImage(
    (index - 1 + products[currentCategory].length) %
    products[currentCategory].length
  );
};

document.querySelector(".right").onclick = () => {
  changeImage(
    (index + 1) % products[currentCategory].length
  );
};

setInterval(() => {
  changeImage(
    (index + 1) % products[currentCategory].length
  );
}, 3500);

updateImages();
