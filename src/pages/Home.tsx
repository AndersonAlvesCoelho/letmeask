import { useHistory } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/Button';

import illustration from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

import '../styles/auth.scss';

export function Home() {

  const history = useHistory();

  const { user, signInWithGoogle } = useAuth();

  async function handleCreateRoom() {

    if (!user) {
      await signInWithGoogle();
    }
    history.push('/rooms/new');
  }

  return (
    <div id="page-auth">
      <aside>
        <img
          src={illustration}
          alt="Illustration simbolizando perguntas e repsotas."
        />
        <strong>Cria sala de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua adiência em tempo-real.</p>
      </aside>

      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />
          <button onClick={handleCreateRoom} className="create-rom">
            <img src={googleIconImg} alt="Logo da Google" />
            Cria sua sala com o Google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form>
            <input
              type="text"
              placeholder="Digite o código da sala"
            />
            <Button type="submit">
              Entra na sala
            </Button>
          </form>
        </div>
      </main>
    </div>
  )
}