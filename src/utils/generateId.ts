const generateId = () =>
  (Math.random().toString(36) + Date.now().toString(36)).substr(2, 10);

export default generateId;
