export const ADD_THAT = 'ADD_THAT'
export const SET_THAT = 'SET_THAT'

// const thatSchema = {
//   name: String,
//   price: Number,
//   imageUrl: String,
//   currentSaving: Number,
//   transactions: [],
//   userId: String
// }

const initialState = []

const getThatsRef = state =>
  state.app.database().ref(`users/${state.auth.user.uid}/thats`)

export const createThat = (that) => (dispatch, getState) => {
  dispatch({ type: ADD_THAT, payload: that })
  const thatsRef = getThatsRef(getState())
  const newThatRef = thatsRef.push()
  newThatRef.set(that)
  .then(() => {
    console.log('set!')
  })
}

export const loadThats = () => (dispatch, getState) => {
  console.log('loadThats')

  getThatsRef(getState()).once('value')
  .then((snapshot) => {
    const thats = []
    snapshot.forEach((childSnap) => {
      const data = childSnap.val()
      data.key = childSnap.key
      thats.push(data)
    })
    console.log(thats)
    dispatch({ type: SET_THAT, payload: thats })
  })
}

const thats = (state = initialState, action) => {
  switch (action.type) {
    case ADD_THAT:
      const newThat = action.payload
      return [
        ...state,
        newThat
      ]

    case SET_THAT:
      return action.payload
    default:
      return state
  }
}

export default thats
