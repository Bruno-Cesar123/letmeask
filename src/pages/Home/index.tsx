import { FormEvent, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { ThemeContext } from 'styled-components';
import Switch from 'react-switch';
import { toast } from 'react-toastify';

import { Button } from '../../components/Button';

import { useAuth } from '../../hooks/useAuth';

import { database } from '../../services/Firebase';

import illustrationImg from '../../assets/images/illustration.svg';
import logoImg from '../../assets/images/logo.svg';
import googleIconImg from '../../assets/images/google-icon.svg';

import { Container } from './styles';

interface Props {
  toggleTheme(): void;
}


export function Home({toggleTheme }: Props) {
  const { colors, title } = useContext(ThemeContext);
  const history = useHistory();
  const { user, singInWithGoogle} = useAuth();
  const [roomCode, setRoomCode] = useState('');
  

  async function handleCreateRoom() {
    try {
      if (!user) {
        await singInWithGoogle()
      }
  
      history.push('/rooms/new');
      toast.success('Logon realizado com sucesso');
    } catch (err) {
      toast.error('Ocorreu um erro ao realizar o logon');
    }
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if(roomCode.trim() === '') {
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if(!roomRef.exists()) {
      alert('Room does not exists');
      return;
    }

    if(roomRef.val().endedAt) {
      alert('Room already closed');
      return;
    }

    history.push(`/rooms/${roomCode}`);
  }

  return (
    <Container>
     
      <aside>
        <img src={illustrationImg} alt="Ilustração simbolizando pergunta e respostas" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>
      <main>
        
        <div className="main-content">
          <div className="theme-change">
            <Switch 
              onChange={toggleTheme}
              checked={title === 'dark'}
              checkedIcon={false}
              uncheckedIcon={false}
              height={10}
              width={40}
              handleDiameter={20}
              offColor="#333"
              onColor={colors.secundary}
            />
          </div>
          <img src={logoImg} alt="letmeask" />
          <button onClick={handleCreateRoom} className="create-room">
            <img src={googleIconImg} alt="Logo do Google" />
            Crie sua sala com o Google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Digite o código da sala"
              onChange={event => setRoomCode(event.target.value)}
              value={roomCode}
            />
            <Button type="submit">
              Entrar na sala
            </Button>
          </form>
        </div>
      </main>
    </Container>
  )
}