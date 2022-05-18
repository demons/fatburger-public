(()=>{"use strict";let t=(t=21)=>crypto.getRandomValues(new Uint8Array(t)).reduce(((t,e)=>t+((e&=63)<36?e.toString(36):e<62?(e-26).toString(36).toUpperCase():e>62?"-":"_")),"");const e={id:t(),title:"Пустой продукт",maker:"Нонэйм",energy:0,protein:0,fat:0,carb:0,measure:"гр.",measureCount:1},n=e=>({id:t(),title:e,amount:{energy:0,protein:0,fat:0,carb:0},ingredients:[]}),i=(t,n)=>{const i={energy:0,protein:0,fat:0,carb:0};return t.forEach((t=>{t.amount=((t,n)=>{const i={energy:0,protein:0,fat:0,carb:0};return t.forEach((t=>{const s=((t,n)=>{let i=t.find((t=>t.id===n));return i||(i=t.length<=0?e:t[0]),i})(n,t.productId),{energy:r,protein:c,fat:a,carb:l}=s,d=t.count||0;i.energy+=s.measureCount*r*d/100,i.protein+=s.measureCount*c*d/100,i.fat+=s.measureCount*a*d/100,i.carb+=s.measureCount*l*d/100})),i.energy=i.energy.toFixed(1),i.protein=i.protein.toFixed(1),i.fat=i.fat.toFixed(1),i.carb=i.carb.toFixed(1),i})(t.ingredients,n),i.energy+=parseInt(t.amount.energy),i.protein+=parseInt(t.amount.protein),i.fat+=parseInt(t.amount.fat),i.carb+=parseInt(t.amount.carb)})),i},s="beforeend",r=(t,e,n)=>{switch(t instanceof l&&(t=t.getElement()),e instanceof l&&(e=e.getElement()),n){case"afterbegin":t.prepend(e);break;case s:t.append(e)}},c=(t,e)=>{e instanceof l&&(e=e.getElement()),t instanceof l&&(t=t.getElement());const n=e.parentElement;if(null===n||null===e||null===t)throw new Error("Can't replace unesisting elements");n.replaceChild(t,e)},a=t=>{if(!(t instanceof l))throw new Error("Can remove only components");t.getElement().remove(),t.removeElement()};class l{constructor(){if("Abstract"===new.target)throw new Error("Can't instantiate Abstract, only concrete one.");this._element=null,this._callback={}}getTemplate(){throw new Error("Method not implemented: getTemplate")}getElement(){return null===this._element&&(this._element=(t=>{const e=document.createElement("div");return e.innerHTML=t,e.firstChild})(this.getTemplate())),this._element}removeElement(){this._element=null}}class d extends l{constructor(t){super(),this._amount=t}getTemplate(){return((t={})=>{const{energy:e=0,protein:n=0,fat:i=0,carb:s=0}=t;return`<div class="amount">\n    <div class="amount-energy">Калории: ${e}</div>\n    <div class="amount-protein">Белки: ${n}</div>\n    <div class="amount-fat">Жиры: ${i}</div>\n    <div class="amount-carb">Углеводы: ${s}</div>\n  </div>`})(this._amount)}}const o=(t,e)=>{const n=t.findIndex((t=>t.id===e.id));return-1===n?t:[...t.slice(0,n),e,...t.slice(n+1)]},h=(t,e)=>[...t,e],u=(t,e)=>{const n=t.findIndex((({id:t})=>t===e.id));return-1===n?t:[...t.slice(0,n),...t.slice(n+1)]};class _ extends l{getTemplate(){return'<ul class="chunk-list"></ul>'}}class k extends l{constructor(){super(),this._clickButtonHandler=this._clickButtonHandler.bind(this),this._clickCreateButtonHandler=this._clickCreateButtonHandler.bind(this)}getTemplate(){return'<form class="add-chunk-form">\n  <input type="text" class="form-input" placeholder="Введите название группы">\n  <button type="submit" class="btn btn-chunk btn-success">Добавить группу</button>\n  <button type="button" class="btn btn-create btn-success">Создать новый день</button>\n</form>'}_clickButtonHandler(t){t.preventDefault();const e=this.getElement().querySelector(".form-input").value;this._callback.clickButton(e)}_clickCreateButtonHandler(t){t.preventDefault(),this._callback.clickCreateButton()}setClickButtonHandler(t){this._callback.clickButton=t,this.getElement().addEventListener("submit",this._clickButtonHandler)}setClickCreateButtonHandler(t){this._callback.clickCreateButton=t,this.getElement().querySelector(".btn-create").addEventListener("click",this._clickCreateButtonHandler)}}class m extends l{constructor(t={}){super(),this._chunk=t,this._addClickHandler=this._addClickHandler.bind(this),this._removeClickHandler=this._removeClickHandler.bind(this)}getTemplate(){return(t=>{const{id:e,title:n,amount:i}=t,{energy:s,protein:r,fat:c,carb:a}=i;return`<li class="chunk-list-item" data-id="${e}">\n    <div class="chunk-header">\n      <h2 class="chunk-title">${n}</h2>\n      <table class="chunk-info-table">\n        <tr>\n          <th>Калории</th>\n          <th>Белки</th>\n          <th>Жиры</th>\n          <th>Углеводы</th>\n        </tr>\n        <tr>\n          <td>${s}</td>\n          <td>${r}</td>\n          <td>${c}</td>\n          <td>${a}</td>\n        </tr>\n      </table>\n      <div class="chunk-controls">\n        <button type="button" class="btn btn-add"></button>\n        <button type="button" class="btn btn-remove"></button>\n      </div>\n    </div>\n    <ul class="component-list"></ul>\n  </li>`})(this._chunk)}_addClickHandler(t){t.preventDefault(),this._callback.addClick()}_removeClickHandler(t){t.preventDefault(),this._callback.removeClick()}setAddClickHandler(t){this._callback.addClick=t,this.getElement().querySelector(".btn-add").addEventListener("click",this._addClickHandler)}setRemoveClickHandler(t){this._callback.removeClick=t,this.getElement().querySelector(".btn-remove").addEventListener("click",this._removeClickHandler)}}class g extends l{constructor(t,e){super(),this._ingredient=t,this._products=e,this._editClickHandler=this._editClickHandler.bind(this),this._removeClickHandler=this._removeClickHandler.bind(this)}getTemplate(){return((t,e)=>{const{id:n,productId:i=-1,count:s}=t,r=e.find((t=>t.id===i))||e[0],{title:c,maker:a="",energy:l,protein:d,fat:o,carb:h}=r;return`<li class="ingredient-list-item" data-id="${n}">\n    <div class="ingredient-top">\n      <h3 class="ingredient-title">${c}${a?`, ${a}`:""}</h3>\n      <div class="ingredient-count">\n        <span>${s}</span> ${r.measure}\n      </div>\n    </div>\n\n    <div class="ingredient-bottom">\n      <table class="ingredient-info-table">\n        <tr>\n          <th>Калории</th>\n          <th>Белки</th>\n          <th>Жиры</th>\n          <th>Углеводы</th>\n        </tr>\n        <tr>\n          <td>${l}</td>\n          <td>${d}</td>\n          <td>${o}</td>\n          <td>${h}</td>\n        </tr>\n      </table>\n\n      <div class="controls">\n        <button class="btn btn-remove"></button>\n      </div>\n    </div>\n  </li>`})(this._ingredient,this._products)}_editClickHandler(t){t.preventDefault(),this._callback.editClick(this._ingredient)}_removeClickHandler(t){t.preventDefault(),this._callback.removeClick(this._ingredient)}setEditClickHandler(t){this._callback.editClick=t;const e=this.getElement().querySelector(".ingredient-title"),n=this.getElement().querySelector(".ingredient-count");e.addEventListener("click",this._editClickHandler),n.addEventListener("click",this._editClickHandler)}setRemoveClickHandler(t){this._callback.removeClick=t,this.getElement().querySelector(".btn-remove").addEventListener("click",this._removeClickHandler)}}class C extends l{constructor(t,e=0){super(),this._products=t,this._selectedProductId=e}getTemplate(){return((t,e)=>{let n="";for(const i of t.values()){const{id:t,title:s,maker:r=""}=i;n+=`<option value="${t}" ${t===e?"selected":""}>${s}, ${r}</option>`}return`<select>${n}</select>`})(this._products,this._selectedProductId)}}class p extends l{constructor(t,e){super(),this._ingredient=t,this._products=e,this._saveClickHandler=this._saveClickHandler.bind(this),this._cancelClickHandler=this._cancelClickHandler.bind(this)}getTemplate(){return((t,e)=>{const{id:n,productId:i=-1,count:s}=t,r=e.find((t=>t.id===i))||e[0],{energy:c,protein:a,fat:l,carb:d}=r;return`<li class="ingredient-list-item" data-id="${n}">\n    <div class="ingredient-top">\n      ${new C(e,i).getTemplate()}\n      <div class="ingredient-count">\n        <input type="number" name="count" style="font-size: 16px; width: 50px;" value="${s}" onclick="this.select();" inputmode="numeric"> ${r.measure}\n      </div>\n    </div>\n\n    <div class="ingredient-bottom">\n      <table class="ingredient-info-table">\n        <tr>\n          <th>Калории</th>\n          <th>Белки</th>\n          <th>Жиры</th>\n          <th>Углеводы</th>\n        </tr>\n        <tr>\n          <td>${c}</td>\n          <td>${a}</td>\n          <td>${l}</td>\n          <td>${d}</td>\n        </tr>\n      </table>\n\n      <div class="controls">\n        <button class="btn btn-save btn-success btn-middle">Сохранить</button>\n        <button class="btn btn-cancel btn-error btn-middle">Отменить</button>\n      </div>\n    </div>\n  </li>`})(this._ingredient,this._products)}_saveClickHandler(t){t.preventDefault();const e=this.getElement().querySelector("select"),n=this.getElement().querySelector('input[name="count"]'),i={productId:e.value,count:n.value};this._callback.saveClick(Object.assign({},this._ingredient,i))}_cancelClickHandler(t){t.preventDefault(),this._callback.cancelClick(this._ingredient)}setSaveClickHandler(t){this._callback.saveClick=t,this.getElement().querySelector(".btn-save").addEventListener("click",this._saveClickHandler),this.getElement().querySelector('input[name="count"]').addEventListener("keydown",(t=>{13===t.keyCode&&this._saveClickHandler(t)}))}setCancelClickHandler(t){this._callback.cancelClick=t,this.getElement().querySelector(".btn-cancel").addEventListener("click",this._cancelClickHandler)}}class b{constructor(t,e){this._container=t,this._changeData=e,this._chunkComponent=null,this._ingredientComponentList={},this._addIngredientClickHandler=this._addIngredientClickHandler.bind(this),this._removeChunkClickHandler=this._removeChunkClickHandler.bind(this),this._editIngredientClickHandler=this._editIngredientClickHandler.bind(this),this._removeIngredientClickHandler=this._removeIngredientClickHandler.bind(this),this._saveIngredientClickHandler=this._saveIngredientClickHandler.bind(this),this._cancelIngredientClickHandler=this._cancelIngredientClickHandler.bind(this)}init(t,e){this._chunk=t,this._products=e,this._editIngredientComponent=null,this._renderChunk()}destroy(){Object.values(this._ingredientComponentList).forEach((t=>a(t))),this._ingredientComponentList={},a(this._chunkComponent)}_renderChunk(){this._chunkComponent=new m(this._chunk),this._chunkComponent.setAddClickHandler(this._addIngredientClickHandler),this._chunkComponent.setRemoveClickHandler(this._removeChunkClickHandler),r(this._container,this._chunkComponent,s),this._chunk.ingredients.forEach((t=>{this._renderIngredient(t)}))}_renderIngredient(t){const e=new g(t,this._products);e.setEditClickHandler(this._editIngredientClickHandler),e.setRemoveClickHandler(this._removeIngredientClickHandler),r(this._chunkComponent,e,s),this._ingredientComponentList[t.id]=e}_addIngredientClickHandler(){if(0===this._products.length)return void alert("Список продуктов пуст! Сначала нужно заполнить его!");const e={id:t(),productId:-1,count:0};this._chunk.ingredients=h(this._chunk.ingredients,e),this._changeData(this._chunk)}_removeChunkClickHandler(){this._changeData(this._chunk,"remove")}_editIngredientClickHandler(t){this._replaceToEdit(t)}_replaceToEdit(t){if(this._editIngredientComponent)return void this._changeData(this._chunk);this._editIngredientComponent=new p(t,this._products),this._editIngredientComponent.setSaveClickHandler(this._saveIngredientClickHandler),this._editIngredientComponent.setCancelClickHandler(this._cancelIngredientClickHandler);const e=this._ingredientComponentList[t.id];c(this._editIngredientComponent,e),a(e),this._ingredientComponentList[t.id]=this._editIngredientComponent}_replaceFromEdit(t){const e=new g(t,this._products);e.setEditClickHandler(this._editIngredientClickHandler),e.setRemoveClickHandler(this._removeIngredientClickHandler),c(e,this._editIngredientComponent),a(this._editIngredientComponent),this._ingredientComponentList[t.id]=e,this._editIngredientComponent=null}_removeIngredientClickHandler(t){this._chunk.ingredients=u(this._chunk.ingredients,t),this._changeData(this._chunk)}_saveIngredientClickHandler(t){this._chunk.ingredients=o(this._chunk.ingredients,t),this._changeData(this._chunk)}_cancelIngredientClickHandler(t){this._replaceFromEdit(t)}}let v=[],H=[];if(localStorage.getItem("products")&&(v=JSON.parse(localStorage.getItem("products"))),localStorage.getItem("chunks"))H=JSON.parse(localStorage.getItem("chunks"));else{const t=["Завтрак","Обед","Ужин"];H=new Array(t.length).fill(null).map(((e,i)=>n(t[i])))}const f=document.querySelector(".main");let I=null;const y=t=>{I&&a(I),I=new d(t),r(f,I,s)},E=i(H,v);y(E);const $=new class{constructor(t,e,n){this._container=t,this._changeData=e,this._chunkPresenter={},this._chunkListComponent=new _,this._addChunkFormComponent=new k,this._chunkUpdateHandler=this._chunkUpdateHandler.bind(this),this._createNewDayHandler=this._createNewDayHandler.bind(this)}init(t,e){this._chunks=t,this._products=e,this._clearList(),this._renderChunkList(),this._renderAddChunkForm()}_clearList(){Object.values(this._chunkPresenter).forEach((t=>t.destroy())),this._chunkPresenter={},a(this._addChunkFormComponent)}_renderChunk(t){const e=new b(this._chunkListComponent,this._chunkUpdateHandler);e.init(t,this._products),this._chunkPresenter[t.id]=e}_renderChunkList(){r(this._container,this._chunkListComponent,s),this._chunks.forEach((t=>this._renderChunk(t)))}_renderAddChunkForm(){r(this._chunkListComponent,this._addChunkFormComponent,s),this._addChunkFormComponent.setClickButtonHandler((t=>this._addChunkHandler(t))),this._addChunkFormComponent.setClickCreateButtonHandler(this._createNewDayHandler)}_chunkUpdateHandler(t,e="update"){switch(e){case"update":this._changeData(o(this._chunks,t));break;case"remove":this._changeData(u(this._chunks,t))}}_addChunkHandler(t){this._changeData(h(this._chunks,n(t)))}_createNewDayHandler(){const t=((t,e)=>{const n=t.map((t=>(t=>({title:t.title,amount:Object.assign({},t.amount),ingredients:t.ingredients.map((t=>Object.assign({},t)))}))(t)));return{amount:i(n,e),chunks:n}})(this._chunks,this._products),e=new Date;e.setDate(e.getDate()-1);const n=`${e.getFullYear()}-${e.getMonth()+1}-${e.getDate()}_${e.getHours()}-${e.getMinutes()}`,s=JSON.parse(localStorage.getItem("story")||"{}");s[n]=t,localStorage.setItem("story",JSON.stringify(s)),this._changeData([])}}(f,(t=>{const e=i(t,v);y(e),localStorage.setItem("chunks",JSON.stringify(t)),$.init(t,v)}));$.init(H,v)})();