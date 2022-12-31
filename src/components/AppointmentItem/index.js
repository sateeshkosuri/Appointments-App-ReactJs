import './index.css'

const AppointmentItem = props => {
  const {AppointmentListDetails, toggleItem} = props
  const {id, title, date, isStarredFlitter} = AppointmentListDetails
  const starImage = isStarredFlitter
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
  const onStarButtonClick = () => {
    toggleItem(id)
  }

  return (
    <li className="list-container">
      <div className=" appointment-item-container">
        <p className="title">{title}</p>
        <button
          type="button"
          className="star-button"
          testid="star"
          onClick={onStarButtonClick}
        >
          <img src={starImage} alt="star" className="star-image" />
        </button>
      </div>
      <p className="date">{date}</p>
    </li>
  )
}
export default AppointmentItem
