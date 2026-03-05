const products = {
  men: ["Images/men1.png", "Images/men2.png", "Images/men3.png", "Images/men4.png", "Images/men5.png", "Images/men6.png", "Images/men7.png", "Images/men8.png", "Images/men9.png"],
  female: ["Images/women1.png", "Images/women2.png", "Images/women3.png", "Images/women4.png", "Images/women5.png", "Images/women6.png", "Images/women7.png", "Images/women8.png", "Images/women9.png"],
  kids: ["Images/kid1.png", "Images/kid2.png", "Images/kid3.png", "Images/kid4.png", "Images/kid5.png", "Images/kid6.png", "Images/kid7.png"]
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
