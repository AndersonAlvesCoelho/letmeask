import { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';
// import { useTheme } from '../hooks/useTheme';
import { database } from '../services/firebase';

import illustration from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

import '../styles/auth.scss';

export function Home() {

  const history = useHistory();

  const { user, signInWithGoogle } = useAuth();
  // const { theme, toggleTheme } = useTheme();


  const [roomCode, setRoomCode] = useState('');
  //LOGIN
  async function handleCreateRoom() {

    if (!user) {
      await signInWithGoogle();
    }
    history.push('/rooms/new');
  }

  //JOIN ROOM
  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === '') return;

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      alert('Room does not exist.');
      return;
    }

    if(roomRef.val().endeAt){
      alert('Room already closed.');
      return;
    }

    history.push(`/rooms/${roomCode}`);

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

          {/* //MUDAR O TEMA   */}
          {/* <h1>{theme}</h1>
          <button onClick={toggleTheme}>{theme}</button> */}

          <img src={logoImg} alt="Letmeask" />
          <button onClick={handleCreateRoom} className="create-rom">
            <img src={googleIconImg} alt="Logo da Google" />
            Cria sua sala com o Google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Digite o código da sala"
              onChange={e => setRoomCode(e.target.value)}
              value={roomCode}
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