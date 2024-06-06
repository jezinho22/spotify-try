import {getData} from '../../spotify/spotify.js'
import Image from 'next/image'


export default async function page() {

    const data = await getData()
    // console.log('the data: ', data.items[0].album.images[1])

  return (
    <div>
        <h2>Here are your top 20 tracks from the last 6 months!</h2>

        {data.items && data.items.map((track) => {
            let artists = [];
            for (let i=0; i < track.artists.length; i++) {
                artists.push(track.artists[i].name)
            }
            console.log(track.album.images[1])
            return (
                <div key={track.id} className="track">
                    <div>
                        <p className= "artist">{artists.join(", ")}</p>
                        <p className= "track-name"> {track.name}</p>   
                    </div> 
                    <Image
                        src={track.album.images[1].url}
                        alt={track.album.name}
                        width={200}
                        height={200}
                    />
                </div>
            )
        })}

    </div>
  )
}

