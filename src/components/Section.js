export default class Section {
  constructor({ data, renderer }, placesList) {
    this._renderedItems = data;
    this._renderer = renderer;
    this._placesList = placesList;
  }
  // добавляем элемент в дом
  addItem(element) {
    this._placesList.prepend(element);
  }
  // проходим массив
  renderItems() {
    this._renderedItems.forEach((item) => {
      this._renderer(item);
    });
  }
}
