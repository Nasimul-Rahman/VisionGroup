const products = {
  men: ["Images/men1.png", "Images/men2.png", "Images/men3.png"],
  female: ["Images/female1.png", "Images/female2.png"],
  kids: ["Images/kids1.png", "Images/kids2.png"]
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
