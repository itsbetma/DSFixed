import { cloneDeep, shuffle } from 'lodash'
import { defaultMessages, MessagesState } from '../store/messages/slice'

export class SequencerService {
  private processAmount: number
  public leftMessages: MessagesState['leftMessages'] = cloneDeep(defaultMessages)
  public rightMessages: MessagesState['rightMessages'] = cloneDeep(defaultMessages)

  constructor(processAmount: number) {
    this.processAmount = processAmount
  }
  public generateRandomMessages(): void {
    const arrayOfNumbers = [...Array(this.processAmount)].map((_, index) => index)
    this.leftMessages = shuffle(arrayOfNumbers).map((number) => {
      return `M${number}`
    }) as MessagesState['leftMessages']
    this.rightMessages = shuffle(this.leftMessages) as MessagesState['rightMessages']
    console.log('Generated message: ', this.leftMessages)
  }
}
