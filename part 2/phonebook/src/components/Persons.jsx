const Persons = ({numbersToShow}) => {
    return (
        <div>
            {numbersToShow.map(person => <p key={person.id}>{person.name} {person.number}</p>)}
        </div>
    )
}

export default Persons