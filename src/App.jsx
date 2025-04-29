import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [vida, setVida] = useState(5)
  const [vivo, setVivo] = useState(true)
  useEffect(() => {
    
    const intervalo = setInterval(() => {
      if(vida <= 0){
        setVivo(false)
        clearInterval(intervalo)
        return 0
        
      }
      setVida((vidaAtual) => vidaAtual - 1)
      
  
      
      

      
  
  
    }, 500)
    // console.log(vida);
    return () => clearInterval(intervalo)
  },[vida])

  function curar(){

    if(vivo){
      if(vida <= 90){
        setVida(vida + 10)
        
      }else{
        setVida(100)
      }
    }else{
      alert("Não tem mais cura...")
    }
      
    console.log(vida);
      
  }

  return (
    <>
      Vida: {vida}
      <button onClick={curar}>Curar</button>
      <div>
        {vivo ? <p>Vivo</p> : <p>Morto</p>}
      </div>

      
    </>
  )
}

export default App
