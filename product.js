/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/consts.js":
/*!***********************!*\
  !*** ./src/consts.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MEASURES": () => (/* binding */ MEASURES)
/* harmony export */ });
const MEASURES = ['гр.', 'шт.'];


/***/ }),

/***/ "./src/presenter/product-list.js":
/*!***************************************!*\
  !*** ./src/presenter/product-list.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ProductList)
/* harmony export */ });
/* harmony import */ var _view_product__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../view/product */ "./src/view/product.js");
/* harmony import */ var _view_add_product_form__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../view/add-product-form */ "./src/view/add-product-form.js");
/* harmony import */ var _utils_render__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/render */ "./src/utils/render.js");
/* harmony import */ var _utils_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/common */ "./src/utils/common.js");





class ProductList {
  constructor(container, changeData) {
    this._container = container;

    this._removeProductClickHandler = this._removeProductClickHandler.bind(this);
    this._addProductClickHandler = this._addProductClickHandler.bind(this);

    this._productComponentList = {};
    this._changeData = changeData;

    this._addProductFormComponent = new _view_add_product_form__WEBPACK_IMPORTED_MODULE_1__["default"]();
  }

  init(products) {
    this._products = products;

    this._clearList();
    this._renderList();
    this._renderAddProductForm();
  }

  _renderList() {
    this._products.forEach((product) => {
      if (product.isDeleted) {
        return;
      }
      const productComponent = new _view_product__WEBPACK_IMPORTED_MODULE_0__["default"](product);
      productComponent.setRemoveClickHandler(this._removeProductClickHandler);
      this._productComponentList[product.id] = productComponent;
      (0,_utils_render__WEBPACK_IMPORTED_MODULE_2__.render)(this._container, productComponent, _utils_render__WEBPACK_IMPORTED_MODULE_2__.RenderPosition.BEFOREEND);
    });
  }

  _renderAddProductForm() {
    this._addProductFormComponent.setAddClickHandler(this._addProductClickHandler);
    (0,_utils_render__WEBPACK_IMPORTED_MODULE_2__.render)(this._container, this._addProductFormComponent, _utils_render__WEBPACK_IMPORTED_MODULE_2__.RenderPosition.BEFOREEND);
  }

  _clearList() {
    Object
      .values(this._productComponentList)
      .forEach((product) => (0,_utils_render__WEBPACK_IMPORTED_MODULE_2__.remove)(product));
    this._productComponentList = {};

    (0,_utils_render__WEBPACK_IMPORTED_MODULE_2__.remove)(this._addProductFormComponent);
  }

  _removeProductClickHandler(product) {
    this._changeData((0,_utils_common__WEBPACK_IMPORTED_MODULE_3__.updateItem)(this._products, product));
  }

  _addProductClickHandler(product) {
    this._changeData((0,_utils_common__WEBPACK_IMPORTED_MODULE_3__.addItem)(this._products, product));
  }
}


/***/ }),

/***/ "./src/utils/common.js":
/*!*****************************!*\
  !*** ./src/utils/common.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addItem": () => (/* binding */ addItem),
/* harmony export */   "random": () => (/* binding */ random),
/* harmony export */   "randomElementFromArray": () => (/* binding */ randomElementFromArray),
/* harmony export */   "randomInt": () => (/* binding */ randomInt),
/* harmony export */   "removeItem": () => (/* binding */ removeItem),
/* harmony export */   "updateItem": () => (/* binding */ updateItem)
/* harmony export */ });
//Native ES6
const random = (a = 1, b = 0) => {
  const lower = Math.min(a, b);
  const upper = Math.max(a, b);
  return lower + Math.random() * (upper - lower);
};

const randomInt = (a = 1, b = 0) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const randomElementFromArray = (array) => (
  array[randomInt(0, array.length - 1)]
);

const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};

const addItem = (items, newItem) => {
  return [...items, newItem];
};

const removeItem = (items, remove) => {
  const index = items.findIndex(({id}) => id === remove.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    ...items.slice(index + 1)
  ];
};


/***/ }),

/***/ "./src/utils/render.js":
/*!*****************************!*\
  !*** ./src/utils/render.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RenderPosition": () => (/* binding */ RenderPosition),
/* harmony export */   "createElement": () => (/* binding */ createElement),
/* harmony export */   "remove": () => (/* binding */ remove),
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "renderTemplate": () => (/* binding */ renderTemplate),
/* harmony export */   "replace": () => (/* binding */ replace)
/* harmony export */ });
/* harmony import */ var _view_abstract__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../view/abstract */ "./src/view/abstract.js");


const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

const render = (container, child, place) => {
  if (container instanceof _view_abstract__WEBPACK_IMPORTED_MODULE_0__["default"]) {
    container = container.getElement();
  }

  if (child instanceof _view_abstract__WEBPACK_IMPORTED_MODULE_0__["default"]) {
    child = child.getElement();
  }

  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(child);
      break;
    case RenderPosition.BEFOREEND:
      container.append(child);
      break;
  }
};

const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstChild;
};

