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

/***/ "./src/mock/chunk.js":
/*!***************************!*\
  !*** ./src/mock/chunk.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generateChunk": () => (/* binding */ generateChunk)
/* harmony export */ });
/* harmony import */ var _utils_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/common */ "./src/utils/common.js");
/* harmony import */ var nanoid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! nanoid */ "./.yarn/cache/nanoid-npm-3.3.4-3d250377d6-2fddd6dee9.zip/node_modules/nanoid/index.browser.js");



const TITLES = ['Завтрак', 'Обед', 'Перекус', 'Ужин', 'Поздний ужин'];

const generateIngredient = (productId) => ({
  id: (0,nanoid__WEBPACK_IMPORTED_MODULE_1__.nanoid)(),
  productId,
  count: (0,_utils_common__WEBPACK_IMPORTED_MODULE_0__.randomInt)(20, 250),
});

// te

const generateIngredientList = (products) => {
  const {id} = (0,_utils_common__WEBPACK_IMPORTED_MODULE_0__.randomElementFromArray)(products);

  return new Array((0,_utils_common__WEBPACK_IMPORTED_MODULE_0__.randomInt)(2, 5)).fill(null).map(() => generateIngredient(id));
};

const computeAmount = (ingredients, products) => {
  const amount = {
    energy: 0,
    protein: 0,
    fat: 0,
    carb: 0,
  };

  ingredients.forEach(({ productId }) => {
    const product = products.find(({id}) => id === productId);
    const { energy, protein, fat, carb } = product;

    amount.energy += energy;
    amount.protein += protein;
    amount.fat += fat;
    amount.carb += carb;
  });

  return amount;
};

const generateChunk = (products) => {
  const components = generateIngredientList(products);

  return {
    id: (0,nanoid__WEBPACK_IMPORTED_MODULE_1__.nanoid)(),
    title: (0,_utils_common__WEBPACK_IMPORTED_MODULE_0__.randomElementFromArray)(TITLES),
    amount: computeAmount(components, products),
    ingredients: generateIngredientList(products),
  };
};


/***/ }),

/***/ "./src/mock/product.js":
/*!*****************************!*\
  !*** ./src/mock/product.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generateProduct": () => (/* binding */ generateProduct)
/* harmony export */ });
/* harmony import */ var _utils_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/common */ "./src/utils/common.js");
/* harmony import */ var nanoid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! nanoid */ "./.yarn/cache/nanoid-npm-3.3.4-3d250377d6-2fddd6dee9.zip/node_modules/nanoid/index.browser.js");
/* harmony import */ var _consts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../consts */ "./src/consts.js");





const TITLES = ['Лук', 'Морковь', 'Чеснок',	'Куриное бедро', 'Капуста', 'Кетчуп', 'Кабачок'];



const generateProduct = () => ({
  id: (0,nanoid__WEBPACK_IMPORTED_MODULE_2__.nanoid)(),
  title: (0,_utils_common__WEBPACK_IMPORTED_MODULE_0__.randomElementFromArray)(TITLES),
  energy: (0,_utils_common__WEBPACK_IMPORTED_MODULE_0__.randomInt)(50, 200),
  protein: (0,_utils_common__WEBPACK_IMPORTED_MODULE_0__.randomInt)(2, 21),
  fat: (0,_utils_common__WEBPACK_IMPORTED_MODULE_0__.randomInt)(1, 15),
  carb: (0,_utils_common__WEBPACK_IMPORTED_MODULE_0__.randomInt)(50, 230),
  measure: (0,_utils_common__WEBPACK_IMPORTED_MODULE_0__.randomElementFromArray)(_consts__WEBPACK_IMPORTED_MODULE_1__.MEASURES),
  measureCount: 1,
});


/***/ }),

