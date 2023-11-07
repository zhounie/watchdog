import { monitor } from '../monitor/index'
import { performance } from '../performance/index'
import { config } from '../config/index'

type Options =  {
    url: string
}

// export const client = (options: Options) => {

//     config(options)
    
// }

export class client {

    data = []
    
    constructor(options: Options) {
        performance(options)
        monitor(options)
    }



}