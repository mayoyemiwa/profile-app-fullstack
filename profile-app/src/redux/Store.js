import rootReducer from './reducer/index'
import {createStore} from 'redux'
import {Provider} from 'react-redux'

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

const DataProvider = ({children}) => {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}

export default DataProvider