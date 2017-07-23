function motionButton(e) {
  let btn = document.querySelector(".btn");
  let btnY = btn.offsetTop;
  let btnX = btn.offsetLeft;
  let xMouse = e.clientX;
  let yMouse = e.clientY;
  let coor = "Coordinates: (" + xMouse + "," + yMouse + ")";
  document.getElementById("demo").innerHTML = coor;
  if (yMouse - btnY < 100 || xMouse - btnX < 100) {
    btn.style.left = yMouse - 20 + "px";
    btn.style.top = xMouse - 20 + "px";
    btn.innerText = "Уйди";
  } else if (yMouse - btnY > 100 || xMouse - btnX < 100) {
    debugger;
    btn.innerText = "ты куда? ";
    btn.style.left = yMouse - 20 + "px";
    btn.style.top = xMouse - 20 + "px";
  }

  console.log(btnY, btnX);
}
function sayHi() {
  alert("Hi");
}
