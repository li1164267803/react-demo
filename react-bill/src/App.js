import { Button } from 'antd-mobile'

function App() {
    function switchRoute(path) {
        console.log(path)
        navigator(path)
    }
    return (
        <div className="App">
            app11
            <Button onClick={() => switchRoute('/month')}>月度账单</Button>
        </div>
    )
}

export default App
