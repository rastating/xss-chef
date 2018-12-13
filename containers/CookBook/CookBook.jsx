import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { updateCookBook } from '~/actions/CookBook'

import CookBook from '~/components/CookBook'

function mapStateToProps (state) {
  return {
    cookBook: state.cookBook
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    updateCookBook
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CookBook)
