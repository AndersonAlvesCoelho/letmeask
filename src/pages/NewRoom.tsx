import { Link, useHistory } from 'react-router-dom';
import { FormEvent, useState } from 'react';

import { Button } from '../components/Button'
import { database } from '../services/firebase';
import { useAuth } from '../hooks/useAuth';

import illustration from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';

import '../styles/auth.scss';

export function NewRoom() {

  const history = useHistory();

  const { user } = useAuth();
  const [newRoom, setNewRoom] = useState('');

  //CREATE ROOMs
  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    if (newRoom.trim() === '') return;

    const roomRef = database.ref('rooms');

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    });

    history.push(`/rooms/${firebaseRoom.key}`);
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
          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="Nome da sala"
              onChange={e => setNewRoom(e.target.value)}
              value={newRoom}
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