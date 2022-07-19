import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { Process } from '../process/process'

export const Receiver = (): JSX.Element => {
  const processAmount = useSelector((state: RootState) => state.process.processAmount)
  return (
    <div className={'w-100 h-100 flex items-center justify-center flex-col'}>
      {[...Array(processAmount)].map((process, index) => {
        return (
          <div key={`process-receiver-${index}`}>
            <Process pid={index + 1} />
          </div>
        )
      })}
    </div>
  )
}
