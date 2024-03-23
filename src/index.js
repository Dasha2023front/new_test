import "./styles/main.scss";

const btn = document.querySelector(".dropdown__button");
const dropdownList = document.querySelector(".dropdown__list");
const listItems = document.querySelectorAll(".dropdown__list-item");
const inputHidden = document.querySelector(".dropdown__input-hidden");
const phone = document.querySelector("#telField");

btn.addEventListener("click", () => {
  dropdownList.classList.toggle("dropdown__list-visible");
  btn.classList.toggle("active");
});

// отправка формы

const submitBtn = document.querySelector(".submit__button");
const f = document.querySelector(".f__form");
console.log(f);

f.addEventListener("submit", function (e) {
  e.preventDefault();
  const data = new FormData(this);
  const url = "https://jsonplaceholder.typicode.com/posts";
  fetch(url, {
    method: "post",
    headers: {
      "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
    body: data,
  })
    .then((response) => response.json())
    .then((json) => {
      if (json.id === 101) {
        submitBtn.innerText = "Отправлено";
      }
      console.log(json);
    })
    .catch((err) => console.log(err));
});

// Выбор элементов списка, запоминание выбранного значения, закрытие списка

listItems.forEach((listItem) => {
  listItem.addEventListener("click", (e) => {
    e.stopPropagation();
    let target = e.target;
    console.log(target);
    document.querySelector(".dropdown__city").innerText = target.innerText;
    document.querySelector(".dropdown__button").focus();
    inputHidden.value = target.dataset.value;
    dropdownList.classList.remove("dropdown__list-visible");
    btn.classList.remove("dropdown__button-active");
  });
});

// Закрытие дропдауна по клику вне списка

document.addEventListener("click", (e) => {
  if (e.target !== btn) {
    dropdownList.classList.remove("dropdown__list-visible");
    btn.classList.remove("dropdown__button-active");
  }
});

const width = window.matchMedia("(max-width: 560px)");

const setPattern = () => {
  if (window.innerWidth < 560) {
    phone.removeAttribute("pattern");
  } else {
    phone.setAttribute("pattern", "[\+]\d{1}\s[\(]\d{3}[\)]\s\d{3}[\-]\d{2}[\-]\d{2}");
  }
};
setPattern();

width.addEventListener("change", (e) => {
  setPattern(e.matches);
});
