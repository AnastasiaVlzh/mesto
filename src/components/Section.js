export class Section {
  constructor({ items,renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }
  renderItems() {
    this._container.innerHTML = "";
    this._renderedItems.forEach(this._renderer);
  }
  addItem(element) {
    this._container.append(element);
  }
}
  