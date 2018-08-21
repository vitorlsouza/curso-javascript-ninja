(function(win, doc) {
  'use strict';
  /*
Aproveitando a lib DOM que fizemos na semana anterior, crie agora para ela
métodos semelhantes aos que existem no array, mas que sirvam para os
elementos do DOM selecionados.
Crie os seguintes métodos:
- forEach, map, filter, reduce, reduceRight, every e some.

Crie também métodos que verificam o tipo do objeto passado por parâmetro.
Esses métodos não precisam depender de criar um novo elmento do DOM, podem
ser métodos estáticos.

Métodos estáticos não obrigam o uso do `new`, podendo ser usados diretamente
no objeto, como nos exemplos abaixo:
DOM.isArray([1, 2, 3]); // true
DOM.isFunction(function() {}); // true
DOM.isNumber('numero'); // false

Crie os seguintes métodos para verificação de tipo:
- isArray, isObject, isFunction, isNumber, isString, isBoolean, isNull.
O método isNull deve retornar `true` se o valor for null ou undefined.
*/

  function DOM(elements) {
    this.element = doc.querySelectorAll(elements);
  }

  DOM.prototype.on = function on(event, callback) {
    this.element.forEach(function(element) {
      element.addEventListener(event, callback, false);
    });
  };

  DOM.prototype.off = function off(event, callback) {
    this.element.forEach(function(element) {
      element.removeEventListener(event, callback, false);
    });
  };

  DOM.prototype.get = function get() {
    return this.element;
  };

  DOM.prototype.applyMethod = function applyMethod(method, callback) {
    switch (method) {
      case 'forEach':
        return Array.prototype.forEach.call(this.element, callback);
      case 'map':
        return Array.prototype.map.call(this.element, callback);
      case 'filter':
        return Array.prototype.filter.call(this.element, callback);
      case 'reduce':
        return Array.prototype.reduce.call(this.element, callback);
      case 'reduceRight':
        return Array.prototype.reduceRight.call(this.element, callback);
      case 'every':
        return Array.prototype.every.call(this.element, callback);
      case 'some':
        return Array.prototype.some.call(this.element, callback);
    }
  };

  DOM.prototype.verifyType = function verifyType(param, type) {
    return Object.prototype.toString.call(param) === '[object ' + type + ']';
  };

  function handleClick(e) {
    e.preventDefault();
    console.log('clicou');
  }

  var $a = new DOM('[data-js="link"]');
  $a.on('click', handleClick);

  $a.off('click', handleClick);

  $a.applyMethod('map', function(item) {
    console.log(item);
  });

  var dom = new DOM();
  console.log(dom.verifyType([1, 2, 3], 'Array'));

  console.log('Elementos selecionados:', $a.get());
  console.log('$a é filho de body?', $a.get()[0].parentNode === document.body);
})(window, document);
