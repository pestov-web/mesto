export default class Section {
  constructor({ data, renderer }, container) {
    this._renderedItems = data;
    this._renderer = renderer;
    this._container = container;
  }
  // добавляем элемент в дом
  addItem(element) {
    this._container.prepend(element);
  }
  // проходим массив
  renderItems() {
    this._renderedItems.forEach((item) => {
      this._renderer(item);
    });
  }
}
