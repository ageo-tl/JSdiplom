const cyrillicFilter = (input, punctuation=false) => {
  const mask = punctuation ? /[^А-Яа-яЁе ,\.!\?:;-]/ : /[^А-Яа-яЁе ]/;
  if (input.value.match(mask)) {
    input.value = input.value.replace(mask, "");
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
