import type { Plugin } from 'vue'
import { report } from '../report'
import { handlerError } from '../utils/index'
 
export const vuePlugin = (): Plugin => {
    return {
        install(app, options) {
            app.config.errorHandler = (err) => {
                console.log('11111111111111111111');
                console.log(err);
                const errorItem = handlerError(err)
                report(errorItem)
            }
        }
    }
}