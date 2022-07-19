import { ArcherElement } from 'react-archer'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { RelationType } from 'react-archer/lib/types'
import { join } from 'lodash'

export const Sequencer = (): JSX.Element => {
  const processAmount = useSelector((state: RootState) => state.process.processAmount)
  const leftMessages = useSelector((state: RootState) => state.messages.leftMessages)
  const rightMessages = useSelector((state: RootState) => state.messages.rightMessages)

  const relations = [...Array(processAmount)].map((process, index) => {
    return {
      targetId: `receiver-process-${index + 1}`,
      sourceAnchor: 'right',
      targetAnchor: 'left',
      style: { strokeDasharray: '5,5' },
    } as RelationType
  })

  return (
    <div className={'col-span-3 w-100 h-100 flex items-center justify-center flex-col'}>
      <ArcherElement id={'sequencer'} relations={relations}>
        <div
          className={'m-2 h-36 w-36 rounded-full bg-orange-500 flex justify-center items-center'}
        >
          <p className={'text-white font-black'}>Sequenciador</p>
        </div>
      </ArcherElement>
      <div className={'flex justify-between items-center text-center'}>
        <div className={'w-36 text-sm font-black text-orange-500 mr-4'}>
          {join(leftMessages, ', ')}
        </div>
        <div className={'w-36 text-sm font-black text-orange-500 ml-4'}>
          {join(rightMessages, ', ')}
        </div>
      </div>
    </div>
  )
}
