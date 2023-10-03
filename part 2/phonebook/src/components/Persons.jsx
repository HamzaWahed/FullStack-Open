const Persons = ({numbersToShow, handleClick}) => {
    return (
        <div>
            {numbersToShow.map(person =>
                    <p key={person.id}>{person.name} {person.number} <button onClick={() => handleClick(person.id, person.name)}>Delete</button></p>
            )}
        </div>
    )
}

export default Persons