class ElementMakerHTML {
  /**
   * Create and initialize an new HTML element
   * @param {string} elementType - the type of element to be created. e.g. <li></li> (list item)
   * @param {string} text - The text to be embedded in the html element e.g. <li>JS101 takes...</li>
   * @param {string} parentElement - the parent element the child element belongs to e.g. <ul><li></li></ul>
   * @param {string} id - the CSS id for that html element e.g. <ul id="courseList">
   * @param {string} className - the CSS class name for an html element e.g. <button class="submitbutton">
   * @param {string} placeholder - the place holder text for an element e.g. <input placeholder="How many...">
   */
  constructor(elementType, text, parentElement, id, className, placeholder) {
    this.ele = document.createElement(elementType);
    if (text) {
      this.textNode = document.createTextNode(text);
      this.ele.appendChild(this.textNode);
    }

    this.parentElement = document.getElementById(parentElement);
    if (id) this.ele.id = id;
    if (className) this.ele.className = className;
    if (placeholder) this.ele.placeholder = placeholder;
  }

  /**
   * Append the newly created HTML element to DOM tree
   */
  appendElementToDOM() {
    this.parentElement.appendChild(this.ele);
  }
}

export {ElementMakerHTML}
