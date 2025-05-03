const Form = ({ newName, handleNameChange, newNumber, handleNumberChange, addContact }) => {
  return (
    <form>
      <div>name: <input onChange={handleNameChange} value={newName} /></div>
      <div>number: <input onChange={handleNumberChange} value={newNumber} /></div>
      <div>
        <button onClick={addContact} type="submit">add</button>
      </div>
    </form>
  )
}

export default Form