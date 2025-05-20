import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [vida, setVida] = useState(100)
  const [vivo, setVivo] = useState(true)
  const [imagem, setImagem] = useState('/imgs/pinguim td fudido vivo.png')
  const [mensagem, setMensagem] = useState('Saudável')
  const [fome, setFome] = useState(100)
  const [sono, setSono] = useState(10)
  const [dormindo, setDormindo] = useState(false)

// <------VIDA
  
  useEffect(() => {
    const intervalo = setInterval(() => {
      setVida((vidaAtual) => {
        if (vidaAtual <= 0) {
          clearInterval(intervalo)
          setVivo(false)
          setFome(0)
          setSono(0)
          return 0
        }
        return vidaAtual - 1
      })
    }, 500)

    return () => clearInterval(intervalo)
  }, [])


  // <-----FOME----->
  
  useEffect(() => {
    const intervaloFome = setInterval(() => {
      setFome((fomeAtual) => {
        if (fomeAtual > 0 && vida > 0) {
          return fomeAtual - 1
        } else {
          setVida((vidaAtual) => Math.max(0, vidaAtual - 1))
          return 0
        }
      })
    }, 1000)

    return () => clearInterval(intervaloFome)
  }, [])
  

  // <-------SONO------>
  
  useEffect(() => {
    const intervaloSono = setInterval(() => {
      setSono((sonoAtual) => {
        if (!vivo) return sonoAtual

        if (dormindo) {
          return Math.min(100, sonoAtual + 1)
        } else {
          return Math.max(0, sonoAtual - 1)
          
        }
      })
    }, 800)

    return () => clearInterval(intervaloSono)
  }, [vivo, dormindo])

// <-----IMAGENS----->
  
  useEffect(() => {
    atualizarImagem()
  }, [vida, dormindo])

// <-----FUNÇÕES------>
  
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

  function dormir() {
    if (vivo) {
      setDormindo(!dormindo)
    } else {
      alert("Morto não dorme...")
    }
  }

  function atualizarImagem() {
    if (!vivo || vida <= 0) {
      setImagem('/imgs/pinguim td fudido morto.png')
      setMensagem('Morto☠️')
    } else if (dormindo === true) {
      setImagem('/imgs/pinguim td fudido dormindo.png')
      setMensagem('A mimir😴')
    } else if (vida < 20) {
      setImagem('/imgs/pinguim td fudido doente.png')
      setMensagem('Estou doente me cure😢')
    } else {
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
      <div>Sono: {sono}</div>
      <div>Status: {dormindo ? 'Dormindo 😴' : 'Acordado 🌞'}</div>

      <button onClick={curar}>Curar</button>
      <button onClick={comer}>Comer</button>
      <button onClick={dormir}>{dormindo ? 'Acordar' : 'Dormir'}</button>

      <div>
        <p>{mensagem}</p>
      </div>
    </>
  )
}

export default App
