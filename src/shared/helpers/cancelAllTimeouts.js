const cancelAllTimeouts = () => {
  let id = window.setTimeout(function () {}, 0);
  while (id--) {
    window.clearTimeout(id);
  }
};

export default cancelAllTimeouts;
