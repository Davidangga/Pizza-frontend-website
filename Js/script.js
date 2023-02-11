// enable and disable scroll
// Code below taken from https://stackoverflow.com/questions/4770025/how-to-disable-scrolling-temporarily
var keys = { 37: 1, 38: 1, 39: 1, 40: 1, 32: 1 };

function preventDefault(e) {
  e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

var supportsPassive = false;
try {
  window.addEventListener(
    "test",
    null,
    Object.defineProperty({}, "passive", {
      get: function () {
        supportsPassive = true;
      },
    })
  );
} catch (e) {}

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent =
  "onwheel" in document.createElement("div") ? "wheel" : "mousewheel";

function disableScroll() {
  window.addEventListener("DOMMouseScroll", preventDefault, false); // older FF
  window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
  window.addEventListener("touchmove", preventDefault, wheelOpt); // mobile
  window.addEventListener("keydown", preventDefaultForScrollKeys, false);
}

function enableScroll() {
  window.removeEventListener("DOMMouseScroll", preventDefault, false);
  window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
  window.removeEventListener("touchmove", preventDefault, wheelOpt);
  window.removeEventListener("keydown", preventDefaultForScrollKeys, false);
}

// register pop up mechanism

const register_btn = document.querySelector(".register-btn");
const register_page = document.querySelector(".register-page");
const layer = document.querySelector(".layer");

register_btn.addEventListener("click", () => {
  register_btn.classList.add("active");
  register_page.style.visibility = "visible";
  layer.style.visibility = "visible";
  disableScroll();
});
register_page.querySelector("img").addEventListener("click", () => {
  register_btn.classList.remove("active");
  register_page.style.visibility = "hidden";
  layer.style.visibility = "hidden";
  enableScroll();
});

// checking form on submit

function direct_validate(){
  const reg_form = document.getElementById("register-form");
  const username = reg_form.querySelector("#username");
  const email = reg_form.querySelector("#email");
  const pwd1 = reg_form.querySelector("#pwd1");
  const pwd2 = reg_form.querySelector("#pwd2");
  const array = reg_form.getElementsByClassName("error-msg");
  var pattern = /^[a-zA-Z ]+$/;

  username.addEventListener("input", () => {
    if (!username.value.match(pattern) || username.value == ""){
      array[0].classList.replace("correct","incorrect");
    }
    else{
      array[0].classList.replace("incorrect","correct");
    };
  })

  email.addEventListener("input",() => {
    if (email.value.indexOf("@") == 0 || email.value.indexOf("@") < 0) {
      array[1].classList.replace("correct","incorrect");
    }
    else{
      array[1].classList.replace("incorrect","correct");
    };
  })

  pwd1.addEventListener("input", () =>{
    if(pwd1.value == "" || pwd1.value.length < 8){
      array[2].classList.replace("correct","incorrect");
    }
    else{
      array[2].classList.replace("incorrect","correct");
    }
  })

  pwd2.addEventListener("input", () => {
    if (pwd2.value != pwd1.value){
      array[3].classList.replace("correct","incorrect");
    }
    else{
      array[3].classList.replace("incorrect","correct");
    }
  })
}

function validate() {
  const reg_form = document.querySelector("#register-form");
  const username = reg_form.querySelector("#username").value;
  const email = reg_form.querySelector("#email").value;
  const pwd1 = reg_form.querySelector("#pwd1").value;
  const pwd2 = reg_form.querySelector("#pwd2").value;
  const gender = reg_form.querySelector('input[type = "radio"]:checked');
  const pizza = reg_form.querySelector("#pizza").value;
  const notify = reg_form.querySelector('input[type = "checkbox"]:checked');
  var pattern = /^[a-zA-Z ]+$/;
  var errmsg = "";
  var result = true;

  if (!username.match(pattern) || username == ""){
    errmsg += "Invalid Username \n";
  };

  if (email.indexOf("@") == 0) {
    errmsg += "Email cannot start with an @ symbol.\n";
  } else if (email.indexOf("@") < 0) {
    errmsg += "Email must contain an @ symbol.\n";
  }

  if (pwd1 == ""){
    errmsg += "Password field is empty \n";
  };

  if (pwd1.length < 8){
    errmsg += "Invalid password, password must at least 8 characters long \n";
  };

  if(pwd1 != pwd2){
    errmsg += "password not match \n";
  };
  
  if(gender == null ){
    errmsg += "Please pick a gender \n";
  };

  if(pizza == "none"){
    errmsg += "Please select one pizza \n";
  };

  if(notify == null){
    errmsg += "Please check the box \n";
  };

  if (errmsg != ""){
    alert(errmsg);
    result = false;
  };
  
  return result;
};

const regform = document.getElementById("register-form");
direct_validate()
regform.onsubmit = validate;

// navbar animation

const navbar = document.querySelector("nav");
var scroll_position = 0;
window.onscroll = function () {
  if (window.pageYOffset > scroll_position) {
    navbar.classList.add("scrolled");
    scroll_position = window.pageYOffset;
  }
  if (window.pageYOffset < scroll_position) {
    navbar.classList.remove("scrolled");
    scroll_position = window.pageYOffset;
  }
};

// Loading screen

function loading() {
  const LoadingPage = document.querySelector(".loading-section");
  navbar.style.visibility = "visible";
  LoadingPage.style.display = "none";
}

window.onload = loading;
