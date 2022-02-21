import state from '@/store/modules/favourites/state'
import * as getters from '@/store/modules/favourites/getters'
import * as actions from '@/store/modules/favourites/actions'
import * as mutations from '@/store/modules/favourites/mutations'

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}