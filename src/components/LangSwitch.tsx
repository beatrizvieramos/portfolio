import { LANGS, LANG_NAME, useI18n } from '../i18n';

/** Seletor PT | EN | ES: botões com aria-pressed, rótulo no idioma de cada opção. */
export function LangSwitch({ variant = 'light', className = '' }: { variant?: 'light' | 'dark'; className?: string }) {
  const { lang, setLang, t } = useI18n();
  return (
    <div className={`lang lang--${variant} ${className}`.trim()} role="group" aria-label={t('lang.label')}>
      {LANGS.map(l => (
        <button key={l} type="button" className="lang__btn" lang={l} aria-pressed={lang === l} aria-label={`${LANG_NAME[l]} (${l.toUpperCase()})`} title={LANG_NAME[l]} onClick={() => setLang(l)}>{l.toUpperCase()}</button>
      ))}
    </div>
  );
}