/***/ "./src/presenter/chunk-list.js":
/*!*************************************!*\
  !*** ./src/presenter/chunk-list.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ChunkList)
/* harmony export */ });
/* harmony import */ var _utils_render__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/render */ "./src/utils/render.js");
/* harmony import */ var _utils_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/common */ "./src/utils/common.js");
/* harmony import */ var _utils_chunk__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/chunk */ "./src/utils/chunk.js");
/* harmony import */ var _view_chunk_list__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../view/chunk-list */ "./src/view/chunk-list.js");
/* harmony import */ var _view_add_chunk_form__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../view/add-chunk-form */ "./src/view/add-chunk-form.js");
/* harmony import */ var _presenter_chunk__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../presenter/chunk */ "./src/presenter/chunk.js");








class ChunkList {
  constructor(container, changeData, removeData) {
    this._container = container;
    this._changeData = changeData;
    this._chunkPresenter = {};

    this._chunkListComponent = new _view_chunk_list__WEBPACK_IMPORTED_MODULE_3__["default"]();
    this._addChunkFormComponent = new _view_add_chunk_form__WEBPACK_IMPORTED_MODULE_4__["default"]();

    this._chunkUpdateHandler = this._chunkUpdateHandler.bind(this);
  }

  init(chunks, products) {
    this._chunks = chunks;
    this._products = products;

    this._clearList();

    this._renderChunkList();

    this._renderAddChunkForm();
  }

  _clearList() {
    Object
      .values(this._chunkPresenter)
      .forEach((presenter) => presenter.destroy())
    this._chunkPresenter = {};

    (0,_utils_render__WEBPACK_IMPORTED_MODULE_0__.remove)(this._addChunkFormComponent);
  }

  _renderChunk(chunk) {
    const chunkPresenter = new _presenter_chunk__WEBPACK_IMPORTED_MODULE_5__["default"](this._chunkListComponent, this._chunkUpdateHandler);
    chunkPresenter.init(chunk, this._products);
    this._chunkPresenter[chunk.id] = chunkPresenter;
  }

  _renderChunkList() {
    (0,_utils_render__WEBPACK_IMPORTED_MODULE_0__.render)(this._container, this._chunkListComponent, _utils_render__WEBPACK_IMPORTED_MODULE_0__.RenderPosition.BEFOREEND);

    this._chunks.forEach((chunk) => this._renderChunk(chunk));
  }

  _renderAddChunkForm() {
    (0,_utils_render__WEBPACK_IMPORTED_MODULE_0__.render)(this._chunkListComponent, this._addChunkFormComponent, _utils_render__WEBPACK_IMPORTED_MODULE_0__.RenderPosition.BEFOREEND);

    this._addChunkFormComponent.setClickButtonHandler((title) => this._addChunkHandler(title));
  }

  // Handlers
  _chunkUpdateHandler(updatedData, action = 'update') {
    switch (action) {
      case 'update':
        this._changeData((0,_utils_common__WEBPACK_IMPORTED_MODULE_1__.updateItem)(this._chunks, updatedData));
        break;
      case 'remove':
        this._changeData((0,_utils_common__WEBPACK_IMPORTED_MODULE_1__.removeItem)(this._chunks, updatedData));
        break;
    }
  }

  _addChunkHandler(title) {
    // Add chunk
    this._changeData((0,_utils_common__WEBPACK_IMPORTED_MODULE_1__.addItem)(this._chunks, (0,_utils_chunk__WEBPACK_IMPORTED_MODULE_2__.createChunk)(title)));
  }
}


/***/ }),

/***/ "./src/presenter/chunk.js":
/*!********************************!*\
  !*** ./src/presenter/chunk.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Chunk)
/* harmony export */ });
/* harmony import */ var _utils_chunk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/chunk */ "./src/utils/chunk.js");
/* harmony import */ var _utils_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/common */ "./src/utils/common.js");
/* harmony import */ var _utils_render__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/render */ "./src/utils/render.js");
/* harmony import */ var _view_chunk__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../view/chunk */ "./src/view/chunk.js");
/* harmony import */ var _view_ingredient__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../view/ingredient */ "./src/view/ingredient.js");
/* harmony import */ var _view_ingredient_edit__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../view/ingredient-edit */ "./src/view/ingredient-edit.js");








