import { Provider } from 'react-redux'
import Enzyme, { configure, shallow, mount } from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import store from "./store";

configure({ adapter: new Adapter() })

const findByTestAttr = (wrapper : any, val: string) => {
    return wrapper.find(`[data-test="${val}"]`)
}

const listMaker = (n = 10) => {
    const list = [];
    for (let i = 0; i < n; i++) {
        list.push({
            id: i,
            name: `List item ${i}`,
        })
    }
    return list
}

export { shallow, mount, findByTestAttr, listMaker, Provider, store}

export default Enzyme
