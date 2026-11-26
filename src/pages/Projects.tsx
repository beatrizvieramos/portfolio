import { useState } from 'react';
import { projects } from '../data/projects';
import { ProjectCard, FILTERS, groupOf } from '../components/ProjectCard';
import { SecTitle, Ext, Arrow } from '../components/ui';
import { site } from '../data/projects';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useI18n, type Key } from '../i18n';

// grupos do sumário (a ordem segue o Figma v2.0); cada projeto cai em UM grupo (ver groupOf)
const SUMMARY: readonly (readonly [string, Key])[] = [['all', 'filter.all'], ['sites', 'filter.sites'], ['produtos', 'filter.products'], ['ferramentas', 'filter.tools'], ['estudos', 'summary.studies']];
const HEADERS: Record<string, readonly [Key, Key]> = {
  all: ['group.all.t', 'group.all.d'],
  sites: ['group.sites.t', 'group.sites.d'],
  produtos: ['group.products.t', 'group.products.d'],
  ferramentas: ['group.tools.t', 'group.tools.d'],
  estudos: ['group.studies.t', 'group.studies.d'],
};
const two = (n: number) => String(n).padStart(2, '0');
const countOf = (k: string) => (k === 'all' ? projects.length : projects.filter(p => groupOf(p) === k).length);

export default function Projects() {
  const { t } = useI18n();
  useDocumentTitle(t('projects.metaTitle'), t('projects.desc'));
  const [filter, setFilter] = useState<string>('all');
  const list = projects.filter(p => filter === 'all' || groupOf(p) === filter);
  const [titleKey, descKey] = HEADERS[filter];
  const idx = FILTERS.findIndex(f => f[0] === filter);
  return (
    <main>
      <section className="section section--top"><div className="wrap">
        <SecTitle ghost={t('home.ghost.portfolio')} title={t('projects.title')} />
        <div className="summary" role="group" aria-label={t('summary.aria')}>
          <div className="summary__head">
            <span className="label">↳ {t('summary.kicker')}</span>
            <p className="h4">{t('summary.total', { n: projects.length })}</p>
          </div>
          <div className="summary__chips">
            {SUMMARY.map(([k, label]) => (
              <button key={k} type="button" className={`schip${k === 'estudos' ? ' schip--pink' : ''}`} aria-pressed={filter === k} onClick={() => setFilter(k)}>
                <b>{two(countOf(k))}</b><i aria-hidden="true" /><span>{t(label)}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="filters filters--end">
          
          <Ext className="btn btn--outline" href={site.linkedin}>{t('common.contact')} <Arrow d="ne" /></Ext>
        </div>
        <div className="ghead" role="region" aria-live="polite" aria-atomic="true" aria-label={t('group.aria')}>
          <div className="ghead__row">
            <span className="ghead__n label">{two(Math.max(idx, 0))}</span>
            <h2 className="ghead__t">{t(titleKey)}</h2>
            <span className="ghead__c label">{t('group.count', { n: list.length })}</span>
          </div>
          <p className="ghead__d">{t(descKey)}</p>
        </div>
        <div className="grid">{list.map((p, i) => <ProjectCard key={p.slug} p={p} index={i} />)}</div>
      </div></section>
    </main>
  );
}
