    const inputCep = document.getElementById('cepInput');
    const btnSearchAdress = document.getElementById('btnSearchAdress');
    const divAdressResult = document.getElementById('adressResult');

    async function searchAddress() {
      const cep = inputCep.value;
      const removeCepLetters = cep.replace(/\D/g, ''); // Remove tudo que não é dígito 
      
      divAdressResult.style.display = 'block';
      divAdressResult.innerHTML = '<p>Buscando...</p>';

      if (removeCepLetters.length !== 8) {
        divAdressResult.innerHTML = '<p class="erro">Por favor, digite um CEP válido (8 dígitos).</p>';
        return;
      }

      const url = `https://viacep.com.br/ws/${removeCepLetters}/json/`;

      try {
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error('Falha ao buscar o CEP.');
        }

        const endereco = await response.json();

        if (endereco.erro) {
          divAdressResult.innerHTML = '<p class="erro">CEP não encontrado.</p>';
          return;
        }

        divAdressResult.innerHTML = `
          <p><strong>Logradouro:</strong> ${endereco.logradouro}</p>
          <p><strong>Bairro:</strong> ${endereco.bairro}</p>
          <p><strong>Cidade:</strong> ${endereco.localidade} - ${endereco.uf}</p>
          <p><strong>DDD:</strong> ${endereco.ddd}</p>
        `;
        
      } catch (error) {
        divAdressResult.innerHTML = `<p class="erro">Erro na requisição: ${error.message}</p>`;
      }
    }

    //Chamada da função
    btnSearchAdress.addEventListener('click', searchAddress);