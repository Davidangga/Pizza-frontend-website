// direct validation on order form

function allow_submit() {
  const order_form = document.getElementById("order-form");
  const submit_btn = order_form.querySelector(".submit-btn");

  submit_btn.disabled = false;

  submit_btn.classList.remove("disable");
}

function disable_submit() {
  const order_form = document.getElementById("order-form");
  const submit_btn = order_form.querySelector(".submit-btn");

  submit_btn.disabled = true;

  submit_btn.classList.add("disable");
}

function order_direct_validate() {
  const order_form = document.getElementById("order-form");
  const err_msg = order_form.getElementsByClassName("err-msg");
  const phone = order_form.querySelector("#phone");
  const email = order_form.querySelector("#email2");
  const address = order_form.querySelector("#address");
  const postcode = order_form.querySelector("#postcode");
  const card = order_form.querySelector("#cards");
  const billing_address = order_form.querySelector("#billing");
  const same_as = order_form.querySelector("#same");
  const card_number = order_form.querySelector("#card-number");
  var card_limit;
  var postcode_rule = /^(0|[0-9][0-9]*)$/;
  var temp;

  // rule 1 all field souldn't be empty
  // rule 2 email is invalid if first with @ or no @
  // rule 3 same_as check box can only checked if address field is not empty
  // rule 4 depending on the card, the card_number length is vary

  phone.addEventListener("input", () => {
    if (phone.value == "") {
      err_msg[0].classList.remove("correct");
      err_msg[0].textContent = "Phone number field is empty";
    } else if (!phone.value.match(postcode_rule)) {
      err_msg[0].classList.remove("correct");
      err_msg[0].textContent = "Phone number field can only be integer";
    } else {
      err_msg[0].classList.add("correct");
    }
  });

  email.addEventListener("input", () => {
    if (email.value.indexOf("@") == 0 || email.value.indexOf("@") < 0) {
      err_msg[1].classList.remove("correct");
      err_msg[1].textContent = "Invalid email or email field is empty";
    } else {
      err_msg[1].classList.add("correct");
    }
  });

  address.addEventListener("input", () => {
    if (address.value == "") {
      err_msg[2].classList.remove("correct");
      err_msg[2].textContent = "Address field is empty";
      temp = address.value;
    } else {
      err_msg[2].classList.add("correct");
    }
  });

  postcode.addEventListener("input", () => {
    if (postcode.value == "") {
      err_msg[3].classList.remove("correct");
      err_msg[3].textContent = "Postcode field is empty";
    } else if (!postcode.value.match(postcode_rule)) {
      err_msg[3].classList.remove("correct");
      err_msg[3].textContent = "Postcode field can only be integer";
    } else if (postcode.value.length != 4) {
      err_msg[3].classList.remove("correct");
      err_msg[3].textContent = "Postcode field can only have 4 digits";
    } else {
      err_msg[3].classList.add("correct");
    }
  });

  card.addEventListener("click", () => {
    if (card.querySelector('input[type = "radio"]:checked').value == "visa") {
      console.log("visa");
      card_limit = 16;
      card_number.disabled = false;
    }
    if (card.querySelector('input[type = "radio"]:checked').value == "master") {
      console.log("master");
      card_limit = 16;
      card_number.disabled = false;
    }

    if (
      card.querySelector('input[type = "radio"]:checked').value == "american"
    ) {
      console.log("american");
      card_limit = 15;
      card_number.disabled = false;
    }
  });

  billing_address.addEventListener("input", () => {
    if (billing_address.value == "") {
      err_msg[5].classList.remove("correct");
      err_msg[5].textContent = "Billing address field is empty";
    } else {
      err_msg[5].classList.add("correct");
    }
  });

  same_as.addEventListener("click", () => {
    if (address.value == "") {
      billing_address.value = "";
      alert("Please input your address first");
      same_as.checked = false;
    } else {
      billing_address.value = "";
      billing_address.value = address.value;
    }
  });

  card_number.addEventListener("input", () => {
    if (card_number.value.length != card_limit) {
      err_msg[6].classList.remove("correct");
      err_msg[6].textContent =
        "Invalid card number, the card must have " + card_limit + " digits";
    } else {
      err_msg[6].classList.add("correct");
    }
  });
}

