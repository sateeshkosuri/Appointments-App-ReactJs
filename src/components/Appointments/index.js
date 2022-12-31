import {Component} from 'react'
import {format} from 'date-fns'
import {v4} from 'uuid'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    userInput: '',
    userDate: '',
    isStarredFlitter: false,
    appointmentList: [],
  }

  onStarButtonClick = () => {
    const {isStarredFlitter} = this.state
    this.setState({isStarredFlitter: !isStarredFlitter})
  }

  onToggleItem = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {
            ...eachAppointment,
            isStarredFlitter: !eachAppointment.isStarredFlitter,
          }
        }
        return eachAppointment
      }),
    }))
  }

  onFormAddButton = event => {
    event.preventDefault()
    const {userInput, userDate} = this.state

    const formattedDate = userDate
      ? format(new Date(userDate), 'dd MMMM yyyy, EEEE')
      : ''
    const newAppointments = {
      id: v4(),
      title: userInput,
      date: formattedDate,
      isStarredFlitter: false,
    }
    console.log(newAppointments)

    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointments],
      userInput: '',
      userDate: '',
    }))
  }

  getFlitterAppointmentList = () => {
    const {appointmentList, isStarredFlitter} = this.state

    if (isStarredFlitter) {
      return appointmentList.filter(
        eachItem => eachItem.isStarredFlitter === true,
      )
    }
    return appointmentList
  }

  onChangeDateInput = event => {
    const {userDate} = this.state
    this.setState({userDate: event.target.value})
    console.log(userDate)
  }

  onChangeTextInput = event => {
    const {userInput} = this.state
    this.setState({userInput: event.target.value})
    console.log(userInput)
  }

  render() {
    const {userInput, userDate, isStarredFlitter} = this.state
    const flitterStarred = isStarredFlitter ? 'flitter-active' : 'flitter-empty'
    const flitterAppointmentList = this.getFlitterAppointmentList()
    return (
      <div className="app-container">
        <div className="card-container">
          <div className="Appointments-container">
            <div className="container">
              <form className="form-container" onSubmit={this.onFormAddButton}>
                <h1 className="main-heading">Add Appointment</h1>
                <label htmlFor="title" className="label">
                  TITLE
                </label>
                <input
                  type="text"
                  placeholder="Title"
                  id="title"
                  className="input"
                  value={userInput}
                  onChange={this.onChangeTextInput}
                />
                <label htmlFor="date" className="label">
                  DATE
                </label>
                <input
                  type="date"
                  id="date"
                  className="input"
                  value={userDate}
                  onChange={this.onChangeDateInput}
                />
                <button type="submit" className="add-button">
                  Add
                </button>
              </form>
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="appointments-image"
              />
            </div>
            <hr className="line" />
            <div className="card-bottom-container">
              <h1 className="title">Appointments</h1>
              <button
                type="button"
                className={`star-button ${flitterStarred}`}
                onClick={this.onStarButtonClick}
              >
                Starred
              </button>
            </div>
            <ul className="unordered-container">
              {flitterAppointmentList.map(eachList => (
                <AppointmentItem
                  AppointmentListDetails={eachList}
                  key={eachList.id}
                  toggleItem={this.onToggleItem}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
export default Appointments
