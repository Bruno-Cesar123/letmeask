import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Modal from 'react-modal';

import logoImg from '../../assets/images/logo.svg';
import deleteImg from '../../assets/images/delete.svg';
import checkImg from '../../assets/images/check.svg';
import answerImg from '../../assets/images/answer.svg';

import { Button } from '../../components/Button';
import { RoomCode } from '../../components/RoomCode';
import { Question } from '../../components/Question';
import { useAuth } from '../../hooks/useAuth';

import { useRoom } from '../../hooks/useRoom';
import { database } from '../../services/Firebase';

import { Container } from './styles';

import './styles.scss';

type RoomParams = {
  id: string;
}

Modal.setAppElement("#root");


export function AdminRoom() {
  const { signOut } = useAuth();
  const history = useHistory();
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const [modal, setModal] = useState(false);
  const { questions, title } = useRoom(roomId);

  async function handleEndRoom() {
    try {

      await database.ref(`rooms/${roomId}`).update({
        endedAt: new Date(),
      });

      signOut();
      history.push('/');
      toast.success('Sala encerrada com sucesso');
    } catch (err) {
      toast.error('Ocorreu um erro ao encerrar a sala');
    }

  }

  async function handleDeleteQuestion(questionId: string) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
      setModal(false);
  }

  async function handleCheckQuestionAsAnswered(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true
    });
  }

  async function handleHighlightQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true
    });
  }

  function toggleModal() {
    setModal(!modal);
  }

  return (
    <Container id="main">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <div>
            <RoomCode code={roomId} />
            <Button isOutlined onClick={handleEndRoom}>Encerrar sala</Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta</span>}
        </div>

        <div className="question-list">
          {questions.length > 0 ? questions.map(question => {
            return (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
                isAnswered={question.isAnswered}
                isHighlighted={question.isHighlighted}

              >

                {!question.isAnswered && (
                  <>
                    <button
                      type="button"
                      onClick={() => handleCheckQuestionAsAnswered(question.id)}
                    >
                      <img src={checkImg} alt="Marcar pergunta como respondida" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleHighlightQuestion(question.id)}
                    >
                      <img src={answerImg} alt="Dar destaque à pergunta" />
                    </button>
                  </>
                )}
                <>
                  <button
                    type="button"
                    onClick={toggleModal}
                  >
                    <img src={deleteImg} alt="Remover pergunta" />
                  </button>

                  <Modal
                    isOpen={modal}
                    onRequestClose={toggleModal}
                    className="modal"
                    overlayClassName="overlay"
                    closeTimeoutMS={500}
                  >
                    <h1>Deseja deletar a pergunta?</h1>
                    <div className="buttons">
                      <button className="confirm" onClick={() => handleDeleteQuestion(question.id)}>Confirmar</button>
                      <button className="cancel" onClick={toggleModal}>Cancelar</button>
                    </div>
                  </Modal>
                  
                </>
              </Question>
            )
          }) : (
            <div className="any-questions">
              <h1>Não há nenhuma pergunta.</h1>
            </div>
          )}
        </div>
      </main>

    </Container>
  )
}