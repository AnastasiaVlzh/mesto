export class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(items){ 
    items.forEach(item => {
      this._renderer(item)
    });
  };
  
  addItem(item) {
    this._container.append(item);
  }

  addCardToTheBeginning(element) {
    this._container.prepend(element);
  }
}
  