class Chunk {
  constructor(container, changeData) {
    this._container = container;
    this._changeData = changeData;

    this._chunkComponent = null;
    this._ingredientComponentList = {};

    this._addIngredientClickHandler = this._addIngredientClickHandler.bind(this);
    this._removeChunkClickHandler = this._removeChunkClickHandler.bind(this);
    this._editIngredientClickHandler = this._editIngredientClickHandler.bind(this);
    this._removeIngredientClickHandler = this._removeIngredientClickHandler.bind(this);
    this._saveIngredientClickHandler = this._saveIngredientClickHandler.bind(this);
    this._cancelIngredientClickHandler = this._cancelIngredientClickHandler.bind(this);
  }

  init(chunk, products) {
    this._chunk = chunk;
    this._products = products;

    this._editIngredientComponent = null;

    this._renderChunk();
  }

  destroy() {
    Object
      .values(this._ingredientComponentList)
      .forEach((ingredientComponent) => (0,_utils_render__WEBPACK_IMPORTED_MODULE_2__.remove)(ingredientComponent));
    this._ingredientComponentList = {};
    (0,_utils_render__WEBPACK_IMPORTED_MODULE_2__.remove)(this._chunkComponent);
  }

  _renderChunk() {
    // Render chunk
    this._chunkComponent = new _view_chunk__WEBPACK_IMPORTED_MODULE_3__["default"](this._chunk);
    this._chunkComponent.setAddClickHandler(this._addIngredientClickHandler);
    this._chunkComponent.setRemoveClickHandler(this._removeChunkClickHandler);
    (0,_utils_render__WEBPACK_IMPORTED_MODULE_2__.render)(this._container, this._chunkComponent, _utils_render__WEBPACK_IMPORTED_MODULE_2__.RenderPosition.BEFOREEND);

    // Render ingredients
    this._chunk.ingredients.forEach((ingredient) => {
      this._renderIngredient(ingredient);
    });
  }

  _renderIngredient(ingredient) {
    const ingredientComponent = new _view_ingredient__WEBPACK_IMPORTED_MODULE_4__["default"](ingredient, this._products);
    ingredientComponent.setEditClickHandler(this._editIngredientClickHandler);
    ingredientComponent.setRemoveClickHandler(this._removeIngredientClickHandler);
    (0,_utils_render__WEBPACK_IMPORTED_MODULE_2__.render)(this._chunkComponent, ingredientComponent, _utils_render__WEBPACK_IMPORTED_MODULE_2__.RenderPosition.BEFOREEND);
    this._ingredientComponentList[ingredient.id] = ingredientComponent;
  }

  // Handlers
  _addIngredientClickHandler() {
    if (this._products.length === 0) {
      alert('Список продуктов пуст! Сначала нужно заполнить его!');
      return;
    }
    const newIngredient = (0,_utils_chunk__WEBPACK_IMPORTED_MODULE_0__.createIngredient)();
    this._chunk.ingredients = (0,_utils_common__WEBPACK_IMPORTED_MODULE_1__.addItem)(this._chunk.ingredients, newIngredient);
    this._changeData(this._chunk);
  }

  _removeChunkClickHandler() {
    this._changeData(this._chunk, 'remove');
  }

  _editIngredientClickHandler(ingredient) {
    this._replaceToEdit(ingredient);
  }

  _replaceToEdit(ingredient) {
    if (this._editIngredientComponent) {
      this._changeData(this._chunk);
      return;
    }

    this._editIngredientComponent = new _view_ingredient_edit__WEBPACK_IMPORTED_MODULE_5__["default"](ingredient, this._products);
    this._editIngredientComponent.setSaveClickHandler(this._saveIngredientClickHandler);
    this._editIngredientComponent.setCancelClickHandler(this._cancelIngredientClickHandler);

    const ingredientComponent = this._ingredientComponentList[ingredient.id];

    (0,_utils_render__WEBPACK_IMPORTED_MODULE_2__.replace)(this._editIngredientComponent, ingredientComponent);
    (0,_utils_render__WEBPACK_IMPORTED_MODULE_2__.remove)(ingredientComponent);
    this._ingredientComponentList[ingredient.id] = this._editIngredientComponent;
  }