const replace = (newChild, oldChild) => {
  if (oldChild instanceof _view_abstract__WEBPACK_IMPORTED_MODULE_0__["default"]) {
    oldChild = oldChild.getElement();
  }

  if (newChild instanceof _view_abstract__WEBPACK_IMPORTED_MODULE_0__["default"]) {
    newChild = newChild.getElement();
  }

  const parent = oldChild.parentElement;

  if (parent === null || oldChild === null || newChild === null) {
    throw new Error('Can\'t replace unesisting elements');
  }

  parent.replaceChild(newChild, oldChild);
}

const remove = (component) => {
  if (!(component instanceof _view_abstract__WEBPACK_IMPORTED_MODULE_0__["default"])) {
    throw new Error('Can remove only components');
  }

  component.getElement().remove();
  component.removeElement();
};

const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};




/***/ }),

/***/ "./src/view/abstract.js":
/*!******************************!*\
  !*** ./src/view/abstract.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Abstract)
/* harmony export */ });
/* harmony import */ var _utils_render__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/render */ "./src/utils/render.js");


class Abstract {
  constructor() {
    if (new.target === 'Abstract') {
      throw new Error('Can\'t instantiate Abstract, only concrete one.');
    }

    this._element = null;
    this._callback = {};
  }

  getTemplate() {
    throw new Error('Method not implemented: getTemplate');
  }

  getElement() {
    if (this._element === null) {
      this._element = (0,_utils_render__WEBPACK_IMPORTED_MODULE_0__.createElement)(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}


/***/ }),

/***/ "./src/view/add-product-form.js":
/*!**************************************!*\
  !*** ./src/view/add-product-form.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AddProductForm)
/* harmony export */ });
/* harmony import */ var _abstract__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract */ "./src/view/abstract.js");
/* harmony import */ var _consts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../consts */ "./src/consts.js");
/* harmony import */ var nanoid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! nanoid */ "./.yarn/cache/nanoid-npm-3.3.4-3d250377d6-2fddd6dee9.zip/node_modules/nanoid/index.browser.js");




const createAddProductFormTemplate = () => {
  const optionsTemplate = _consts__WEBPACK_IMPORTED_MODULE_1__.MEASURES.reduce((result, item) => result += `<option value="${item}">${item}</option>`, '');

  return `<form class="add-product-form">
    <div class="form-field">
      <label for="title">Название</label>
      <input type="text" name="title" placeholder="Название" autocomplete="off">
    </div>

    <div class="form-field">
      <label for="energy">Калории</label>
      <input type="number" name="energy" placeholder="Калории" inputmode="numeric">
    </div>

    <div class="form-field">
      <label for="protein">Белки</label>
      <input type="number" name="protein" placeholder="Белки" inputmode="numeric">
    </div>

    <div class="form-field">
      <label for="fat">Жиры</label>
      <input type="number" name="fat" placeholder="Жиры" inputmode="numeric">
    </div>

    <div class="form-field">
      <label for="carb">Углеводы</label>
      <input type="number" name="carb" placeholder="Углеводы" inputmode="numeric">
    </div>

    <div class="form-field">
      <label for="measure">Единицы</label>
      <select name="measure">
        ${optionsTemplate}
      </select>
    </div>

    <div class="form-field">
      <label for="count">Кол-во</label>
      <input type="number" name="count" placeholder="Кол-во" value="1" inputmode="numeric">
    </div>
    <button type="submit" class="btn btn-success btn-save">Добавить</button>
  </form>`;
};

class AddProductForm extends _abstract__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super();

    this._addClickHandler = this._addClickHandler.bind(this);
  }

  getTemplate() {
    return createAddProductFormTemplate();
  }

  _addClickHandler(evt) {
    evt.preventDefault();
    const titleElement = this.getElement().querySelector('input[name="title"]');
    const energyElement = this.getElement().querySelector('input[name="energy"]');
    const proteinElement = this.getElement().querySelector('input[name="protein"]');
    const fatElement = this.getElement().querySelector('input[name="fat"]');
    const carbElement = this.getElement().querySelector('input[name="carb"]');
    const measureElement = this.getElement().querySelector('select[name="measure"]');
    const countElement = this.getElement().querySelector('input[name="count"]');

    if (titleElement.value === '' ||
    energyElement.value === '' || proteinElement.value === '' || fatElement.value === '' || carbElement.value === '' || countElement.value === '') {
      alert('Заполните все поля!');
      return;
    }

    const newProduct = {
      id: (0,nanoid__WEBPACK_IMPORTED_MODULE_2__.nanoid)(),
      title: titleElement.value,
      energy: parseInt(energyElement.value),
      protein: parseInt(proteinElement.value),
      fat: parseInt(fatElement.value),
      carb: parseInt(carbElement.value),
      measure: measureElement.value,
      measureCount: parseInt(countElement.value),
      isVisible: true,
    };

    this._callback.addClick(newProduct);
  }

  setAddClickHandler(callback) {
    this._callback.addClick = callback;
    const addButton = this.getElement().querySelector('.btn-save');
    addButton.addEventListener('click', this._addClickHandler);
  }
}


/***/ }),

