const icon = [
  {
    id: 0,
    name: "Bau",
    pic: "./Images/bau.png",
    quantity: 0,
  },
  {
    id: 1,
    name: "Cua",
    pic: "./Images/cua.png",
    quantity: 0,
  },
  {
    id: 2,
    name: "Tom",
    pic: "./Images/tom.png",
    quantity: 0,
  },
  {
    id: 3,
    name: "Ca",
    pic: "./Images/ca.png",
    quantity: 0,
  },
  {
    id: 4,
    name: "Huou",
    pic: "./Images/huou.png",
    quantity: 0,
  },
  {
    id: 5,
    name: "Ga",
    pic: "./Images/ga.png",
    quantity: 0,
  },
];
let rollBtn = document.querySelector('.roll-btn')
let dices = document.querySelectorAll('.auto-image')
let resetBtn = document.querySelector('.reset-btn')
function letRandom() {
  let x = Math.floor(Math.random() * icon.length);
  return icon[x];
}

rollBtn.onclick = () => {
  let wins = []
  let t = 0
  let timer = setInterval(() => {
    t += 1
    if (t >= 100) {
      clearInterval(timer)
      winOrLose(wins)
    } else {
      wins = [letRandom(), letRandom(), letRandom()]
      dices[0].querySelector('img').src = wins[0].pic
      dices[1].querySelector('img').src = wins[1].pic
      dices[2].querySelector('img').src = wins[2].pic
    }
  }, 10)
}
document.querySelector("#roll_btn").addEventListener("click", () => {
  i = 0;
  let hundredTimes = setInterval(function () {
    if (i < 99) {
      i++;
      letRandom();
    } else {
      arr = letRandom();
      let arrJSON = JSON.stringify(arr);
      localStorage.setItem("betting", arrJSON);
      clearInterval(hundredTimes);
    }
  }, 10);
});

let diceItems = document.querySelectorAll(".item-count");
function updateData() {
  diceItems.forEach((e, index) => {
    let img = e.querySelector(".item-count img");
    let spanPoint = e.querySelector(".item-count span");
    img.src = icon[index].pic;
    spanPoint.innerHTML = icon[index].quantity;
  });
}
updateData();
box = []
diceItems.forEach((e) => {
  e.onclick = (e) => {
    let item = e.target.parentElement;
    if (sum() == true) {
      return
    } else {
      icon[item.dataset.id].quantity += 1;
      box.push(icon[item.dataset.id])
      updateData();
    }
  };
});

function sum() {
  let boolean = false
  total = 0 
  for (i = 0; i < icon.length; i++) {
    total += icon[i].quantity
  }
  if (total > 2) {
    boolean = true
  }
  return boolean
}

function winOrLose(wins) {
  let point = 0
  for (let i = 0; i < wins.length; i++) {
    for (let j = 0; j < box.length; j++) {
      if (wins[i].id == box[j].id) {
        point += 1
      }
    }
  }
  if (point > 0) {
    console.log(`Bạn thắng ${point} điểm`);
  }
  box = []
  for (i = 0; i < icon.length; i++) {
    icon[i].quantity = 0
  }
  updateData()
}

resetBtn.onclick = () => {
  box = []
  for (i = 0; i < icon.length; i++) {
    icon[i].quantity = 0
  }
  updateData()
}