  _replaceFromEdit(ingredient) {
    const ingredientComponent = new _view_ingredient__WEBPACK_IMPORTED_MODULE_4__["default"](ingredient, this._products);ingredientComponent.setEditClickHandler(this._editIngredientClickHandler);
    ingredientComponent.setRemoveClickHandler(this._removeIngredientClickHandler);

    (0,_utils_render__WEBPACK_IMPORTED_MODULE_2__.replace)(ingredientComponent, this._editIngredientComponent);
    (0,_utils_render__WEBPACK_IMPORTED_MODULE_2__.remove)(this._editIngredientComponent);
    this._ingredientComponentList[ingredient.id] = ingredientComponent;

    this._editIngredientComponent = null;
  }

  _removeIngredientClickHandler(ingredient) {
    this._chunk.ingredients = (0,_utils_common__WEBPACK_IMPORTED_MODULE_1__.removeItem)(this._chunk.ingredients, ingredient);
    this._changeData(this._chunk);
  }

  _saveIngredientClickHandler(ingredient) {
    this._chunk.ingredients = (0,_utils_common__WEBPACK_IMPORTED_MODULE_1__.updateItem)(this._chunk.ingredients, ingredient);
    this._changeData(this._chunk);
  }

  _cancelIngredientClickHandler(ingredient) {
    this._replaceFromEdit(ingredient);
  }
}


/***/ }),

/***/ "./src/utils/chunk.js":
/*!****************************!*\
  !*** ./src/utils/chunk.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "computeAmount": () => (/* binding */ computeAmount),
/* harmony export */   "createChunk": () => (/* binding */ createChunk),
/* harmony export */   "createIngredient": () => (/* binding */ createIngredient),
/* harmony export */   "createProduct": () => (/* binding */ createProduct)
/* harmony export */ });
/* harmony import */ var nanoid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nanoid */ "./.yarn/cache/nanoid-npm-3.3.4-3d250377d6-2fddd6dee9.zip/node_modules/nanoid/index.browser.js");


const createChunk = (title) => ({
  id: (0,nanoid__WEBPACK_IMPORTED_MODULE_0__.nanoid)(),
  title: title,
  amount: {
    energy: 0,
    protein: 0,
    fat: 0,
    carb: 0,
  },
  ingredients: [],
});

const createIngredient = () => ({
  id: (0,nanoid__WEBPACK_IMPORTED_MODULE_0__.nanoid)(),
  productId: -1,
  count: 0,
});

const computeAmount = (ingredients, products) => {
  const amount = {
    energy: 0,
    protein: 0,
    fat: 0,
    carb: 0,
  };

  // if (ingredients !== null)
  ingredients.forEach((ingredient) => {
    const product = products.find((product) => product.id === ingredient.productId) || products[0];
    const { energy, protein, fat, carb } = product;
    const count = ingredient.count || 0;

    amount.energy += product.measureCount * energy * count / 100; // * кол-во грамм в штуке или на 1
    amount.protein += product.measureCount * protein * count / 100;
    amount.fat += product.measureCount * fat * count / 100;
    amount.carb += product.measureCount * carb * count / 100;
  });

  amount.energy = Math.round(amount.energy);
  amount.protein = Math.round(amount.protein);
  amount.fat = Math.round(amount.fat);
  amount.carb = Math.round(amount.carb);

  return amount;
};

const createProduct = (title, energy, protein, fat, carb, measure, measureCount = 1) => {
  return {
    id: (0,nanoid__WEBPACK_IMPORTED_MODULE_0__.nanoid)(),
    title,
    energy,
    protein,
    fat,
    carb,
    measure,
    measureCount,
    isDeleted: false,
  };
};


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

/***/ "./src/view/add-chunk-form.js":
/*!************************************!*\
  !*** ./src/view/add-chunk-form.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AddChunkForm)
/* harmony export */ });
/* harmony import */ var _abstract__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract */ "./src/view/abstract.js");


const createAddChunkFormTemplate = () => `<form class="add-chunk-form">
  <input type="text" class="form-input" placeholder="Введите название группы">
  <button type="submit" class="btn btn-chunk btn-success">Добавить группу</button>
</form>`;