function validate_order(delivery, payment) {
  const order_form = document.getElementById("order-form");
  const phone = order_form.querySelector("#phone").value;
  const email = order_form.querySelector("#email2").value;
  const address = order_form.querySelector("#address").value;
  const postcode = order_form.querySelector("#postcode").value;
  const billing_address = order_form.querySelector("#billing").value;
  const card_number = order_form.querySelector("#card-number").value;
  const delivery_method = order_form
    .querySelector("#second-row")
    .querySelector('input[type = "radio"]:checked');
  const payment_method = order_form
    .querySelector("#fourth-row")
    .querySelector('input[type = "radio"]:checked');
  var card_limit;
  var postcode_rule = /^(0|[0-9][0-9]*)$/;
  var err = {
    phone_error: function () {
      if (phone == "" || !phone.match(postcode_rule)) {
        return true;
      } else {
        return false;
      }
    },
    email_error: function () {
      if (email.indexOf("@") == 0 || email.indexOf("@") < 0) {
        return true;
      } else {
        return false;
      }
    },
    address_error: function () {
      if (address == "") {
        return true;
      } else {
        return false;
      }
    },
    postcode_error: function () {
      if (
        postcode == "" ||
        !postcode.match(postcode_rule) ||
        postcode.length != 4
      ) {
        return true;
      } else {
        return false;
      }
    },
    billing_error: function () {
      if (billing_address == "") {
        return true;
      } else {
        return false;
      }
    },
    card_number_error: function () {
      if (
        card_number != "" &&
        card_number.length >= 15 &&
        card_number.length <= 16
      ) {
        return false;
      } else {
        return true;
      }
    },
    delivery_type_error: function () {
      if (delivery_method.value == "pickup") {
        return "pickup";
      } else if (delivery_method.value == "delivery") {
        return "delivery";
      }
    },
    payment_type_error: function () {
      if (payment_method.value == "pickup") {
        return "pickup";
      } else if (payment_method.value == "online") {
        return "online";
      }
    },
  };

  // allow submit for pick up and pay on pick up

  if (
    err.delivery_type_error() == "pickup" &&
    err.payment_type_error() == "pickup"
  ) {
    if (!err.phone_error() && !err.email_error()) {
      allow_submit();
    } else {
      disable_submit();
    }
  } else if (
    err.delivery_type_error() == "pickup" &&
    err.payment_type_error() == "online"
  ) {
    if (
      !err.billing_error() &&
      !err.card_number_error() &&
      !err.phone_error() &&
      !err.email_error()
    ) {
      allow_submit();
    } else {
      disable_submit();
    }
  } else if (
    err.delivery_type_error() == "delivery" &&
    err.payment_type_error() == "pickup"
  ) {
    if (
      !err.postcode_error() &&
      !err.address_error() &&
      !err.phone_error() &&
      !err.email_error()
    ) {
      allow_submit();
    } else {
      disable_submit();
    }
  } else if (
    err.delivery_type_error() == "delivery" &&
    err.payment_type_error() == "online"
  ) {
    if (
      !err.billing_error() &&
      !err.card_number_error() &&
      !err.phone_error() &&
      !err.email_error() &&
      !err.postcode_error() &&
      !err.address_error()
    ) {
      allow_submit();
    } else {
      disable_submit();
    }
  }
  // allow submit for pick up and pay online
}

function init() {
  const order_form = document.getElementById("order-form");
  const second_row = order_form.querySelector("#second-row");
  const fourth_row = order_form.querySelector("#fourth-row");
  const delivery_extend = order_form.querySelector("#third-row");
  const payment_extend = [
    order_form.querySelector("#cards"),
    order_form.querySelector("#fifth-row"),
    order_form.querySelector("#sixth-row"),
  ];
  var delivery;
  var payment;

  second_row.addEventListener("click", () => {
    const delivery_method = second_row.querySelector(
      'input[type = "radio"]:checked'
    );
    if (delivery_method.value == "delivery") {
      delivery_extend.style.display = "flex";
      delivery_extend.querySelector("#address").disabled = false;
      delivery_extend.querySelector("#postcode").disabled = false;
    } else {
      delivery_extend.style.display = "none";
      delivery_extend.querySelector("#address").disabled = true;
      delivery_extend.querySelector("#postcode").disabled = true;
    }
    delivery = delivery_method.value;
  });

  fourth_row.addEventListener("click", () => {
    const payment_method = fourth_row.querySelector(
      'input[type = "radio"]:checked'
    );
    if (payment_method.value == "online") {
      payment_extend[0].style.display = "flex";
      payment_extend[1].style.display = "inline";
      payment_extend[2].style.display = "inline";
      payment_extend[1].querySelector("#billing").disabled = false;
    } else {
      payment_extend[0].style.display = "none";
      payment_extend[1].style.display = "none";
      payment_extend[2].style.display = "none";
      payment_extend[1].querySelector("#billing").disabled = true;
      payment_extend[2].querySelector("#card-number").disabled = true;
    }
    payment = payment_method.value;
  });

  order_direct_validate();
  order_form.addEventListener("input", validate_order);
}

init();
