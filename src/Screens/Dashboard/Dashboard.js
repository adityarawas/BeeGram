import {useEffect} from 'react'

const Dashboard = () => {
useEffect(() => {
    document.title = "Beegram"
}, [])
    return (
        <div className="bg-gray-background">
            <Header />
        </div>
    )
}

export default Dashboard
