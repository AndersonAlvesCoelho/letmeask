import { useHistory, useParams } from 'react-router-dom';

import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomConde';
import { Question } from '../components/Question';
import { useRoom } from '../hooks/useRoom';
import { database } from '../services/firebase';

import logoImg from '../assets/images/logo.svg';
import deleteImg from '../assets/images/delete.svg';

import '../styles/room.scss';

type RoomParams = {
  id: string;
}

export function AdminRoom() {

  const params = useParams<RoomParams>();
  const roomId = params.id;

  const history = useHistory();
  const { questions, title } = useRoom(roomId);

  async function handleEndRoom(){
    database.ref(`rooms/${roomId}`).update({ 
      endeAt: new Date(),
    })

    history.push('/');
  }

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm('Tem certeza que você deseja exluir esta pergunta?')) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <div >
            <RoomCode code={roomId} />
            <Button isOutlined onClick={handleEndRoom}>Encerra Sala</Button>
          </div>
        </div>
      </header>

      <main className="content">
        <div className="room-title">
          <h1>{title}</h1>
          {questions.length !== 0 &&
            <span>{questions.length} pergunta(s)</span>
          }
        </div>


        <div className="question-list">
          {questions.map(question => {
            return (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
              >
                <button
                  onClick={() => handleDeleteQuestion(question.id)}
                >
                  <img src={deleteImg} alt="Remover pergunta" />
                </button>
              </Question>
            )
          })}
        </div>
      </main>
    </div >
  );
}