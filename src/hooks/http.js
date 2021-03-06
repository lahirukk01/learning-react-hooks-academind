import { useState, useEffect } from 'react'

export const useHttp = (url, dependencies) => {
    const [isLoading, setIsLoading] = useState(false)
    const [fetchedData, setFetchedData] = useState(null)

    useEffect(() => {
        setIsLoading(true)
        console.log('Sending http request...')
        // fetch('https://academind-react-intro-starwars.firebaseio.com/swcharacters.json')
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch.')
                }
                return response.json()
            })
            .then(data => {
                setIsLoading(false)
                setFetchedData(data)
            })
            .catch(err => {
                console.log(err)
            })
    }, dependencies)

    return [isLoading, fetchedData]
}
