// Tabela Aluno

const TableNota = {
    arrayTableNota: [
        {
            nome: "Diego",
            nota1: 9.5,
            nota2: 10,
            nota3: 9.5
        },
    ],
    addData(dado) {
        TableNota.arrayTableNota.push(dado);
        local.reload();
    },

    removeData(index) {
        TableNota.arrayTableNota.splice(index, 1);
        local.reload();
    }

}

// dados local

const tabelaDOM = {
    dataTableContainer: document.querySelector("#table-aluno tbody"),
    addDataTable(dado, index) {
        const tr = document.createElement("tr");
        tr.innerHTML = tabelaDOM.innerHTMLDataTable(dado, index);
        tr.dataset.index = index;

        tabelaDOM.dataTableContainer.appendChild(tr);

    },

    innerHTMLDataTable(dado, index) {
        let media = `${((dado.nota1 + dado.nota2 + dado.nota3) / 3).toFixed(1)}`;
        const CSSMEdia = media >= 5 ? "aprovado" : "reprovado";
    
        const html = `
        
        <td class="nome">${dado.nome}</td>
        <td class="media" class=${CSSMEdia}>${media}</td>
        
        <td>
        <button aria-label="Remover Aluno" type="button" onclick="TableNota.removeData(${index})">
          Remover
        </button>
      </td>
        `;
        return html;
    },
        clearData() {
            tabelaDOM.dataTableContainer.innerHTML = "";
        },
};

const Utils = {
    formatNumberField(value) {
      value = Number(value.replace(/\,\./g, ""));
      return value;
    },
    
  };
  

const form = {

    nome: document.querySelector("input#nome"),
    nota1: document.querySelector("input#nota1"),
    nota2: document.querySelector("input#nota2"),
    nota3: document.querySelector("input#nota3"),

    getValues() {
        return {
            nome: form.nome.value,
            nota1: form.nota1.value,
            nota2: form.nota2.value,
            nota3: form.nota3.value,
        };
    },

    validateFields() {
        const { nome, nota1, nota2, nota3 } = form.getValues();
    
        if (
          nome.trim() === "" ||
          nota1.trim() === "" ||
          nota2.trim() === "" ||
          nota3.trim() === ""
        ) {
          throw new Error("Por favor, preencha todos os campos.");
        } else {
          alert("Aluno cadastrado com sucesso!");
        }
      },
      
    formatValues() {
        let { nome, nota1, nota2, nota3 } = form.getValues();
        nota1 = Utils.formatNumberField(nota1);
        nota2 = Utils.formatNumberField(nota2);
        nota3 = Utils.formatNumberField(nota3);
       
    
        return {
          nome,         
          nota1,
          nota2,
          nota3,
        };
      },

    clearFields() {
        form.nome.value = "";
        form.nota1.value = "";
        form.nota2.value = "";
        form.nota3.value = "";
    },

    submit(event) {
        event.preventDefault();
    
        try {
          form.validateFields();
          const arrayTableNota = form.formatValues();
          // salvar
          TableNota.addData(arrayTableNota);
          form.clearFields();
        } catch (error) {
          alert(error.message);
        }
    },
};

const local = {
    init() {
        TableNota.arrayTableNota.forEach((dado, index) => {
            tabelaDOM.addDataTable(dado, index); 
        });
    },
    reload() {
        tabelaDOM.clearData();
        local.init()
    },
};

local.init();