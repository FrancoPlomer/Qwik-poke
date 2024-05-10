import { component$ } from '@builder.io/qwik';
import { QwikLogo } from '../../icons/icons/qwik';
import styles from './navbar.module.css';
import { useNavigate } from '@builder.io/qwik-city';

export default component$(() => {
  const nav = useNavigate();
  return (
    <header class={styles.header}>
      <div class={['container', styles.wrapper]}>
        <div style={{ cursor: 'pointer' }} class={styles.logo}>
          <a  onClick$={() => nav('/')} title="qwik">
            <QwikLogo height={50} />
          </a>
        </div>
        <ul>
          <li>
            <a style={{ cursor: 'pointer' }} onClick$={() => nav('/pokemons/list-ssr?offset=10')}>
              List-ssr
            </a>
          </li>
          <li>
            <a style={{ cursor: 'pointer' }} onClick$={() => nav('/pokemons/list-client')}>
              List-client
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
});
