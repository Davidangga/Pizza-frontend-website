
// automatic scroll

setInterval(auto_slide, 2500);

function auto_slide() {
  if (document.getElementById("slider1").checked) {
    document.getElementById("slider1").removeAttribute("checked");
    document.getElementById("slider2").setAttribute("checked", true);
  } else if (document.getElementById("slider2").checked) {
    document.getElementById("slider2").removeAttribute("checked");
    document.getElementById("slider3").setAttribute("checked", true);
  } else if (document.getElementById("slider3").checked) {
    document.getElementById("slider3").removeAttribute("checked");
    document.getElementById("slider1").setAttribute("checked", true);
  }
}

// Pizza Card Animation

function card_animation () {
  const animation_triggers = document.getElementsByClassName("card-container");
  const card_contents = document.getElementsByClassName("card-content");
  const order_btns = document.getElementsByClassName("order-btn");
  for (let i = 0; i < animation_triggers.length; i++){
    animation_triggers[i].addEventListener("mouseover",() => {
        card_contents[i].style.borderRadius = "20px 20px 0 0";
        order_btns[i].style.transform = "translateY(-20%)"; 
      });
      animation_triggers[i].addEventListener("mouseout",() => {
        card_contents[i].style.borderRadius = "20px";
        order_btns[i].style.transform = "translateY(-100%)";
      });

  }
}

card_animation();