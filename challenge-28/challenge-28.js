(function(win, doc) {
  'use strict';

  /*
    No HTML:
    - Crie um formulário com um input de texto que receberá um CEP e um botão
    de submit;
    - Crie uma estrutura HTML para receber informações de endereço:
    "Logradouro, Bairro, Estado, Cidade e CEP." Essas informações serão
    preenchidas com os dados da requisição feita no JS.
    - Crie uma área que receberá mensagens com o status da requisição:
    "Carregando, sucesso ou erro."

    No JS:
    - O CEP pode ser entrado pelo usuário com qualquer tipo de caractere, mas
    deve ser limpo e enviado somente os números para a requisição abaixo;
    - Ao submeter esse formulário, deve ser feito um request Ajax para a URL:
    "https://viacep.com.br/ws/[CEP]/json/", onde [CEP] será o CEP passado
    no input criado no HTML;
    - Essa requisição trará dados de um CEP em JSON. Preencha campos na tela
    com os dados recebidos.
    - Enquanto os dados são buscados, na área de mensagens de status, deve mostrar
    a mensagem: "Buscando informações para o CEP [CEP]..."
    - Se não houver dados para o CEP entrado, mostrar a mensagem:
    "Não encontramos o endereço para o CEP [CEP]."
    - Se houver endereço para o CEP digitado, mostre a mensagem:
    "Endereço referente ao CEP [CEP]:"
    - Utilize a lib DOM criada anteriormente para facilitar a manipulação e
    adicionar as informações em tela.
    */

  var $inputCep = doc.querySelector('[data-js="inputCep"]');
  var $buttonCep = doc.querySelector('[data-js="button"]');

  var $logradouro = doc.querySelector('[data-js="logradouro"]');
  var $bairro = doc.querySelector('[data-js="bairro"]');
  var $estado = doc.querySelector('[data-js="estado"]');
  var $cidade = doc.querySelector('[data-js="cidade"]');
  var $cep = doc.querySelector('[data-js="cep"]');

  var $message = doc.querySelector('#message');

  var ajax = new XMLHttpRequest();

  $buttonCep.addEventListener('click', function(e) {
    e.preventDefault();
    var cep = $inputCep.value.match(/\d+/g).join('');
    $message.value = 'Buscando informações para o CEP ' + cep + '...';
    ajax.open('GET', 'https://viacep.com.br/ws/' + cep + '/json/');
    ajax.send();
  });

  var response = '';

  ajax.addEventListener('readystatechange', function() {
    if (isResquestOk()) {
      try {
        response = JSON.parse(ajax.responseText);

        if (response.erro) {
          var cepErrado = ajax.responseURL.match(/\d+/g).join('');
          $message.value =
            'Não encontramos o endereço para o CEP ' + cepErrado + '.';
        } else {
          $logradouro.value = response.logradouro;
          $bairro.value = response.bairro;
          $estado.value = response.uf;
          $cidade.value = response.localidade;
          $cep.value = response.cep;
          $message.value = 'Endereço referente ao CEP ' + response.cep + ':';
        }
      } catch (e) {
        console.log(e);
      }
    }
  });

  function isResquestOk() {
    return ajax.readyState === 4 && ajax.status === 200;
  }
})(window, document);
