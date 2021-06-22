import { Link } from 'react-router-dom';

// import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/Button'

import illustration from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';

import '../styles/auth.scss';

export function NewRoom() {

  // const { user } = useAuth();

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
          <h2>Criar uma nova sala</h2>
          <form>
            <input
              type="text"
              placeholder="Nome da sala"
            />
            <Button type="submit">
              Criar sala
            </Button>
          </form>

          <p>Quer entrar uma sala existente? <Link to="/">Clique aqui</Link></p>
        </div>
      </main>
    </div>
  )
}