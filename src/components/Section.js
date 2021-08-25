export default class Section {
  constructor({ data, renderer }, containerSelector) {
    this._renderedItems = data;
    this._renderer = renderer;
    this._container = containerSelector;
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
