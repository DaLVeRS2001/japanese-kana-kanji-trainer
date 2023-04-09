const cancelAllAnimationFrames = () => {
  let id = window.requestAnimationFrame(function () {});
  while (id--) {
    window.cancelAnimationFrame(id);
  }
};

export default cancelAllAnimationFrames;
