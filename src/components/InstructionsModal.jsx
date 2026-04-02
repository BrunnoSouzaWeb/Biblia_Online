import React, { useEffect } from "react";
import "./InstructionsModal.css";

function InstructionsModal({ isOpen, onClose }) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
    } else {
      document.removeEventListener("keydown", handleEsc);
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          X
        </button>
        <h2>Instruções</h2>
        <div className="modal_regras">
          <p>
            1. Digite o nome do Livro, o número do Capítulo e o número do
            Versículo (ex. João 3:16) para mostrar este versículo em especial.
            Caso não coloque o versículo, todo o capítulo será mostrado.
          </p>
          <p>
            2. Observe que não deve haver separação entre o número do capítulo,
            o dois pontos (:) e o número do versículo. É permitido colocar
            vários espaços em branco entre o Livro e o número do Capítulo.
          </p>
          <p>
            3. No caso em que temos mais de uma carta do livro (ex. 1 carta aos
            Coríntios) digite primeiro o número da carta e siga as duas
            instruções anteriores. Adicionalmente só pode haver um único espaço
            em branco antecedendo o nome do Livro.
          </p>
          <p>4. A versão utilizada foi a Jõao Almeida.</p>
          <p>
            5. Não seguindo as instruções anteriores o versículo não será
            encontrado devido a construção da API utilizada. Uma mensagem de
            erro será exibida com o conteúdo na íntegra que foi digitado.
          </p>
          <p>
            6. Pode usar maísculo ou minúsculo, bem como colocar acento ou não.
          </p>
          <p>
            7. Clique no botão "Mostrar um versículo aleatório" para ver um
            versículo aleatório.
          </p>
          <p>
            8. As instruções podem ser fechadas clicando no "X", clicando fora
            da caixa de diálogo ou pressionando ESC.
          </p>
        </div>
      </div>
    </div>
  );
}

export default InstructionsModal;
