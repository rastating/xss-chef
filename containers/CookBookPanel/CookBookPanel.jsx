import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { resetCookBook } from '~/actions/CookBook'

import CookBookPanel from '~/components/CookBookPanel'

function mapStateToProps (state) {
  return {
    cookBook: state.cookBook
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    resetCookBook
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CookBookPanel)
