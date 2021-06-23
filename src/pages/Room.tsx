import { FormEvent, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import '../styles/room.scss'
import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';

type FirebaseQuestion = Record<string, {
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isAnswered: string;
    isHighlighted: string;
}>

type Questions = {
    id: string;
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isAnswered: string;
    isHighlighted: string;
};

type RoomParams = {
    roomId: string;
}

export function Room() {
    const { user } = useAuth();
    const params = useParams<RoomParams>();
    
    const [ newQuestion, setNewQuestion ] = useState('');
    const [ questions, setQuestions ] = useState<Questions[]>([]);
    const [ title, setTitle ] = useState('');
    

    const roomId = params.roomId;

    useEffect(() => {
        const roomRef = database.ref(`rooms/${roomId}`);

        roomRef.on('value', room => {
            const databaseRoom = room.val();
            const firebaseQuestions: FirebaseQuestion = databaseRoom.questions;

            const parsedQuestions = Object.entries(firebaseQuestions ?? {}).map(([key, value])=> {
                return {
                    id: key,
                    content: value.content,
                    author: value.author,
                    isAnswered: value.isAnswered,
                    isHighlighted: value.isHighlighted,
                }
            })

            setTitle(databaseRoom.title)
            setQuestions(parsedQuestions)
        })
    }, [roomId])

    async function handleSendQuestion (event: FormEvent){
        event.preventDefault();
        if(newQuestion.trim() === ''){
            return;
        }

        if(!user){
            throw new Error('You must be logged in')
        }

        const question = {
            content: newQuestion,
            author: {
                name: user.name,
                avatar: user.avatar
            },
            isHighlighted: false,
            isAnswered: false
        }

        await database.ref(`rooms/${roomId}/questions`).push(question);

        setNewQuestion('');
    }

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="Letmeask" />
                    <RoomCode code={roomId}/>
                </div>
            </header>

            <main>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && <span>{questions.length} pergunta{questions.length > 1 && 's'}</span>}
                </div>

                <form onSubmit={handleSendQuestion}>
                    <textarea 
                        placeholder="O que você quer perguntar?"
                        value={newQuestion}
                        onChange={event => setNewQuestion(event.target.value)}
                    />
                    <div className="form-footer">
                        { user ? (
                            <div className="user-info">
                                <img src={user.avatar} alt={user.name} />
                                <span>{user.name}</span>
                            </div>
                        ) : (
                            <span>Para enviar uma pergunta, <button>faça seu Login</button>.</span>
                        ) }
                        
                        <Button type="submit" disabled={!user}>Enviar Pergunta</Button>
                    </div>
                </form>

                {JSON.stringify(questions)}
            </main>
        </div>
    )
}