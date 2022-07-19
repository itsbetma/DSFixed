import { Process } from '../process/process'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'

export const Emitter = (): JSX.Element => {
  const processAmount = useSelector((state: RootState) => state.process.processAmount)
  return (
    <div className={'w-100 h-100 flex items-center justify-center flex-col'}>
      {[...Array(processAmount)].map((process, index) => {
        return (
          <div key={`process-emitter-${index}`}>
            <Process pid={index + 1} isEmitter={true} />
          </div>
        )
      })}
    </div>
  )
}
