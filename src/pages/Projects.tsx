import { useState } from 'react';
import { projects } from '../data/projects';
import { ProjectCard, groupOf } from '../components/ProjectCard';
import { SecTitle, Ext, Arrow } from '../components/ui';
import { site } from '../data/projects';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

const FILTERS = [['all', 'Todos'], ['sites', 'Sites'], ['produtos', 'Produtos'], ['ferramentas', 'Ferramentas']] as const;

export default function Projects() {
  useDocumentTitle('Todos os projetos | Beatriz Vieira Ramos', 'Todos os projetos de Beatriz Vieira Ramos: sites, produtos digitais e ferramentas.');
  const [filter, setFilter] = useState<string>('all');
  const list = projects.filter(p => filter === 'all' || groupOf(p) === filter);
  return (
    <main>
      <section className="section" style={{ paddingTop: 140 }}><div className="wrap">
        <SecTitle ghost="PORTFÓLIO" title="Todos os projetos" />
        <div className="filters">
          <div className="tabs" role="group" aria-label="Filtrar projetos">
            {FILTERS.map(([k, label]) => <button key={k} className="tab" aria-pressed={filter === k} onClick={() => setFilter(k)}>{label}</button>)}
          </div>
          <Ext className="btn btn--outline" href={site.linkedin}>Entre em contato <Arrow d="ne" /></Ext>
        </div>
        <div className="grid">{list.map((p, i) => <ProjectCard key={p.slug} p={p} index={i} />)}</div>
      </div></section>
    </main>
  );
}
