import React, { useEffect } from 'react'

import { useHttp } from "../hooks/http"

import Summary from './Summary'

const Character = (props) => {
  useEffect(() => {
    return () => {
      console.log('Cleaning up character...')
    }
  }, [])

  const [isLoading, fetchedData] = useHttp('https://academind-react-intro-starwars.firebaseio.com/swcharacters/' + (props.selectedChar-1) + '.json',
      [props.selectedChar])

  let loadedCharacter = null

  if (fetchedData) {
    loadedCharacter = {
      id: props.selectedChar,
      name: fetchedData.name,
      height: fetchedData.height,
      colors: {
        hair: fetchedData.hair_color,
        skin: fetchedData.skin_color
      },
      gender: fetchedData.gender,
      movieCount: fetchedData.films.length
    }
  }


  let content = <p>Loading Character...</p>;

  if (!isLoading && loadedCharacter && loadedCharacter.id) {
    content = (
      <Summary
        name={loadedCharacter.name}
        gender={loadedCharacter.gender}
        height={loadedCharacter.height}
        hairColor={loadedCharacter.colors.hair}
        skinColor={loadedCharacter.colors.skin}
        movieCount={loadedCharacter.movieCount}
      />
    )
  } else if (!isLoading && !loadedCharacter) {
    content = <p>Failed to fetch character.</p>
  }
  return content
}

export default React.memo(Character)