class AddChunkForm extends _abstract__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super();

    this._clickButtonHandler = this._clickButtonHandler.bind(this);
  }

  getTemplate() {
    return createAddChunkFormTemplate();
  }

  _clickButtonHandler(evt) {
    evt.preventDefault();
    const title = this.getElement().querySelector('.form-input').value;
    this._callback.clickButton(title);
  }

  setClickButtonHandler(callback) {
    this._callback.clickButton = callback;
    this.getElement().addEventListener('submit', this._clickButtonHandler);
  }
}


/***/ }),

/***/ "./src/view/amount.js":
/*!****************************!*\
  !*** ./src/view/amount.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Amount)
/* harmony export */ });
/* harmony import */ var _abstract__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract */ "./src/view/abstract.js");


const createAmountTemplate = (amount = {}) => {
  const {
    energy = 0,
    protein = 0,
    fat = 0,
    carb = 0,
  } = amount;
  return `<div class="amount">
    <div class="amount-energy">Калории: ${energy}</div>
    <div class="amount-protein">Белки: ${protein}</div>
    <div class="amount-fat">Жиры: ${fat}</div>
    <div class="amount-carb">Углеводы: ${carb}</div>
  </div>`;
};

class Amount extends _abstract__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(amount) {
    super();

    this._amount = amount;
  }
  getTemplate() {
    return createAmountTemplate(this._amount);
  }
}


/***/ }),

/***/ "./src/view/chunk-list.js":
/*!********************************!*\
  !*** ./src/view/chunk-list.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ChunkList)
/* harmony export */ });
/* harmony import */ var _abstract__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract */ "./src/view/abstract.js");


const createChunkListTemplate = () => '<ul class="chunk-list"></ul>';

class ChunkList extends _abstract__WEBPACK_IMPORTED_MODULE_0__["default"] {
  getTemplate() {
    return createChunkListTemplate();
  }
}


/***/ }),

/***/ "./src/view/chunk.js":
/*!***************************!*\
  !*** ./src/view/chunk.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Chunk)
/* harmony export */ });
/* harmony import */ var _abstract__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract */ "./src/view/abstract.js");


const createChunkTemplate = (chunk) => {
  const { id, title, amount } = chunk;
  const { energy, protein, fat, carb } = amount;

  return `<li class="chunk-list-item" data-id="${id}">
    <div class="chunk-header">
      <h2 class="chunk-title">${title}</h2>
      <table class="chunk-info-table">
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
      <div class="chunk-controls">
        <button type="button" class="btn btn-add"></button>
        <button type="button" class="btn btn-remove"></button>
      </div>
    </div>
    <ul class="component-list"></ul>
  </li>`;
};

class Chunk extends _abstract__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(chunk = {}) {
    super();

    this._chunk = chunk;

    this._addClickHandler = this._addClickHandler.bind(this);
    this._removeClickHandler = this._removeClickHandler.bind(this);
  }

  getTemplate() {
    return createChunkTemplate(this._chunk);
  }

  _addClickHandler(evt) {
    evt.preventDefault();
    this._callback.addClick();
  }

  _removeClickHandler(evt) {
    evt.preventDefault();
    this._callback.removeClick();
  }

  setAddClickHandler(callback) {
    this._callback.addClick = callback;
    const addButton = this.getElement().querySelector('.btn-add');
    addButton.addEventListener('click', this._addClickHandler);
  }

  setRemoveClickHandler(callback) {
    this._callback.removeClick = callback;
    const removeButton = this.getElement().querySelector('.btn-remove');
    removeButton.addEventListener('click', this._removeClickHandler);
  }
}


/***/ }),

/***/ "./src/view/ingredient-edit.js":
/*!*************************************!*\
  !*** ./src/view/ingredient-edit.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ IngredientEdit)
/* harmony export */ });
/* harmony import */ var _abstract__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract */ "./src/view/abstract.js");
/* harmony import */ var _product_list_control__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./product-list-control */ "./src/view/product-list-control.js");




