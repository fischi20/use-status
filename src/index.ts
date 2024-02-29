import {useState} from 'react'

type DefaultValue<T> = T | (() => T)
type SetterParam<T> = T | ((oldValue: T) => T)
type Setter<T> = (value: SetterParam<T>) => void
type Getter<T> = () => T
type Status<T> = Getter<T> & Setter<T> & {value: T}

function isFunction<T>(value: ((oldValue: T) => T) | T): value is (oldValue: T) => T {
    return typeof value === 'function';
}

function resolveSetterProp<T>(setter: SetterParam<T>, oldValue: T) {
    if (isFunction(setter)) {
        return setter(oldValue)
    }
    return setter
}

export const useStatus = <T>(startingStatus: DefaultValue<T>): Status<T> => {
    const [state, setState] = useState(startingStatus);
    
    function stateFn(value?: SetterParam<T>) {
        if (arguments.length === 0) {
            return state;
        } else {
            let newValue = resolveSetterProp(value!, state);
            setState(newValue)
        }
    }

    stateFn.value = state

    const stateFnProxy = new Proxy(stateFn, {
        set: function(target, prop, value){
            if(prop === 'value') {
                setState(value)
                target[prop] = value
                return true;
            }

            //should work, but TS doesn't see arguments as something spreadable, so it fails
            //@ts-ignore
            return Reflect.set(...arguments)
            
        }
    })

    return stateFnProxy as Status<T>;
}

export default useStatus;
