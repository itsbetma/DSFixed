import React, { useEffect } from 'react'
import { Header } from './components/header'
import { Emitter } from './components/fixed/emitter'
import { Sequencer } from './components/fixed/sequencer'
import { Receiver } from './components/fixed/receiver'
import { Controller } from './components/controller/controller'
import { ArcherContainer } from 'react-archer'
import { SequencerService } from './sequencer/sequencer'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from './store/store'
import { changeLeftMessages, changeRightMessages } from './store/messages/slice'
import { changeRightIndex, changeRightStarted } from './store/process/slice'

function App() {
  const processAmount = useSelector((state: RootState) => state.process.processAmount)
  const processStarted = useSelector((state: RootState) => state.process.processStarted)

  const dispatch = useDispatch()

  const emulateChanges = async () => {
    for (let i = 0; i <= processAmount; i++) {
      dispatch(changeRightIndex(i))
      await new Promise((res) => setTimeout(res, 2000))
    }
  }

  useEffect(() => {
    if (!processStarted) return
    const sequencer = new SequencerService(processAmount)
    sequencer.generateRandomMessages()
    dispatch(changeLeftMessages(sequencer.leftMessages))
    dispatch(changeRightMessages(sequencer.rightMessages))
    setTimeout(() => {
      dispatch(changeRightStarted(true))
    }, 1000)
    setTimeout(async () => await emulateChanges(), 2000)
  }, [processStarted])

  return (
    <div>
      <Header />
      <Controller />
      {processStarted ? (
        <div className={'w-100 h-100'}>
          <ArcherContainer strokeColor='gray'>
            <div className={'w-full h-full grid grid-cols-5 grid-rows-1 gap-2 text-center'}>
              <div
                className={
                  'col-span-1 col-start-1  bg-emerald-500 p-4 mx-2 rounded my-2 border-2 border-emerald-300 h-16'
                }
              >
                <h3 className={'text-white font-black text-lg'}>Emissor</h3>
              </div>
              <div
                className={
                  'col-span-5 col-start-5 col-start-5 bg-green-500 p-4 mx-2 rounded my-2 border-2 border-green-300 h-16'
                }
              >
                <h3 className={'text-white font-black text-lg'}>Receptor</h3>
              </div>
            </div>
            <div className={'w-full h-full grid grid-cols-5 grid-rows-1 gap-2 my-8'}>
              <Emitter />
              <Sequencer />
              <Receiver />
            </div>
          </ArcherContainer>
        </div>
      ) : (
        <div
          className={
            'h-48 w-2/4 bg-violet-900 rounded-md my-16 m-auto flex justify-center items-center text-white font-bold'
          }
        >
          Por favor clique no botão Executar!
        </div>
      )}
    </div>
  )
}

export default App
