const PersonForm = ({addPerson, handlePersonChange, handleNumberChange}) => {
    return (
        <form onSubmit={addPerson}>
            <div>
                name: <input onChange={handlePersonChange}/>
            </div>
            <div>
                number: <input onChange={handleNumberChange} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
      </form>
    )
}

export default PersonForm