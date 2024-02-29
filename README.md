## use-status
[![npm version](https://badge.fury.io/js/use-status.svg)](https://badge.fury.io/js/use-status)


Use status is a small substitute for useState that should enable some syntactic sugar. 

### installation
```bash
npm install use-status
```

### example usage
```tsx
import {useStatus} from 'react-use-status'
//or
import useStatus from 'react-use-status'

const count = useStatus(0)
return <>
  <button onClick={() => count(oldValue => oldValue+1)}>+</button>
  <button onClick={() => count.value--} >-</button>

  {/* The next 2 lines are equivalent to get the value of the state*/}
  <p>{count.value}</p>
  <p>{count()}</p>
</>
```

### Why?
Why not?

[MIT License](https://github.com/fischi20/use-status/blob/main/LICENSE) © 2024 - Present [Fischi20](https://github.com/fischi20)