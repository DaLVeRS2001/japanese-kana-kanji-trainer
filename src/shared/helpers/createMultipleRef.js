const createMultipleRef = ({ target, refs, targetId, callback = null }) => {
  if (callback) callback();
  refs.current[targetId - 1] = target;
};

export default createMultipleRef;
