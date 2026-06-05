const API_BASE_URL = 'http://localhost:3000';

async function getReports() {
  const res = await fetch(`${API_BASE_URL}/reports`);
  if (!res.ok) throw new Error('Erro ao buscar reports');
  return res.json();
}

async function createReport(formData) {
  const res = await fetch(`${API_BASE_URL}/reports`, {
    method: 'POST',
    body: formData,
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || 'Erro ao enviar report');
  }
  return res.json();
}

async function getComentarios(reportId) {
  const res = await fetch(`${API_BASE_URL}/reports/${reportId}/comentarios`);
  if (!res.ok) throw new Error('Erro ao buscar comentários');
  return res.json();
}

async function createComentario(reportId, conteudo) {
  const res = await fetch(`${API_BASE_URL}/reports/${reportId}/comentarios`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ conteudo }),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || 'Erro ao enviar comentário');
  }
  return res.json();
}
