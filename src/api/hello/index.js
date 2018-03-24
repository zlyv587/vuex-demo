/**
 * Created by zhang on 2017/5/17.
 */
import {fetch} from  '../../common/request';
import serviceUrl from './serviceUrl';
export default {
  getHello() {
    return fetch().get(serviceUrl.hello);
  }
}
