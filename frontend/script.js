document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("leadForm").addEventListener("submit", async function (event) {
        event.preventDefault();

        let nome = document.getElementById("nome").value.trim();
        let email = document.getElementById("email").value.trim();
        let telefone = document.getElementById("telefone").value.trim();
        let empresa = document.getElementById("empresa").value.trim();
        let graduacao = document.getElementById("graduacao") ? document.getElementById("graduacao").value.trim() : "";

        if (!nome || !email || !telefone || !empresa || !graduacao) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        let dados = { nome, email, telefone, empresa, graduacao };

        try {
            let resposta = await fetch("http://localhost:3000/api/lead", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dados)
            });

            let resultado = await resposta.json();

            if (resposta.ok) {
                document.getElementById("leadForm").reset();

                
                let link = document.createElement("a");
                link.href = "http://localhost:3000/api/download"; 
                link.setAttribute("download", "Hello.txt");
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } else {
                alert("Erro: " + resultado.error);
            }
        } catch (erro) {
            console.error("Erro ao enviar os dados:", erro);
            alert("Ocorreu um erro. Tente novamente mais tarde.");
        }
    });
});
