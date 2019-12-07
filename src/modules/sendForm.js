import { hidePopup } from "./showAndHidePopup";

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
  const errorMessage = "Что-то пошло не так...",
        loadMessage = "Загрузка...",
        succesMessage = "Спасибо! Мы скоро с Вами свяжемся!";
  let statusMessage = document.createElement("div");
  statusMessage.classList.add("status-message");
  statusMessage.style.cssText = "font-size: 2rem; color: SteelBlue;";

  // Элемент для сообщения
  if (form.lastElementChild.matches(".status-message")) {
    statusMessage = form.lastElementChild;
    statusMessage.textContent = loadMessage;
    statusMessage.style.color = "SteelBlue";
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
  statusMessage.textContent = loadMessage;
  postData(body)
    .then( (response) => {
      if (response.status !== 200) {
        throw new Error("network status is " +
          response.status + " - " + response.statusText);
      }
      statusMessage.style.color = "Green";
      statusMessage.textContent = succesMessage;
      // Очистка формы при успешном ответе сервера
      const inputes = [...form.elements].filter(
        (elem) => !elem.matches("button, input[type=\"button\"]"));
      inputes.forEach( (elem) => {elem.value = "";});
      // Popup формы
      const formPopup = form.closest(".popup");
      if (formPopup) {
        // Скрытие popup'а формы
        setTimeout( () => {
          hidePopup(formPopup);
        }, 3500);
      }
    })
    .catch( (error) => {
      statusMessage.style.color = "OrangeRed";
      statusMessage.textContent = errorMessage;
      console.error("Ошибка при отправке данных:", error);
    });
};

export default sendForm;
