import { useEffect, useState } from "react";

import { database } from "../services/firebase";
import { useAuth } from "./useAuth";


type FirebaseQuestions = Record<string, {
  author: {
    name: string;
    avatar: string;
  }
  content: string;
  isHighlighted: string;
  isAnswered: string;
  likes: Record<string, {
    authorId: string;
  }>;
}>


type QuestuionType = {
  id: string;
  author: {
    name: string;
    avatar: string;
  }
  content: string;
  isHighlighted: string;
  isAnswered: string;
  likeCount: number;
  likeId: string | undefined;
}



export function useRoom(roomId: string) {
  const { user } = useAuth();
  const [questions, setQuestions] = useState<QuestuionType[]>([]);
  const [title, setTitle] = useState('');


  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`);

    roomRef.on('value', room => {
      const databaseRoom = room.val()
      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};

      //TRANFORMANDO UM OBJETO EM MATRIZ DE ARRAY
      const parsedQuestions = Object.entries(firebaseQuestions).map(([keys, value]) => {
        return {
          id: keys,
          content: value.content,
          author: value.author,
          isHighlighted: value.isHighlighted,
          isAnswered: value.isAnswered,
          likeCount: Object.values(value.likes ?? {}).length,
          likeId: Object.entries(value.likes ?? {}).find(([key, like]) => like.authorId === user?.id)?.[0]
        }
      })
      setTitle(databaseRoom.title)
      setQuestions(parsedQuestions);
    })

    return () => {
      roomRef.off('value')
    }

  }, [roomId, user?.id]);

  return { questions, title };

}