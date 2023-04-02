import React from 'react'
import { useParams } from 'react-router-dom'

function CardDetails(props) {
    let id = useParams().productoId
    let cards = props.cards

    let selectedCards = []

    for (let card of cards) {
        if (card.id === id) {
            selectedCards.push(card)
        }
    }

    let selectedCard = selectedCards[0]

    return (
        <div>
            <h1>{selectedCard?.name}</h1>
            <img src={selectedCard?.card_images[0].image_url_small}/>
            <h2>Description{selectedCard?.desc}</h2>
            <h2>Card Type: {selectedCard?.type}</h2>
            <h2>Card Race: {selectedCard?.race}</h2>
        </div>

    )
}
export default CardDetails