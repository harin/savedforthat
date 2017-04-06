export const ADD_THAT = 'ADD_THAT'
export const SET_THAT = 'SET_THAT'

// const thatSchema = {
//   name: String,
//   price: Number,
//   imageUrl: String,
//   currentSaving: Number,
//   transactions: [
//     { date: '', amt: '' }
//   ],
//   userId: String
// }

const initialState = []

const dateToString = (date) =>
  `${date.getFullYear()}-${date.getMonth() + 1 > 9 ? '': '0'}${date.getMonth()+1}-${date.getDate() > 9 ? '': '0'}${date.getDate()}`

const getThatsRef = state =>
  state.app.database().ref(`users/${state.auth.user.uid}/thats`)

export const createThat = (that) => (dispatch, getState) => {
  that.transactions = [
    { date: dateToString(new Date()), amt: that.currentSaving }
  ]
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

export const addSaving = (thatId, amount) => (dispatch, getState) => {
  const thats = getThatsRef(getState())
  const that  = thats.child(thatId)
  const trx = that.child('transactions').push()
  trx.set({ date: dateToString(new Date()), amt: amount })
}

export const syncThatWithFirebase = (store) => {
  const thats = getThatsRef(store.getState())
  thats.on('value', (snapshot) => {
    console.log('value!')
    const thats = []
    snapshot.forEach((childSnap) => {
      const data = childSnap.val()
      data.key = childSnap.key
      data.transactions = Object.keys(data.transactions).map(key => data.transactions[key])
      const calculatedSaving = data.transactions.reduce((acc, cur, index) =>
        acc + parseInt(cur.amt, 10), 0
      )
      if (data.currentSaving !== calculatedSaving) {
        childSnap.ref.child('currentSaving').set(calculatedSaving)
        data.currentSaving = calculatedSaving
      }
      thats.push(data)
    })
    // console.log(thats)
    store.dispatch({ type: SET_THAT, payload: thats })
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
