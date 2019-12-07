const cyrillicFilter = (input) => {
  if (input.value.match(/[^А-Яа-яЁе ]/)) {
    input.value = input.value.replace(/[^А-Яа-яЁе ]/, "");
  }
};

const numericFilter = (input) => {
  if (input.value.match(/[^\+\d]/)) {
    input.value = input.value.replace(/[^\+\d]/, "");
  }
};

export { cyrillicFilter, numericFilter };