const createIngredientEditTemplate = (ingredient, products) => {
  const {id, productId = -1, count} = ingredient;

  const product = products.find((product) => product.id === productId) || products[0];
  const { energy, protein, fat, carb } = product;

  const productListControl = new _product_list_control__WEBPACK_IMPORTED_MODULE_1__["default"](products, productId);

  return `<li class="ingredient-list-item" data-id="${id}">
    <div class="ingredient-top">
      ${productListControl.getTemplate()}
      <div class="ingredient-count">
        <input type="number" name="count" style="font-size: 16px; width: 50px;" value="${count}" onclick="this.select();" inputmode="numeric"> ${product.measure}
      </div>
    </div>

    <div class="ingredient-bottom">
      <table class="ingredient-info-table">
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
        <button class="btn btn-save btn-success btn-middle">Сохранить</button>
        <button class="btn btn-cancel btn-error btn-middle">Отменить</button>
      </div>
    </div>
  </li>`;
};

class IngredientEdit extends _abstract__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(ingredient, products) {
    super();

    this._ingredient = ingredient;
    this._products = products;

    this._saveClickHandler = this._saveClickHandler.bind(this);
    this._cancelClickHandler = this._cancelClickHandler.bind(this);
  }

  getTemplate() {
    return createIngredientEditTemplate(this._ingredient, this._products);
  }

  _saveClickHandler(evt) {
    evt.preventDefault();
    const selectElement = this.getElement().querySelector('select');
    const countElement = this.getElement().querySelector('input[name="count"]');
    const updated = {
      productId: selectElement.value,
      count: countElement.value,
    };
    this._callback.saveClick(Object.assign({}, this._ingredient, updated));
  }

  _cancelClickHandler(evt) {
    evt.preventDefault();
    this._callback.cancelClick(this._ingredient);
  }

  setSaveClickHandler(callback) {
    this._callback.saveClick = callback;
    const saveButton = this.getElement().querySelector('.btn-save');
    saveButton.addEventListener('click', this._saveClickHandler);
  }

  setCancelClickHandler(callback) {
    this._callback.cancelClick = callback;
    const cancelButton = this.getElement().querySelector('.btn-cancel');
    cancelButton.addEventListener('click', this._cancelClickHandler);
  }
}


/***/ }),

/***/ "./src/view/ingredient.js":
/*!********************************!*\
  !*** ./src/view/ingredient.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Ingredient)
/* harmony export */ });
/* harmony import */ var _abstract__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract */ "./src/view/abstract.js");


