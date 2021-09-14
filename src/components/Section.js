export default class Section {
  constructor({ renderer }, container) {
    this._renderer = renderer;
    this._container = container;
  }
  // добавляем элемент в дом
  addItem(element) {
    this._container.prepend(element);
  }
  // проходим массив
  renderItems(data) {
    data.forEach((item) => {
      this._renderer(item);
    });
  }
}