/***/ "./src/view/product.js":
/*!*****************************!*\
  !*** ./src/view/product.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Product)
/* harmony export */ });
/* harmony import */ var _abstract__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract */ "./src/view/abstract.js");


const createProductTemplate = (product) => {
  const { id, title, energy, protein, fat, carb, measure, measureCount } = product;
  return `<li class="product-item" data-id="${id}">
    <div class="product-top">
      <h3 class="product-title">${title}</h3>
      <div class="product-count">
        <span>${measureCount}</span> ${measure}
      </div>
    </div>

    <div class="product-bottom">
      <table class="product-info-table">
        <tr>
          <th>Калории</th>
          <th>Белки</th>
          <th>Жиры</th>
          <th>Углеводы</th>
        </tr>
        <tr>
          <td>${energy}</td>
          <td>${protein}</td>
          <td>${fat}</td>
          <td>${carb}</td>
        </tr>
      </table>

      <div class="controls">
        <button class="btn btn-remove"></button>
      </div>
    </div>
  </li>`;
};

class Product extends _abstract__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(product) {
    super();

    this._product = product;

    this._removeClickHandler = this._removeClickHandler.bind(this);
  }

  getTemplate() {
    return createProductTemplate(this._product);
  }

  _removeClickHandler(evt) {
    evt.preventDefault();
    const changedProduct = Object.assign({}, this._product, {isDeleted: true});
    this._callback.removeClick(changedProduct);
  }

  setRemoveClickHandler(callback) {
    this._callback.removeClick = callback;
    const removeButton = this.getElement().querySelector('.btn-remove');
    removeButton.addEventListener('click', this._removeClickHandler);
  }
}


/***/ }),

/***/ "./.yarn/cache/nanoid-npm-3.3.4-3d250377d6-2fddd6dee9.zip/node_modules/nanoid/index.browser.js":
/*!*****************************************************************************************************!*\
  !*** ./.yarn/cache/nanoid-npm-3.3.4-3d250377d6-2fddd6dee9.zip/node_modules/nanoid/index.browser.js ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "customAlphabet": () => (/* binding */ customAlphabet),
/* harmony export */   "customRandom": () => (/* binding */ customRandom),
/* harmony export */   "nanoid": () => (/* binding */ nanoid),
/* harmony export */   "random": () => (/* binding */ random),
/* harmony export */   "urlAlphabet": () => (/* reexport safe */ _url_alphabet_index_js__WEBPACK_IMPORTED_MODULE_0__.urlAlphabet)
/* harmony export */ });
/* harmony import */ var _url_alphabet_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./url-alphabet/index.js */ "./.yarn/cache/nanoid-npm-3.3.4-3d250377d6-2fddd6dee9.zip/node_modules/nanoid/url-alphabet/index.js");

let random = bytes => crypto.getRandomValues(new Uint8Array(bytes))
let customRandom = (alphabet, defaultSize, getRandom) => {
  let mask = (2 << (Math.log(alphabet.length - 1) / Math.LN2)) - 1
  let step = -~((1.6 * mask * defaultSize) / alphabet.length)
  return (size = defaultSize) => {
    let id = ''
    while (true) {
      let bytes = getRandom(step)
      let j = step
      while (j--) {
        id += alphabet[bytes[j] & mask] || ''
        if (id.length === size) return id
      }
    }
  }
}
let customAlphabet = (alphabet, size = 21) =>
  customRandom(alphabet, size, random)
let nanoid = (size = 21) =>
  crypto.getRandomValues(new Uint8Array(size)).reduce((id, byte) => {
    byte &= 63
    if (byte < 36) {
      id += byte.toString(36)
    } else if (byte < 62) {
      id += (byte - 26).toString(36).toUpperCase()
    } else if (byte > 62) {
      id += '-'
    } else {
      id += '_'
    }
    return id
  }, '')



/***/ }),

/***/ "./.yarn/cache/nanoid-npm-3.3.4-3d250377d6-2fddd6dee9.zip/node_modules/nanoid/url-alphabet/index.js":
/*!**********************************************************************************************************!*\
  !*** ./.yarn/cache/nanoid-npm-3.3.4-3d250377d6-2fddd6dee9.zip/node_modules/nanoid/url-alphabet/index.js ***!
  \**********************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "urlAlphabet": () => (/* binding */ urlAlphabet)
/* harmony export */ });
let urlAlphabet =
  'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict'



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!************************!*\
  !*** ./src/product.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _presenter_product_list__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./presenter/product-list */ "./src/presenter/product-list.js");



let products = [];

if (localStorage.getItem('products')) {
  products = JSON.parse(localStorage.getItem('products'));
}

const changeData = (updatedData) => {
  localStorage.setItem('products', JSON.stringify(updatedData));
  productListPresenter.init(updatedData);
};

const mainElement = document.querySelector('.main');
const productListPresenter = new _presenter_product_list__WEBPACK_IMPORTED_MODULE_0__["default"](mainElement, changeData);
productListPresenter.init(products);

})();

/******/ })()
;
//# sourceMappingURL=product.js.map