import { monitor } from '../monitor/index'
import { performance } from '../performance/index'
import { vuePlugin } from '../vue/index'
import { config } from '../config/index'
import { extend, merge } from 'lodash'
import { Plugin } from 'vue'


type VueOptions = Options & {
    isVue: true
}

export function client (options: Options & {isVue: true}): Plugin;
export function client (options: Options & {isVue: false}): void;
export function client (options: VueOptions | Options): Plugin | void {
    merge(config, options)
    performance()
    monitor()
    if (options.isVue) {
        return vuePlugin()
    }
}
// export class client {

//     data = []
    
//     constructor(options: Options) {
//         performance(options)
//         monitor(options)
//     }



// }