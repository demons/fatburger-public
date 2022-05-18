(()=>{"use strict";let e=(e=21)=>crypto.getRandomValues(new Uint8Array(e)).reduce(((e,t)=>e+((t&=63)<36?t.toString(36):t<62?(t-26).toString(36).toUpperCase():t>62?"-":"_")),"");const t={id:e(),title:"Пустой продукт",maker:"Нонэйм",energy:0,protein:0,fat:0,carb:0,measure:"гр.",measureCount:1},n=(e,n)=>{let i=e.find((e=>e.id===n));return i||(i=e.length<=0?t:e[0]),i},i=(e,t)=>{const{count:i=0,productId:l=-1}=t,s=n(e,l),{measureCount:r,energy:a,protein:c,fat:d,carb:o}=s;return{energy:r*a*i/100,protein:r*c*i/100,fat:r*d*i/100,carb:r*o*i/100}},l=(e,t)=>e.reduce(((e,n)=>{const l=((e,t)=>e.reduce(((e,n)=>{const l=i(t,n);return{energy:e.energy+l.energy,protein:e.protein+l.protein,fat:e.fat+l.fat,carb:e.carb+l.carb}}),{energy:0,protein:0,fat:0,carb:0}))(n.ingredients,t);return{energy:e.energy+l.energy,protein:e.protein+l.protein,fat:e.fat+l.fat,carb:e.carb+l.carb}}),{energy:0,protein:0,fat:0,carb:0}),s=t=>({id:e(),title:t,amount:{energy:0,protein:0,fat:0,carb:0},ingredients:[]}),r=t=>({id:e(),title:t.title,amount:Object.assign({},t.amount),ingredients:t.ingredients.map((t=>Object.assign({},t,{id:e})))}),a="beforeend",c=(e,t,n)=>{switch(e instanceof h&&(e=e.getElement()),t instanceof h&&(t=t.getElement()),n){case"afterbegin":e.prepend(t);break;case a:e.append(t)}},d=(e,t)=>{t instanceof h&&(t=t.getElement()),e instanceof h&&(e=e.getElement());const n=t.parentElement;if(null===n||null===t||null===e)throw new Error("Can't replace unesisting elements");n.replaceChild(e,t)},o=e=>{if(!(e instanceof h))throw new Error("Can remove only components");e.getElement().remove(),e.removeElement()};class h{constructor(){if("Abstract"===new.target)throw new Error("Can't instantiate Abstract, only concrete one.");this._element=null,this._callback={}}getTemplate(){throw new Error("Method not implemented: getTemplate")}getElement(){return null===this._element&&(this._element=(e=>{const t=document.createElement("div");return t.innerHTML=e,t.firstChild})(this.getTemplate())),this._element}removeElement(){this._element=null}}class u extends h{constructor(e){super(),this._amount=e}getTemplate(){return((e={})=>{const{energy:t=0,protein:n=0,fat:i=0,carb:l=0}=e;return`<div class="amount">\n    <div class="amount-energy">Калории: ${t}</div>\n    <div class="amount-protein">Белки: ${n}</div>\n    <div class="amount-fat">Жиры: ${i}</div>\n    <div class="amount-carb">Углеводы: ${l}</div>\n  </div>`})(this._amount)}}const _=(e,t)=>{const n=e.findIndex((e=>e.id===t.id));return-1===n?e:[...e.slice(0,n),t,...e.slice(n+1)]},m=(e,t)=>[...e,t],k=(e,t)=>{const n=e.findIndex((({id:e})=>e===t.id));return-1===n?e:[...e.slice(0,n),...e.slice(n+1)]};class p extends h{getTemplate(){return'<ul class="chunk-list"></ul>'}}const C=()=>JSON.parse(localStorage.getItem("templates")||"[]");class g extends h{constructor(){super(),this._clickButtonHandler=this._clickButtonHandler.bind(this),this._clickCreateButtonHandler=this._clickCreateButtonHandler.bind(this),this._loadTemplateClickHandler=this._loadTemplateClickHandler.bind(this),this._removeTemplateClickHandler=this._removeTemplateClickHandler.bind(this)}getTemplate(){return`<form class="add-chunk-form">\n  <fieldset>\n    <select name="templates" class="templates">\n      ${C().reduce(((e,t)=>e+`<option value="${t.id}">${t.title}</option>`),'<option value="-1">Выберите шаблон...</option>')}\n    </select>\n    <button type="button" class="btn btn-load btn-success">Загрузить</button>\n    <button type="button" class="btn btn-delete btn-error">Удалить</button>\n  </fieldset>\n  <fieldset>\n    <input type="text" class="form-input" placeholder="Введите название группы">\n    <button type="submit" class="btn btn-chunk btn-success">Добавить группу</button>\n  </fieldset>\n  <fieldset>\n    <button type="button" class="btn btn-create btn-success">Создать новый день</button>\n  </fieldset>\n</form>`}_getSelectedTemplateId(){return this.getElement().querySelector(".templates").value}_clickButtonHandler(e){e.preventDefault();const t=this.getElement().querySelector(".form-input").value;this._callback.clickButton(t)}_clickCreateButtonHandler(e){e.preventDefault(),this._callback.clickCreateButton()}_loadTemplateClickHandler(e){e.preventDefault();const t=this._getSelectedTemplateId();this._callback.loadTemplateClick(t)}_removeTemplateClickHandler(e){e.preventDefault();const t=this._getSelectedTemplateId();this._callback.removeTemplateClick(t)}setClickButtonHandler(e){this._callback.clickButton=e,this.getElement().addEventListener("submit",this._clickButtonHandler)}setClickCreateButtonHandler(e){this._callback.clickCreateButton=e,this.getElement().querySelector(".btn-create").addEventListener("click",this._clickCreateButtonHandler)}setLoadTemplateClickHandler(e){this._callback.loadTemplateClick=e,this.getElement().querySelector(".btn-load").addEventListener("click",this._loadTemplateClickHandler)}setRemoveTemplateClickHandler(e){this._callback.removeTemplateClick=e,this.getElement().querySelector(".btn-delete").addEventListener("click",this._removeTemplateClickHandler)}}class b extends h{constructor(e={}){super(),this._chunk=e,this._addClickHandler=this._addClickHandler.bind(this),this._removeClickHandler=this._removeClickHandler.bind(this),this._addToTemplateClickHandler=this._addToTemplateClickHandler.bind(this)}getTemplate(){return(e=>{const{id:t,title:n,amount:i}=e,{energy:l,protein:s,fat:r,carb:a}=i;return`<li class="chunk-list-item" data-id="${t}">\n    <div class="chunk-header">\n      <h2 class="chunk-title">${n} <a href="#" class="small">[ + ]</a></h2>\n      <table class="chunk-info-table">\n        <tr>\n          <th>Калории</th>\n          <th>Белки</th>\n          <th>Жиры</th>\n          <th>Углеводы</th>\n        </tr>\n        <tr>\n          <td>${l}</td>\n          <td>${s}</td>\n          <td>${r}</td>\n          <td>${a}</td>\n        </tr>\n      </table>\n      <div class="chunk-controls">\n        <button type="button" class="btn btn-add"></button>\n        <button type="button" class="btn btn-remove"></button>\n      </div>\n    </div>\n    <ul class="component-list"></ul>\n  </li>`})(this._chunk)}_addClickHandler(e){e.preventDefault(),this._callback.addClick()}_removeClickHandler(e){e.preventDefault(),this._callback.removeClick()}_addToTemplateClickHandler(e){e.preventDefault(),this._callback.addToTemplateClick(this._chunk)}setAddClickHandler(e){this._callback.addClick=e,this.getElement().querySelector(".btn-add").addEventListener("click",this._addClickHandler)}setRemoveClickHandler(e){this._callback.removeClick=e,this.getElement().querySelector(".btn-remove").addEventListener("click",this._removeClickHandler)}setAddToTemplateClickHandler(e){this._callback.addToTemplateClick=e,this.getElement().querySelector("a.small").addEventListener("click",this._addToTemplateClickHandler)}}class v extends h{constructor(e,t){super(),this._ingredient=e,this._products=t,this._editClickHandler=this._editClickHandler.bind(this),this._removeClickHandler=this._removeClickHandler.bind(this)}computeData(){const{productId:e}=this._ingredient;return{product:n(this._products,e),amount:i(this._products,this._ingredient),ingredient:this._ingredient}}getTemplate(){return(({ingredient:e,product:t,amount:n})=>{const{count:i}=e,{title:l,maker:s="",measure:r}=t,{energy:a,protein:c,fat:d,carb:o}=n;return`<li class="ingredient-list-item">\n    <div class="ingredient-top">\n      <h3 class="ingredient-title">${l}${s?`, ${s}`:""}</h3>\n      <div class="ingredient-count">\n        <span>${i}</span> ${r}\n      </div>\n    </div>\n\n    <div class="ingredient-bottom">\n      <table class="ingredient-info-table">\n        <tr>\n          <th>Калории</th>\n          <th>Белки</th>\n          <th>Жиры</th>\n          <th>Углеводы</th>\n        </tr>\n        <tr>\n          <td>${a}</td>\n          <td>${c}</td>\n          <td>${d}</td>\n          <td>${o}</td>\n        </tr>\n      </table>\n\n      <div class="controls">\n        <button class="btn btn-remove"></button>\n      </div>\n    </div>\n  </li>`})(this.computeData())}_editClickHandler(e){e.preventDefault(),this._callback.editClick(this._ingredient)}_removeClickHandler(e){e.preventDefault(),this._callback.removeClick(this._ingredient)}setEditClickHandler(e){this._callback.editClick=e;const t=this.getElement().querySelector(".ingredient-title"),n=this.getElement().querySelector(".ingredient-count");t.addEventListener("click",this._editClickHandler),n.addEventListener("click",this._editClickHandler)}setRemoveClickHandler(e){this._callback.removeClick=e,this.getElement().querySelector(".btn-remove").addEventListener("click",this._removeClickHandler)}}class H extends h{constructor(e,t=0){super(),this._products=e,this._selectedProductId=t}getTemplate(){return((e,t)=>{let n="";for(const i of e.values()){const{id:e,title:l,maker:s=""}=i;n+=`<option value="${e}" ${e===t?"selected":""}>${l}, ${s}</option>`}return`<select>${n}</select>`})(this._products,this._selectedProductId)}}class f extends h{constructor(e,t){super(),this._ingredient=e,this._products=t,this._saveClickHandler=this._saveClickHandler.bind(this),this._cancelClickHandler=this._cancelClickHandler.bind(this)}getTemplate(){return((e,t)=>{const{id:n,productId:i=-1,count:l}=e,s=t.find((e=>e.id===i))||t[0],{energy:r,protein:a,fat:c,carb:d}=s;return`<li class="ingredient-list-item" data-id="${n}">\n    <div class="ingredient-top">\n      ${new H(t,i).getTemplate()}\n      <div class="ingredient-count">\n        <input type="number" name="count" style="font-size: 16px; width: 50px;" value="${l}" onclick="this.select();" inputmode="numeric"> ${s.measure}\n      </div>\n    </div>\n\n    <div class="ingredient-bottom">\n      <table class="ingredient-info-table">\n        <tr>\n          <th>Калории</th>\n          <th>Белки</th>\n          <th>Жиры</th>\n          <th>Углеводы</th>\n        </tr>\n        <tr>\n          <td>${r}</td>\n          <td>${a}</td>\n          <td>${c}</td>\n          <td>${d}</td>\n        </tr>\n      </table>\n\n      <div class="controls">\n        <button class="btn btn-save btn-success btn-middle">Сохранить</button>\n        <button class="btn btn-cancel btn-error btn-middle">Отменить</button>\n      </div>\n    </div>\n  </li>`})(this._ingredient,this._products)}_saveClickHandler(e){e.preventDefault();const t=this.getElement().querySelector("select"),n=this.getElement().querySelector('input[name="count"]'),i={productId:t.value,count:n.value};this._callback.saveClick(Object.assign({},this._ingredient,i))}_cancelClickHandler(e){e.preventDefault(),this._callback.cancelClick(this._ingredient)}setSaveClickHandler(e){this._callback.saveClick=e,this.getElement().querySelector(".btn-save").addEventListener("click",this._saveClickHandler),this.getElement().querySelector('input[name="count"]').addEventListener("keydown",(e=>{13===e.keyCode&&this._saveClickHandler(e)}))}setCancelClickHandler(e){this._callback.cancelClick=e,this.getElement().querySelector(".btn-cancel").addEventListener("click",this._cancelClickHandler)}}class T{constructor(e,t){this._container=e,this._changeData=t,this._chunkComponent=null,this._ingredientComponentList={},this._addIngredientClickHandler=this._addIngredientClickHandler.bind(this),this._removeChunkClickHandler=this._removeChunkClickHandler.bind(this),this._editIngredientClickHandler=this._editIngredientClickHandler.bind(this),this._removeIngredientClickHandler=this._removeIngredientClickHandler.bind(this),this._saveIngredientClickHandler=this._saveIngredientClickHandler.bind(this),this._cancelIngredientClickHandler=this._cancelIngredientClickHandler.bind(this),this._addToTemplateClickHandler=this._addToTemplateClickHandler.bind(this)}init(e,t){this._chunk=e,this._products=t,this._editIngredientComponent=null,this._renderChunk()}destroy(){Object.values(this._ingredientComponentList).forEach((e=>o(e))),this._ingredientComponentList={},o(this._chunkComponent)}_renderChunk(){this._chunkComponent=new b(this._chunk),this._chunkComponent.setAddClickHandler(this._addIngredientClickHandler),this._chunkComponent.setRemoveClickHandler(this._removeChunkClickHandler),this._chunkComponent.setAddToTemplateClickHandler(this._addToTemplateClickHandler),c(this._container,this._chunkComponent,a),this._chunk.ingredients.forEach((e=>{this._renderIngredient(e)}))}_renderIngredient(e){const t=new v(e,this._products);t.setEditClickHandler(this._editIngredientClickHandler),t.setRemoveClickHandler(this._removeIngredientClickHandler),c(this._chunkComponent,t,a),this._ingredientComponentList[e.id]=t}_addIngredientClickHandler(){if(0===this._products.length)return void alert("Список продуктов пуст! Сначала нужно заполнить его!");const t={id:e(),productId:-1,count:0};this._chunk.ingredients=m(this._chunk.ingredients,t),this._changeData(this._chunk)}_removeChunkClickHandler(){this._changeData(this._chunk,"remove")}_editIngredientClickHandler(e){this._replaceToEdit(e)}_replaceToEdit(e){if(this._editIngredientComponent)return void this._changeData(this._chunk);this._editIngredientComponent=new f(e,this._products),this._editIngredientComponent.setSaveClickHandler(this._saveIngredientClickHandler),this._editIngredientComponent.setCancelClickHandler(this._cancelIngredientClickHandler);const t=this._ingredientComponentList[e.id];d(this._editIngredientComponent,t),o(t),this._ingredientComponentList[e.id]=this._editIngredientComponent}_replaceFromEdit(e){const t=new v(e,this._products);t.setEditClickHandler(this._editIngredientClickHandler),t.setRemoveClickHandler(this._removeIngredientClickHandler),d(t,this._editIngredientComponent),o(this._editIngredientComponent),this._ingredientComponentList[e.id]=t,this._editIngredientComponent=null}_removeIngredientClickHandler(e){this._chunk.ingredients=k(this._chunk.ingredients,e),this._changeData(this._chunk)}_saveIngredientClickHandler(e){this._chunk.ingredients=_(this._chunk.ingredients,e),this._changeData(this._chunk)}_cancelIngredientClickHandler(e){this._replaceFromEdit(e)}_addToTemplateClickHandler(e){(e=>{const t=C();t.push(r(e)),localStorage.setItem("templates",JSON.stringify(t))})(e),this._changeData(this._chunk)}}let y=[],I=[];if(localStorage.getItem("products")&&(y=JSON.parse(localStorage.getItem("products"))),localStorage.getItem("chunks"))I=JSON.parse(localStorage.getItem("chunks"));else{const e=["Завтрак","Обед","Ужин"];I=new Array(e.length).fill(null).map(((t,n)=>s(e[n])))}const E=document.querySelector(".main");let S=null;const $=e=>{S&&o(S),S=new u(e),c(E,S,a)},D=l(I,y);$(D);const L=new class{constructor(e,t,n){this._container=e,this._changeData=t,this._chunkPresenter={},this._chunkListComponent=new p,this._addChunkFormComponent=new g,this._chunkUpdateHandler=this._chunkUpdateHandler.bind(this),this._createNewDayHandler=this._createNewDayHandler.bind(this),this._loadTemplateHandler=this._loadTemplateHandler.bind(this),this._removeTemplateHandler=this._removeTemplateHandler.bind(this)}init(e,t){this._chunks=e,this._products=t,this._clearList(),this._renderChunkList(),this._renderAddChunkForm()}_clearList(){Object.values(this._chunkPresenter).forEach((e=>e.destroy())),this._chunkPresenter={},o(this._addChunkFormComponent)}_renderChunk(e){const t=new T(this._chunkListComponent,this._chunkUpdateHandler);t.init(e,this._products),this._chunkPresenter[e.id]=t}_renderChunkList(){c(this._container,this._chunkListComponent,a),this._chunks.forEach((e=>this._renderChunk(e)))}_renderAddChunkForm(){c(this._chunkListComponent,this._addChunkFormComponent,a),this._addChunkFormComponent.setClickButtonHandler((e=>this._addChunkHandler(e))),this._addChunkFormComponent.setClickCreateButtonHandler(this._createNewDayHandler),this._addChunkFormComponent.setLoadTemplateClickHandler(this._loadTemplateHandler),this._addChunkFormComponent.setRemoveTemplateClickHandler(this._removeTemplateHandler)}_chunkUpdateHandler(e,t="update"){switch(t){case"update":this._changeData(_(this._chunks,e));break;case"remove":this._changeData(k(this._chunks,e))}}_addChunkHandler(e){if(!e)return alert("Введите название группы!");this._changeData(m(this._chunks,s(e)))}_createNewDayHandler(){const e=((e,t)=>{const n=e.map((e=>r(e)));return{amount:l(n,t),chunks:n}})(this._chunks,this._products),t=new Date;t.setDate(t.getDate()-1);const n=`${t.getFullYear()}-${t.getMonth()+1}-${t.getDate()}_${t.getHours()}-${t.getMinutes()}`,i=JSON.parse(localStorage.getItem("story")||"{}");i[n]=e,localStorage.setItem("story",JSON.stringify(i)),this._changeData([])}_loadTemplateHandler(e){if(!e||"-1"===e)return alert("Выберите шаблон!");const t=(e=>C().find((t=>t.id===e))||null)(e);if(!t)return alert("Шаблон не найден!");this._changeData(m(this._chunks,t))}_removeTemplateHandler(e){if(!e||"-1"===e)return alert("Выберите шаблон!");(e=>{const t=((e,t)=>{const n=e.findIndex((e=>e.id===t));return-1===n?e:[...e.slice(0,n),...e.slice(n+1)]})(C(),e);localStorage.setItem("templates",JSON.stringify(t))})(e),o(this._addChunkFormComponent),this._renderAddChunkForm()}}(E,(e=>{const t=l(e,y);$(t),localStorage.setItem("chunks",JSON.stringify(e)),L.init(e,y)}));L.init(I,y)})();