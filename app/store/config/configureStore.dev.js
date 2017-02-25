import { createStore } from 'redux'
import rootReducer from '../reducers'
import DevTools from 'components/DevTools'

const configureStore = initialState =>
  createStore(
    rootReducer,
    initialState,
    DevTools.instrument()
  )

export default configureStore
