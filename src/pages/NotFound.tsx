import { Link } from 'react-router-dom';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export default function NotFound() {
  useDocumentTitle('Página não encontrada | Beatriz Vieira Ramos');
  return (
    <main className="wrap" style={{ minHeight: '80vh', display: 'grid', placeItems: 'center', textAlign: 'center', paddingTop: 140 }}>
      <div><span className="label g">Erro 404</span><h1 className="h1" style={{ margin: '24px 0 32px' }}>Essa página não existe.</h1><Link className="btn btn--dark" to="/">Voltar ao início</Link></div>
    </main>
  );
}
