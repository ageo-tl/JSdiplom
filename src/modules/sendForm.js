import { showPopup, hidePopup } from "./showAndHidePopup";

const statuses = {
  load: {
    msg: "Загрузка...",
    color: "SteelBlue",
  },
  ok: {
    msg: "Спасибо! Мы скоро с Вами свяжемся!",
    color: "Green",
  },
  error: {
    msg: "Что-то пошло не так...",
    color: "OrangeRed",
  },
};

const changeMessage = (elem, state) => {
  showPopup(elem, 100);
  elem.textContent = statuses[state].msg;
  elem.style.color = statuses[state].color;
};

const postData = (body) => {
  // Отправка данных с помощью fetch
  return fetch("./server.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body),
  });
};


const sendForm = (form, data) => {
  let statusMessage = document.createElement("div");
  statusMessage.classList.add("status-message");
  statusMessage.style.cssText = "font-size: 2rem; color: SteelBlue;";

  // Элемент для сообщения
  if (form.lastElementChild.matches(".status-message")) {
    statusMessage = form.lastElementChild;
  } else {
    form.appendChild(statusMessage);
  }

  // Данные из формы
  const formData = new FormData(form);
  let body = {};
  formData.forEach( (val, key) => {
    body[key] = val;
  });

  // Пользовательские (если есть)
  if (data) {
    body = Object.assign(body, data);
  }

  // Непосредственно отправка данных на сервер
  changeMessage(statusMessage, "load");
  postData(body)
    .then( (response) => {
      if (response.status !== 200) {
        throw new Error("network status is " +
          response.status + " - " + response.statusText);
      }
      changeMessage(statusMessage, "ok");
      // Очистка формы при успешном ответе сервера
      const inputes = [...form.elements].filter(
        (elem) => elem.matches("input[type=\"text\"]"));
      inputes.forEach( (elem) => {elem.value = "";});
      // Удаление сообщения
      setTimeout( () => {
        hidePopup(statusMessage);
        setTimeout( () => {
          statusMessage.remove();
        }, 500);
      }, 5000);
      // Popup формы
      const formPopup = form.closest(".popup");
      if (formPopup) {
        // Скрытие popup'а формы
        setTimeout( () => {
          hidePopup(formPopup);
        }, 3500);
        // Очистка формы .director-form (если требуется)
        if (formPopup.matches(".popup-consultation")) {
          document.querySelector("form.director-form > input").value = "";
        }
      }
    })
    .catch( (error) => {
      changeMessage(statusMessage, "error");
      console.error("Ошибка при отправке данных:", error);
    });
};

export default sendForm;
