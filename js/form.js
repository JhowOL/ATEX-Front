document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-report');
  const feedback = document.getElementById('feedback-form');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    limparErros();

    const endereco = form.endereco.value.trim();
    const severidade = form.severidade.value;
    const descricao = form.descricao.value.trim();
    const foto = form.foto.files[0];

    let valido = true;

    if (!endereco) {
      mostrarErro('erro-endereco', 'Endereço é obrigatório');
      valido = false;
    }

    if (!severidade) {
      mostrarErro('erro-severidade', 'Selecione a severidade');
      valido = false;
    }

    if (foto) {
      if (!['image/jpeg', 'image/png'].includes(foto.type)) {
        mostrarErro('erro-foto', 'Apenas JPEG e PNG são aceitos');
        valido = false;
      } else if (foto.size > 5 * 1024 * 1024) {
        mostrarErro('erro-foto', 'A foto deve ter no máximo 5 MB');
        valido = false;
      }
    }

    if (!valido) return;

    const formData = new FormData();
    formData.append('endereco', endereco);
    formData.append('severidade', severidade);
    if (descricao) formData.append('descricao', descricao);
    if (foto) formData.append('foto', foto);

    try {
      await createReport(formData);
      form.reset();
      feedback.textContent = 'Report enviado com sucesso!';
      feedback.style.color = 'var(--cor-sucesso)';
      await carregarReports();
    } catch (err) {
      feedback.textContent = err.message;
      feedback.style.color = 'var(--cor-erro)';
    }
  });

  function mostrarErro(id, mensagem) {
    const el = document.getElementById(id);
    if (el) el.textContent = mensagem;
  }

  function limparErros() {
    ['erro-endereco', 'erro-severidade', 'erro-foto'].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.textContent = '';
    });
    feedback.textContent = '';
  }
});
