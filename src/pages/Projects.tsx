import { useState } from 'react';
import { projects } from '../data/projects';
import { ProjectCard, FILTERS, groupOf } from '../components/ProjectCard';
import { SecTitle, Ext, Arrow } from '../components/ui';
import { site } from '../data/projects';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useI18n } from '../i18n';

export default function Projects() {
  const { t } = useI18n();
  useDocumentTitle(t('projects.metaTitle'), t('projects.desc'));
  const [filter, setFilter] = useState<string>('all');
  const list = projects.filter(p => filter === 'all' || groupOf(p) === filter);
  return (
    <main>
      <section className="section section--top"><div className="wrap">
        <SecTitle ghost={t('home.ghost.portfolio')} title={t('projects.title')} />
        <div className="filters">
          <div className="tabs" role="group" aria-label={t('filter.aria')}>
            {FILTERS.map(([k, label]) => <button key={k} className="tab" aria-pressed={filter === k} onClick={() => setFilter(k)}>{t(label)}</button>)}
          </div>
          <Ext className="btn btn--outline" href={site.linkedin}>{t('common.contact')} <Arrow d="ne" /></Ext>
        </div>
        <div className="grid">{list.map((p, i) => <ProjectCard key={p.slug} p={p} index={i} />)}</div>
      </div></section>
    </main>
  );
}
