import { Link } from 'react-router-dom';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useI18n } from '../i18n';

export default function NotFound() {
  const { t } = useI18n();
  useDocumentTitle(t('nf.title'));
  return (
    <main className="wrap" style={{ minHeight: '80vh', display: 'grid', placeItems: 'center', textAlign: 'center', paddingTop: 140 }}>
      <div><span className="label g">{t('nf.code')}</span><h1 className="h1" style={{ margin: '24px 0 32px' }}>{t('nf.text')}</h1><Link className="btn btn--dark" to="/">{t('nf.back')}</Link></div>
    </main>
  );
}