const createIngredientTemplate = (ingredient, products) => {
  const {id, productId = -1, count} = ingredient;
  const product = products.find((product) => product.id === productId) || products[0];

  const { title, energy, protein, fat, carb } = product;

  return `<li class="ingredient-list-item" data-id="${id}">
    <div class="ingredient-top">
      <h3 class="ingredient-title">${title}</h3>
      <div class="ingredient-count">
        <span>${count}</span> ${product.measure}
      </div>
    </div>

    <div class="ingredient-bottom">
      <table class="ingredient-info-table">
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

class Ingredient extends _abstract__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(ingredient, products) {
    super();

    this._ingredient = ingredient;
    this._products = products;

    this._editClickHandler = this._editClickHandler.bind(this);
    this._removeClickHandler = this._removeClickHandler.bind(this);
  }

  getTemplate() {
    return createIngredientTemplate(this._ingredient, this._products);
  }

  _editClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick(this._ingredient);
  }

  _removeClickHandler(evt) {
    evt.preventDefault();
    this._callback.removeClick(this._ingredient);
  }

  setEditClickHandler(callback) {
    this._callback.editClick = callback;
    const titleElement = this.getElement().querySelector('.ingredient-title');
    const countElement = this.getElement().querySelector('.ingredient-count');
    titleElement.addEventListener('click', this._editClickHandler);
    countElement.addEventListener('click', this._editClickHandler);
  }

  setRemoveClickHandler(callback) {
    this._callback.removeClick = callback;
    const removeButton = this.getElement().querySelector('.btn-remove');
    removeButton.addEventListener('click', this._removeClickHandler);
  }
}


/***/ }),

/***/ "./src/view/product-list-control.js":
/*!******************************************!*\
  !*** ./src/view/product-list-control.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ProductListControl)
/* harmony export */ });
/* harmony import */ var _abstract__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract */ "./src/view/abstract.js");


const createProductListControlTemplate = (products, selectedProductId) => {
  let options = '';

  for (const product of products.values()) {
    const { id, title, isDeleted = false } = product;
    const isSelected = id === selectedProductId ? 'selected' : '';
    options += `<option value="${id}" ${isSelected}>${title} ${isDeleted ? '[ УДАЛЕН ]' : ''}</option>`;
  }

  return `<select>${options}</select>`;
};

class ProductListControl extends _abstract__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(products, selectedProductId = 0) {
    super();

    this._products = products;
    this._selectedProductId = selectedProductId;
  }

  getTemplate() {
    return createProductListControlTemplate(this._products, this._selectedProductId);
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
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _mock_chunk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mock/chunk */ "./src/mock/chunk.js");
/* harmony import */ var _mock_product__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mock/product */ "./src/mock/product.js");
/* harmony import */ var _utils_chunk__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/chunk */ "./src/utils/chunk.js");
/* harmony import */ var _view_amount__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./view/amount */ "./src/view/amount.js");
/* harmony import */ var _presenter_chunk_list__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./presenter/chunk-list */ "./src/presenter/chunk-list.js");
/* harmony import */ var _utils_render__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/render */ "./src/utils/render.js");











const CHUNK_COUNT = 3;
const PRODUCT_COUNT = 10;

// const products = new Array(PRODUCT_COUNT).fill(null).map(() => generateProduct());
let products = [];
let chunks = [];

if (localStorage.getItem('products')) {
  products = JSON.parse(localStorage.getItem('products'));
}

if (localStorage.getItem('chunks')) {
  chunks = JSON.parse(localStorage.getItem('chunks'));
} else {
  const titles = ['Завтрак', 'Обед', 'Ужин'];
  chunks = new Array(titles.length).fill(null).map((item, index) => (0,_utils_chunk__WEBPACK_IMPORTED_MODULE_2__.createChunk)(titles[index]));
}

// const chunks = new Array(CHUNK_COUNT).fill(null).map(() => generateChunk(products));

const mainElement = document.querySelector('.main');

let amountComponent = null;

const renderAmount = (amount) => {
  if (amountComponent) {
    (0,_utils_render__WEBPACK_IMPORTED_MODULE_5__.remove)(amountComponent);
  }
  amountComponent = new _view_amount__WEBPACK_IMPORTED_MODULE_3__["default"](amount);
  (0,_utils_render__WEBPACK_IMPORTED_MODULE_5__.render)(mainElement, amountComponent, _utils_render__WEBPACK_IMPORTED_MODULE_5__.RenderPosition.BEFOREEND);
};

const compute = (chunks) => {
  const amount = {
    energy: 0,
    protein: 0,
    fat: 0,
    carb: 0,
  };

  chunks.forEach((chunk) => {
    chunk.amount = (0,_utils_chunk__WEBPACK_IMPORTED_MODULE_2__.computeAmount)(chunk.ingredients, products);
    amount.energy += parseInt(chunk.amount.energy);
    amount.protein += parseInt(chunk.amount.protein);
    amount.fat += parseInt(chunk.amount.fat);
    amount.carb += parseInt(chunk.amount.carb);
  });

  return amount;
};

const changeData = (updatedData) => {
  const amount = compute(updatedData);
  renderAmount(amount);
  localStorage.setItem('chunks', JSON.stringify(updatedData));
  chunkListPresenter.init(updatedData, products);
};

const amount = compute(chunks);
renderAmount(amount);

const chunkListPresenter = new _presenter_chunk_list__WEBPACK_IMPORTED_MODULE_4__["default"](mainElement, changeData);
chunkListPresenter.init(chunks, products);

})();

/******/ })()
;
//# sourceMappingURL=main.js.map