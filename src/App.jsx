import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [vida, setVida] = useState(100)
  const [vivo, setVivo] = useState(true)
  const [imagem, setImagem] = useState('/imgs/pinguim td fudido vivo.png')
  const [mensagem, setMensagem] = useState('Saudável')
  const [fome, setFome] = useState(100)

  
  useEffect(() => {
    const intervalo = setInterval(() => {
      setVida((vidaAtual) => {
        if (vidaAtual <= 0) {
          clearInterval(intervalo)
          setVivo(false)
          return 0
        }
        return vidaAtual - 1
      })
    }, 500)

    return () => clearInterval(intervalo)
  }, [])

  useEffect(() => {
    const intervaloFome = setInterval(() => {
      setFome((fomeAtual) => {
        if (fomeAtual > 0) {
          return fomeAtual - 1
        } else {
          // Fome chegou a zero, pode começar a tirar vida
          setVida((vidaAtual) => Math.max(0, vidaAtual - 1))
          return 0
        }
      })
    }, 500)
  
    return () => clearInterval(intervaloFome)
  }, [])
  

  // Atualiza imagem sempre que a vida mudar
  useEffect(() => {
    atualizarImagem()
  }, [vida])

  function comer() {
    if (vivo) {
      if (fome <= 90) {
        setFome(fome + 10)
        setVida((vidaAtual) => Math.min(100, vidaAtual + 5))
      } else {
        setFome(100)
      }
    } else {
      alert("Não adianta mais comer...")
    }
  }
  


 
  function curar() {
    if (vivo) {
      if (vida <= 90) {
        setVida(vida + 10)
      } else {
        setVida(100)
      }
    } else {
      alert("Não tem mais cura...")
    }
  }

  // Define qual imagem mostrar de acordo com a vida
  function atualizarImagem() {
    if (vida <= 0) {
      setImagem('/imgs/pinguim td fudido morto.png')
      setMensagem('Morto☠️')
    } else if (vida < 20) {
      setImagem('/imgs/pinguim td fudido doente.png')
      setMensagem('Estou doente me cure😢')
    } else if (vida > 20) {
      setImagem('/imgs/pinguim td fudido vivo.png')
      setMensagem('Saudável👍😁')
    }
  }

  return (
    <>
      <div>
        <img src={imagem} alt="Tamagotchi" className="imagem" />
      </div>

      <div>Vida: {vida}</div>
      <div>Fome: {fome}</div>

      <button onClick={curar}>Curar</button>
      <button onClick={comer}>Comer</button>

      <div>
      <p>{mensagem}</p>

      </div>
    </>
  )
}

export default App
