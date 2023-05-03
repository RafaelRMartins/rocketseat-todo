import Logo from './assets/Logo.svg'
import { List } from './components/List'
import Clipboard from './assets/Clipboard.png'
import { PlusCircle } from 'phosphor-react'
import styles from './App.module.css'
import './global.css'
import { ChangeEvent, useState } from 'react'

interface Tasks{
  text: string;
  done: boolean;
}

const storedTasks = localStorage.getItem('@todo:tasks');
const tasksValue = storedTasks ? JSON.parse(storedTasks) : [];

const Task: Tasks[] = tasksValue

function App() {
  const [taskNew, setTaskNew] = useState(Task)
  const [newTextTask, setNewTextTask] = useState('')

  function handleNewTextTask(event: ChangeEvent<HTMLInputElement>){
    setNewTextTask(event.target.value)
  }

  function handleCreateNewTask(){
    if(newTextTask !== ''){
      if(!taskNew.some((item) => item.text === newTextTask)){
        const newTask = {text: newTextTask, done: false}

      setTaskNew([newTask, ...taskNew])
      localStorage.setItem('@todo:tasks', JSON.stringify([newTask, ...taskNew]));
      setNewTextTask('')
      }else{
      alert("Essa tarefa já existe!")
      }
      
    }else{
      alert("O campo tarefa está vazio!")
    }
  }

  function deleteText(textToDelete: string){
    const textWithoutDeletedOne = taskNew.filter(item => {
      return item.text !== textToDelete
    })
    setTaskNew(textWithoutDeletedOne)
    localStorage.setItem('@todo:tasks', JSON.stringify(textWithoutDeletedOne));
  }

  function updateDone(textToDoneUpdate: string){
    const updatedTasks = taskNew.map(task => {
      if(task.text === textToDoneUpdate) {
        task.done = !task.done;
      }
      return task
    })
    setTaskNew(updatedTasks)
    localStorage.setItem('@todo:tasks', JSON.stringify(updatedTasks));
  }

  return (
    <>
      <header className={styles.header}>
        <img src={Logo} />
      </header>

      <main className={styles.main}>
        <div className={styles.newTask}>
          <input type="text" placeholder='Adicione uma nova tarefa' onChange={handleNewTextTask} value={newTextTask} />
          <button onClick={handleCreateNewTask}>Criar <PlusCircle size={20}/></button>
        </div>
        <div className={styles.task}>
          <div className={styles.info}>
            <div className={styles.created}><p>Tarefas criadas</p> <span>{taskNew.length}</span></div>
            <div className={styles.done}><p>Concluídas</p> <span>{taskNew.length ? `${taskNew.filter(task => task.done === true).length} de ${taskNew.length}` : "0" }</span></div>
          </div>
            { taskNew.length ?
              <div>
                {taskNew.filter(task => task.done === false).map(elements => {
                  return(<List key={elements.text} done={elements.done} text={elements.text} onDeleteText={deleteText} onUpdateDone={updateDone} />)
                })}
                {taskNew.filter(task => task.done === true).map(elements => {
                  return(<List key={elements.text} done={elements.done} text={elements.text} onDeleteText={deleteText} onUpdateDone={updateDone} />)
                })}
              </div>
              :
              <div className={styles.noList}>
                <img src={Clipboard} />
                <p>Você ainda não tem tarefas cadastradas</p>
                <span>Crie tarefas e organize seus itens a fazer</span>
              </div>
            }
        </div>
      </main>
    </>
  )
}

export default App
