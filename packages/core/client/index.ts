import { monitor } from '../monitor/index'
import { performance } from '../performance/index'
import { config } from '../config/index'
import { merge } from 'lodash'

type Options =  {
    url: string
}

export const client = (options: Options) => {
    merge(config, options)
    performance()
    monitor()
}

// export class client {

//     data = []
    
//     constructor(options: Options) {
//         performance(options)
//         monitor(options)
//     }



// }