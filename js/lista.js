async function carregarReports() {
  const lista = document.getElementById('lista-reports');
  try {
    const reports = await getReports();
    lista.innerHTML = '';

    if (reports.length === 0) {
      lista.innerHTML = '<li>Nenhum report registrado ainda.</li>';
      return;
    }

    for (const report of reports) {
      lista.appendChild(renderReport(report));
    }
  } catch {
    lista.innerHTML = '<li>Erro ao carregar reports. Verifique a conexão com a API.</li>';
  }
}

function renderReport(report) {
  const li = document.createElement('li');
  li.className = 'report-item';
  li.dataset.id = report.id;

  const data = new Date(report.created_at).toLocaleString('pt-BR');
  const sevLabels = { 1: 'Baixa', 2: 'Média', 3: 'Alta' };

  li.innerHTML = `
    <h3>${escapeHtml(report.endereco)}</h3>
    <p class="report-meta">
      <span class="severidade-badge sev-${report.severidade}" aria-label="Severidade ${sevLabels[report.severidade]}">
        Severidade ${report.severidade} — ${sevLabels[report.severidade]}
      </span>
      &nbsp;· ${data}
    </p>
    ${report.descricao ? `<p>${escapeHtml(report.descricao)}</p>` : ''}
    ${report.foto_url ? `<img class="report-foto" src="${escapeHtml(report.foto_url)}" alt="Foto do problema em ${escapeHtml(report.endereco)}" />` : ''}
    <button class="comentarios-toggle" aria-expanded="false" aria-controls="comentarios-${report.id}">
      Ver comentários
    </button>
    <div class="comentarios-secao" id="comentarios-${report.id}" hidden>
      <ul class="comentarios-lista" aria-label="Comentários do report"></ul>
      <form class="form-comentario" aria-label="Adicionar comentário">
        <input type="text" placeholder="Seu comentário" aria-label="Texto do comentário" required />
        <button type="submit">Enviar</button>
      </form>
    </div>
  `;

  const toggle = li.querySelector('.comentarios-toggle');
  const secao = li.querySelector('.comentarios-secao');

  toggle.addEventListener('click', async () => {
    const aberto = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!aberto));
    secao.hidden = aberto;
    if (!aberto) await renderComentarios(report.id, li);
  });

  li.querySelector('.form-comentario').addEventListener('submit', async (e) => {
    e.preventDefault();
    const input = e.target.querySelector('input');
    const conteudo = input.value.trim();
    if (!conteudo) return;
    try {
      await createComentario(report.id, conteudo);
      input.value = '';
      await renderComentarios(report.id, li);
    } catch (err) {
      alert(err.message);
    }
  });

  return li;
}

async function renderComentarios(reportId, li) {
  const ul = li.querySelector('.comentarios-lista');
  try {
    const comentarios = await getComentarios(reportId);
    ul.innerHTML = '';
    if (comentarios.length === 0) {
      ul.innerHTML = '<li>Sem comentários ainda.</li>';
      return;
    }
    for (const c of comentarios) {
      const item = document.createElement('li');
      const data = new Date(c.created_at).toLocaleString('pt-BR');
      item.innerHTML = `${escapeHtml(c.conteudo)} <span class="comentario-data">(${data})</span>`;
      ul.appendChild(item);
    }
  } catch {
    ul.innerHTML = '<li>Erro ao carregar comentários.</li>';
  }
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

document.addEventListener('DOMContentLoaded', carregarReports);
