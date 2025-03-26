document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("leadForm").addEventListener("submit", function (event) {
        event.preventDefault();
        
        let nome = document.getElementById("nome").value;
        let email = document.getElementById("email").value;
        let telefone = document.getElementById("telefone").value;
        let empresa = document.getElementById("empresa").value;
        
        let dados = {
            nome: nome,
            email: email,
            telefone: telefone,
            empresa: empresa
        };
        
        console.log("Dados enviados:", dados);
        alert("Cadastro realizado com sucesso! Entraremos em contato em breve.");
        document.getElementById("leadForm").reset();
    });
});