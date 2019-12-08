const cyrillicFilter = (input) => {
  if (input.value.match(/[^А-Яа-яЁе ]/)) {
    input.value = input.value.replace(/[^А-Яа-яЁе ]/, "");
  }
};

const numericFilter = (input) => {
  if (input.value.match(/[^\d]/)) {
    input.value = input.value.replace(/[^\d]/, "");
  }
};

const notEmptyValid = (input) => {
  if (input.value.trim().length) {
    input.style.border = "";
    return true;
  } else {
    input.style.border = "1px solid red";
    return false;
  }
};

export { cyrillicFilter, numericFilter, notEmptyValid };
