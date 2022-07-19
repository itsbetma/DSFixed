import { ArcherElement } from 'react-archer'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'

type OwnProps = {
  pid: number
  isEmitter?: boolean
}

type Props = OwnProps

export const Process = ({ pid, isEmitter }: Props): JSX.Element => {
  const leftMessages = useSelector((state: RootState) => state.messages.leftMessages)
  const rightMessages = useSelector((state: RootState) => state.messages.rightMessages)
  const rightIndex = useSelector((state: RootState) => state.process.rightIndex)

  const id = isEmitter ? `emitter-process-${pid}` : `receiver-process-${pid}`
  const receiverMessage = rightMessages[rightIndex - 1] || '-'
  const hasVisualFeedback = isEmitter ? false : pid === rightIndex

  const child = (
    <div className={' flex flex-col justify-end items-end'}>
      <div className={'w-min font-bold text-gray-700 text-sm m-0 p-0'}>
        {isEmitter ? leftMessages[pid - 1] : receiverMessage}
      </div>
      <div
        className={`m-2 h-16 w-16 rounded-full ${isEmitter ? 'bg-emerald-500' : 'bg-green-500'} ${
          hasVisualFeedback && 'animate-pulse border-2 border-red-500'
        } flex justify-center items-center`}
      >
        <p className={'text-white font-black'}>P{pid}</p>
      </div>
    </div>
  )
  return isEmitter ? (
    <ArcherElement
      id={id}
      relations={[
        {
          targetId: 'sequencer',
          targetAnchor: 'left',
          sourceAnchor: 'right',
          style: { strokeDasharray: '5,5' },
        },
      ]}
    >
      {child}
    </ArcherElement>
  ) : (
    <ArcherElement id={id}>{child}</ArcherElement>
  )
}
